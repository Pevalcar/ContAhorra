---
tasks:
  - [ ] 1. Leer skill:frontend-ui-engineering y skill:expo-design-system antes de empezar
  - [ ] 2. Crear backup del estado actual (git checkout -b refactor/ui-layer)
  - [ ] 3. Migrar theme tokens de config.ts a global.css (vars light + vars dark como data-theme)
  - [ ] 4. Actualizar tailwind.config.js: remover gluestackPlugin, verificar colores
  - [ ] 5. Reescribir Text (sin props gluestack innecesarias, solo size mapping)
  - [ ] 6. Reescribir HStack y VStack (copiar lógica, cambiar import tva → tv)
  - [ ] 7. Reescribir Button + ButtonText + ButtonIcon (~40 líneas, Pressable directo)
  - [ ] 8. Reescribir Heading (sin @expo/html-elements, usar Text con size mapping)
  - [ ] 9. Reescribir Image (wrapper mínimo de RN Image)
  - [ ] 10. Reescribir Input + InputField (~60 líneas, sin icon slot ni helper state)
  - [ ] 11. Crear nuevo sistema de Toast con Animated (showToast API simple)
  - [ ] 12. Reescribir useMyToast para nueva API showToast(message, type)
  - [ ] 13. Quitar GluestackUIProvider de _layout.tsx (no más provider necesario)
  - [ ] 14. Verificar que ningún archivo importe @gluestack-ui/*
  - [ ] 15. Remover 29 dependencias @gluestack-ui/* de package.json
  - [ ] 16. Ejecutar bun install
  - [ ] 17. npm run lint — corregir errores
  - [ ] 18. npm run ios — probar en simulador
  - [ ] 19. npm run android — probar en emulador
  - [ ] 20. Instalar Impeccable: npx impeccable install --scope project
  - [ ] 21. Configurar PRODUCT.md (Platform: adaptive, Target Audience: MiPymes CO)
  - [ ] 22. /impeccable polish en pantallas principales (index, add_tansaction)
  - [ ] 23. Commit final + openspec sync + archive
---

# Tasks: UI Layer Replacement

## Fase 1 — Preparación

- [ ] **T1.** Leer skills `frontend-ui-engineering` y `expo-design-system` antes de codificar
- [ ] **T2.** Crear rama: `git checkout -b refactor/ui-layer-gluestack`
- [ ] **T3.** Mover theme tokens a global.css (extraer ~300 vars de `config.ts`)
  - Light mode como valores por defecto en `:root`
  - Dark mode como `[data-theme="dark"]` override
- [ ] **T4.** Actualizar `tailwind.config.js`:
  - Remover línea `const gluestackPlugin = require(...)`  
  - Remover `plugins: [gluestackPlugin]`
  - Los colores ya están definidos manualmente; solo limpiar el plugin

## Fase 2 — Componentes (orden de complejidad creciente)

### T5. Text (más simple primero)
- Crear `components/ui/text/index.tsx` nuevo (~20 líneas)
- Props: `size`, `bold`, `italic`, `underline`, `className`, children
- Quitar props que no se usan: `isTruncated`, `sub`, `highlight`, `strikeThrough`
- Usar `tv()` de `nativewind` directamente

### T6. HStack / VStack
- Copiar implementación actual (24 + 23 líneas) exactamente
- Cambiar solo imports: `import { tv } from 'nativewind'` (no desde gluestack-utils)
- Eliminar variantes dead: `reversed` (no usado en la app)

### T7. Button + ButtonText + ButtonIcon
- Crear `components/ui/button/index.tsx` nuevo (~40 líneas)
- `Button`: `<Pressable>` con className base + variants (solid/ghost/outline)
- `ButtonText`: `<Text>` con color blanco por defecto
- `ButtonIcon`: `<View>` wrapper simple para íconos
- Nota: en toda la app solo se usa como FAB flotante (button xl, rounded-full)

### T8. Heading
- Crear `components/ui/heading/index.tsx` (~20 líneas)
- Mapeo directo: `size="xl"` → `text-2xl font-bold`, etc.
- No usar `@expo/html-elements` (H1-H6); usar `<Text>` de RN

### T9. Image
- Crear `components/ui/image/index.tsx` (~10 líneas)
- Wrapper mínimo de `Image` de React Native
- Soportar prop `size` mapeada a Tailwind w/h classes

### T10. Input + InputField
- Crear `components/ui/input/index.tsx` (~60 líneas)
- `<Input>` envuelve `<TextInput>` con borde, padding, radius Tailwind
- `<InputField>` es solo un `<TextInput>` con styles adicionales
- Quitar: icon slot, helper text, error state manager interno
- Estado lo maneja cada screen individualmente

### T11. Toast (el más complejo)
- Crear `components/ui/toast/use-toast.ts` nuevo con API simplificada
```tsx
// Nueva API:
export function showToast(message: string, type: 'success' | 'error' | 'info')
export function useToast() { return { showToast }; }
```
- Animación: `Animated.timing` con fadeIn/fadeOut + translateY
- Posición: bottom sheet, márgen top basado en safe area insets
- Sin `legendapp/motion`, sin `render` prop, sin `nativeID`

### T12. Reescribir useMyToast
- Archivo: `lib/Hooks/useToast.tsx`
- Antes: usaba `toast.show({ id, render, placement, containerStyle })`
- Después:
```tsx
export const useMyToast = () => {
  const { showToast } = useToast();
  const handleToast = useCallback((title, message, type = 'warning') => {
    showToast(`${title}: ${message}`, type);
  }, []);
  return { handleToast };
};
```
- Todos los call sites (14 lugares) funcionan sin cambios en la llamada

## Fase 3 — Layout

### T13. Limpiar _layout.tsx
- Remover import y uso de `GluestackUIProvider`
- La estructura queda:
```tsx
return (
  <ThemeProvider value={darkMode ? DarkTheme : DefaultTheme}>
    <SafeAreaProvider>
      <SQLiteProvider databaseName={LOCAL_DB_NAME} onInit={migrateDbIfNeeded}>
        <Stack>...</Stack>
      </SQLiteProvider>
    </SafeAreaProvider>
  </ThemeProvider>
);
```
- El theme CSS vars ya están en `global.css` (estáticos), no necesitan provider

## Fase 4 — Limpieza y verificación

### T14. Confirmar cero imports de gluestack
```bash
grep -rn "@gluestack\|legendapp/motion" app/ lib/ components/ --include="*.tsx" --include="*.ts"
```
Debe retornar 0 resultados.

### T15. Remover dependencias de package.json
Eliminar los 29 entries `@gluestack-ui/*`. Mantener `react-native-svg` (lucide la requiere).

### T16. Instalar
```bash
bun install
```

### T17. Lint
```bash
npm run lint
```
Corregir cualquier error de TypeScript o import broken.

### T18. iOS
```bash
npm run ios
```
Probar todas las pantallas: home, añadir transacción, perfil, config, reportes.

### T19. Android
```bash
npm run android
```
Mismas pantallas en emulador Android.

## Fase 5 — Impeccable

### T20. Instalar localmente
```bash
npx impeccable install --scope project
```

### T21. Configurar PRODUCT.md
Crear `.impeccable/config.json` manual:
```json
{ "platform": "adaptive", "audience": "colombian small business owners" }
```

### T22. Pulir pantallas críticas
- `/impeccable polish the main dashboard`
- `/impeccable polish the add transaction form`
- Registrar hallazgos en `design-findings.md`

### T23. Cierre
- Commit descriptivo
- `openspec sync eliminar-gluestack-impeccable`
- `openspec archive eliminar-gluestack-impeccable`
- Agregar nota sobre nuevo sistema UI en `AGENTS.md`
