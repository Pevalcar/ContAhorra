# Design: UI Layer Replacement

## Arquitectura actual vs objetivo

### Actual (Gluestack)
```
app/_layout.tsx
  └── GluestackUIProvider (OverlayProvider + ToastProvider)
       └── components/ui/ (60+ componentes usando @gluestack-ui/* internals)
            ├── button/index.tsx → createButton(@gluestack-ui/button), tva, withStyleContext...
            ├── text/index.tsx   → styled Text con tv() helpers de gluestack
            ├── toast/index.tsx  → useToast desde @gluestack-ui/toast
            └── ...
```

### Objetivo (NativeWind puro)
```
app/_layout.tsx
  └── (sin provider, o minimal wrapper si se necesita theme config)
       └── components/ui/ (reescritos con NativeWind/tv directo)
            ├── button/index.tsx → Pressable + tv('nativewind')
            ├── text/index.tsx  → RN Text + Tailwind classes
            ├── toast/index.tsx → react-native-toast-hoc (o RN default)
            └── ... (solo los 7 usados)
```

## Decisiones de diseño

### D1: Eliminar GluestackUIProvider completamente
El provider solo envuelve en `OverlayProvider` y `ToastProvider`. Ambas funcionalidades pueden manejarse de forma nativa:
- **Overlays** (modals, popovers): Expo Router ya maneja esto con sheets/modals
- **Toasts**: usar `react-native-toast` o implementación ligera propia

### D2: Usar `tv()` directamente de NativeWind v4
NativeWind v4 tiene `tv()` integrado (Tailwind Variants). No necesitamos `@gluestack-ui/nativewind-utils/tva`.

```tsx
import { tv } from 'nativewind';

const button = tv({
  base: 'rounded-lg px-4 py-3',
  variants: {
    variant: {
      solid: 'bg-primary-500',
      ghost: 'bg-transparent',
    },
  },
});
```

### D3: Toast ligero propio
Reemplazar `@gluestack-ui/toast` con una implementación basada en `react-native-reanimated` + `Expo Router Modal`:
- Animación: slide-up con reanimated
- Auto-dismiss: 3 segundos
- Posición: bottom sheet tipo modal

### D4: Impeccable como guía, no como dependencia runtime
Impeccable es una herramienta de IA que proporciona "design vocabulary" para agentes. No se instala como package de la app — se instala a nivel de agente/harness:

```bash
npx impeccable install --scope project
```

Esto crea `.impeccable/config.json` y `PRODUCT.md` que el agente lee durante desarrollo.

## Migración paso a paso

1. Crear nuevas implementaciones de los 7 componentes en `/components/ui/`
2. Verificar cada uno contra el anterior (snapshot visual)
3. Remover imports de `@gluestack-ui/*` del `_layout.tsx`
4. Remover las 29 dependencias de `package.json`
5. Ejecutar `bun install`, probar en iOS y Android
6. Instalar Impeccable y configurar `PRODUCT.md`
7. Documentar en `AGENTS.md` el nuevo flujo de diseño
