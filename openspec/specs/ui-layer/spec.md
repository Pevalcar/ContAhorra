---
capability: ui-layer
version: 1
status: active
---

# Spec: UI Layer Replacement

El sistema de UI debe funcionar sin `@gluestack-ui/*` manteniendo exactamente el mismo comportamiento visual y funcional.

## Capabilities

### ULC-1: Remover dependencias Gluestack

**Dado que** el proyecto tiene 29 paquetes `@gluestack-ui/*` instalados,  
**cuando** se ejecute `bun install` después de remover las dependencias,  
**entonces** la app compila y funciona correctamente sin errores de imports.

#### Criterios de aceptación
- [ ] package.json no contiene ningún `@gluestack-ui/*`
- [ ] `npm run lint` pasa sin errores
- [ ] `npm run ios` arranca sin crashes
- [ ] `npm run android` arranca sin crashes

---

### ULC-2: Reescribir Button

**Dado que** `app/(drawer)/(tabs)/index.tsx` y otros archivos importan `Button`, `ButtonText`, `ButtonIcon` desde `@/components/ui/`,  
**cuando** se renderice un botón,  
**entonces** debe verse idéntico al anterior usando solo React Native + Tailwind/NativeWind.

#### Especificación técnica
```tsx
// components/ui/button/index.tsx — implementación limpia
import { Pressable, Text, View } from 'react-native';
import { tv } from 'nativewind';

const button = tv({
  slots: { root: '', content: '', icon: '' },
  variants: {
    variant: { solid: {}, ghost: {}, outline: {} },
    size: { sm: {}, md: {}, lg: {} },
  },
  defaultVariants: { variant: 'solid', size: 'md' },
});

export const Button = ({ children, ...props }) => { /* RN Pressable + tv styles */ };
export const ButtonText = ({ children, ...props }) => { /* RN Text + tv styles */ };
export const ButtonIcon = ({ children, ...props }) => { /* RN View + tv styles */ };
```

---

### ULC-3: Reescribir Stack Components (HStack, VStack)

**Dado que** múltiples screens usan `HStack` y `VStack`,  
**cuando** se rendericen,  
**entonces** usan Flexbox de React Native directamente (no wrappers genéricos).

#### Comportamiento esperado
- `HStack gap={4}` → `flexDirection: 'row', gap: 16`
- `VStack gap={2}` → `flexDirection: 'column', gap: 8`
- Soporte para `justifyContent`, `alignItems`

---

### ULC-4: Reescribir Text y Heading

**Dado que** todos los textos usan `@/components/ui/text`,  
**cuando** se renderice texto,  
**entonces** usa NativeWind `text-{size}`, `font-{weight}`, `text-{color}` utilities.

---

### ULC-5: Reescribir Input

**Dado que** `add_tansaction.tsx` importa `Input` e `InputField`,  
**cuando** el usuario escriba un valor,  
**entonces** el estado se guarda correctamente y se valida en tiempo real.

---

### ULC-6: Reescribir Toast

**Dado que** las notificaciones usan `Toast`, `ToastTitle`, `ToastDescription`,  
**cuando** se dispare un toast,  
**entonces** aparece con animación slide-up y desaparece tras 3s.

---

### ULC-7: Reescribir Image

**Dado que** se usa `Image` del provider de Gluestack,  
**cuando** se cargue una imagen,  
**entonces** usa `expo-image` con las mismas props (`resizeMode`, `width`, `height`).

---

### ULC-8: Adoptar Impeccable para guía de diseño

**Dado que** la app está migrando a NativeWind puro,  
**cuando** se diseñen nuevas pantallas o se refinen existentes,  
**entonces** se usan las reglas de Impeccable para UI mobile nativa (Apple HIG / Material 3).

#### Comandos de Impeccable aplicables (mobile)
- `/impeccable shape <component>` — planificar UX antes de código
- `/impeccable polish <screen>` — pulir diseño existente
- `/impeccable bolder <element>` — potenciar diseño conservador
- `/impeccable adapt <breakpoint>` — adaptar a distintos tamaños de pantalla

#### Notas sobre limitaciones
- Live mode y detector CLI son web-only (requieren HTML/CSS rendered page)
- Para móvil: usar comandos de guía, no automated scanning
- Configuración de `PRODUCT.md`: Platform = `adaptive` (React Native dual OS)
