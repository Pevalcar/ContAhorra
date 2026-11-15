# Design: UI Layer Replacement

## Arquitectura actual vs objetivo

### Actual (Gluestack)
```
ThemeProvider (React Navigation)
├── GluestackUIProvider                       ← ELIMINAR (Overlay+Toast+vars)
│   ├── vars(config.light/dark)               → migrar a global.css estático
│   ├── OverlayProvider (gluestack-overlay)   → no usado fuera de gluestack
│   └── ToastProvider (gluestack-toast)       → reemplazar con impl propia
├── SafeAreaProvider                          ← MANTENER
├── SQLiteProvider                            ← MANTENER
└── Stack (expo-router)                       ← MANTENER
```

### Objetivo (Post-migración)
```
ThemeProvider (React Navigation)
├── SafeAreaProvider                          ← MANTENER
├── SQLiteProvider                            ← MANTENER
└── Stack (expo-router)                       ← MANTENER
[global.css contiene todos los color tokens estáticos]
```

## Decisiones de diseño

### D1: Theme — CSS estático directo (confirmado)
Los ~300 CSS custom properties (`--color-primary-*`, `--color-error-*`, etc.) se definen una vez en `global.css`:

```css
/* global.css - agregar al final */
:root {
  --color-primary-0: #B3B3B3;
  --color-primary-50: #999999;
  /* ... todos los tokens del config.ts actual */
}
[data-theme="dark"] {
  --color-primary-0: #3C3C3C;
  /* ... valores dark mode */
}
```

El toggle de tema se maneja cambiando `document.documentElement.dataset.theme` (web) o via `NativeModules.ThemeManager` (mobile). No necesitamos un provider de React.

**Rationale:** Simplicidad extrema. Los colores nunca cambian dinámicamente durante ejecución; solo al reiniciar la app tras cambiar modo.

### D2: Toast — API simplificada (confirmado)
**API actual (compleja):**
```tsx
toast.show({
  id: 'unique-id',
  placement: 'bottom',
  duration: 3000,
  containerStyle: { margin: insets.top },
  render: ({ id }) => <Toast nativeID={id}><ToastTitle/><ToastDescription/></Toast>
});
```

**Nueva API (simplificada):**
```tsx
// components/ui/toast/index.tsx — nueva implementación
export const showToast = (message: string, type: 'success'|'error'|'info') => {
  // Animated.fadeIn/fadeOut + position bottom sheet
};
export type { ToastType };
```

`useMyToast` se reescribe:
```tsx
export const useMyToast = () => {
  return {
    handleToast: (title, message, type) => showToast(`${title}: ${message}`, type),
  };
};
```

**Sin `legendapp/motion`, sin `render` prop, sin `nativeID`.**

### D3: Components — minimales, sin wrappers innecesarios

#### Button (494 líneas → ~40)
Solo se usa 1 vez en toda la app como FAB flotante:
```tsx
// components/ui/button/index.tsx
import { Pressable, StyleSheet } from 'react-native';
export const Button = ({ children, onPress, className, style, ...props }) => (
  <Pressable onPress={onPress} className={`rounded-full bg-primary-500 px-4 py-3 ${className}`} {...props}>
    {children}
  </Pressable>
);
export const ButtonText = ({ children, className }) => (
  <Text className={`text-white font-bold ${className}`}>{children}</Text>
);
export const ButtonIcon = ({ children, className }) => (
  <View className={`${className}`}>{children}</View>
);
```

#### HStack/VStack (24 + 23 líneas → copiar tal cual)
Ya son wrappers finos. Solo cambiar imports:
```tsx
// antes: import { tva } from '@gluestack-ui/nativewind-utils/tva'
// después: import { tv } from 'nativewind'
// El resto idéntico
```

#### Text (48 líneas → simplificar)
Eliminar props de gluestack (`isTruncated`, `highlight`, etc.) que no se usan. Mantener `size` mapping a Tailwind text sizes.

#### Input/InputField (287 → ~60)
Simplificar a un componente `<Input>` que envuelve `<TextInput>` con styling. Quitar icon slot, helper slot, error state manager interno (el caller maneja estado).

#### Heading (elimina @expo/html-elements)
Usar `<Text>` con peso tipográfico y tamaño según prop `size`.

#### Image (~30 → ~10)
Wrapper mínimo de `Image` de RN con `resizeMode` y className support.

### D4: Tarea crítica — Tailwind config
`tailwind.config.js` actualmente importa `gluestackPlugin`:
```js
const gluestackPlugin = require("@gluestack-ui/nativewind-utils/tailwind-plugin");
plugins: [gluestackPlugin],
```
Esto debe removerse. Las utilidades de colores se definen manualmente en `theme.extend.colors`.

### D5: Impeccable como guía
Una vez migrado, se ejecuta para refinar el diseño:
```bash
npx impeccable install --scope project
```
Luego en el agente: `/impeccable shape` y `/impeccable polish` sobre pantallas críticas.

## Deps que se eliminan vs mantienen

```
SE ELIMINAN (29 + plugin):
├── @gluestack-ui/*                    (todos: button, input, toast, etc.)
├── @gluestack-ui/nativewind-utils     (tva, cssInterop, withStyleContext)
└── @legendapp/motion                 (solo toast)

SE MANTIENEN:
├── nativewind 4.x                     (engine de estilos — ya instalado)
├── react-native-safe-area-context    (SafeAreaProvider en _layout)
├── react-native-svg                  (requerido por lucide-react-native)
├── lucide-react-native               (íconos: PlusIcon, etc.)
└── expo-router                       (navegación)
```

## Componentes que se reescriben (solo estos)

| Original | Líneas actuales | Nueva | Import actual en app |
|----------|----------------|-------|---------------------|
| `components/ui/button` | 494 | ~40 | index.tsx, add_tansaction.tsx, reports.tsx |
| `components/ui/text` | 48 | ~20 | bolsillo.tsx, config.tsx, reports.tsx |
| `components/ui/vstack` | 24 | ~24 (cambia import) | Todos los screens |
| `components/ui/hstack` | 23 | ~23 (cambia import) | config.tsx, add_tansaction.tsx |
| `components/ui/input` | 287 | ~60 | add_perfil.tsx |
| `components/ui/toast` | 225 | ~80 | useToast.tsx hook centralizado |
| `components/ui/heading` | ~60 | ~20 | bolsillo.tsx |
| `components/ui/image` | ~30 | ~10 | reports.tsx |
| `gluestack-ui-provider` | 20 | 0 | _layout.tsx |
