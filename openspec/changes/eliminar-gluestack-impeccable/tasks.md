---
tasks:
  - [ ] 1. Leer skill:frontend-ui-engineering y skill:expo-design-system antes de empezar
  - [ ] 2. Crear backup del estado actual (git checkout -b refactor/ui-layer)
  - [ ] 3. Reescribir Button con tv() de NativeWind v4
  - [ ] 4. Reescribir HStack y VStack con flexbox directo
  - [ ] 5. Reescribir Text y Heading con Tailwind utilities
  - [ ] 6. Reescribir Input e InputField
  - [ ] 7. Reescribir Toast (implementación ligera con Animated)
  - [ ] 8. Reescribir Image wrapper para expo-image
  - [ ] 9. Quitar GluestackUIProvider de _layout.tsx
  - [ ] 10. Verificar todos los screens importan correctamente de @/components/ui/
  - [ ] 11. Remover 29 dependencias @gluestack-ui/* de package.json
  - [ ] 12. Ejecutar bun install
  - [ ] 13. npm run lint — corregir errores
  - [ ] 14. npm run ios — probar en simulador
  - [ ] 15. npm run android — probar en simulador/emulador
  - [ ] 16. Instalar Impeccable: npx impeccable install --scope project
  - [ ] 17. Configurar PRODUCT.md con Platform: adaptive
  - [ ] 18. Usar /impeccable shape en las pantallas principales
  - [ ] 19. Usar /impeccable polish en los fluxos críticos (login, agregar transacción)
  - [ ] 20. Commit final con mensaje descriptivo
  - [ ] 21. Agregar referencia a Impeccable en AGENTS.md
---

# Tasks: UI Layer Replacement

## Fase 1 — Preparación

- [ ] **T1.** Instalar Impeccable localmente: `npx impeccable install --scope project`
- [ ] **T2.** Configurar `PRODUCT.md`:
  ```markdown
  ## Platform
  adaptive
  ## Target Audience
  small business owners in Colombia (MiPymes)
  ## Brand
  clean, trustworthy, simple — green and white primary palette
  ```
- [ ] **T3.** Crear rama de trabajo: `git checkout -b refactor/ui-layer-gluestack`

## Fase 2 — Componentes nuevos (sin gluestack)

### T4. Button (reemplaza `@/components/ui/button`)
- Importar desde NativeWind `tv` directamente
- Slots: root, content, icon
- Variantes: solid, ghost, outline
- Sizes: sm (py-2), md (py-3), lg (py-4)
- Validar con screen que usa Button (index.tsx, add_transaction.tsx)

### T5. HStack / VStack
- Flexbox directo: flexDirection row/column
- Gap basado en Tailwind spacing
- Soporte props estándar de RN View

### T6. Text / Heading
- Text: usar `text-*` utilities de NativeWind
- Heading: pesos tipográficos (font-bold, font-semibold)
- Mantener tamaños actuales para preservar look & feel

### T7. Input / InputField
- Wrapper de `TextInput` de React Native
- Estilos basados en Tailwind classes
- Estado manejado por el caller (no dentro del componente)

### T8. Toast (el más complejo)
- Usar `Animated` de RN para slide-up animation
- Mount en root del stack (debajo de provider)
- Props: title, description, type ('success' | 'error' | 'info')
- Auto-dismiss tras 3s
- No depender de ningún paquete externo

### T9. Image
- Wrapper de `Image` de RN con manejo de loading state
- Opcional: usar `expo-image` si está disponible

## Fase 3 — Limpieza

### T10. Limpiar _layout.tsx
- Remover import de `GluestackUIProvider`
- Remover el wrapping component
- Asegurar que Toast provider (nuevo) esté en su lugar si se necesita

### T11. Verificar imports
- Confirmar que NO queda ningún import de `@gluestack-ui/*` en el código fuente
- Confirmar que los imports de `@/components/ui/*` apuntan a las nuevas implementaciones

### T12. Remover dependencias de package.json
- Eliminar los 29 entries `@gluestack-ui/*`
- Verificar que `nativewind` se mantiene (versión 4.x)

## Fase 4 — Testing

### T13. Lint
- `npm run lint` — debe pasar sin errores

### T14. Web dev
- `npm run dev` — verificar que web funciona

### T15. iOS simulator
- `npm run ios` — probar todas las pantallas

### T16. Android emulator
- `npm run android` — probar todas las pantallas

## Fase 5 — Diseño con Impeccable

### T17. Shape landing/main screen
- Correr `/impeccable shape the main dashboard`
- Aplicar sugerencias de layout y spacing

### T18. Polish transaction flow
- Correr `/impeccable polish the add transaction form`
- Refinar inputs, spacing, feedback visual

### T19. Run design audit
- `/impeccable critique the onboarding flow`
- Documentar hallazgos en `openspec/changes/eliminar-gluestack-impeccable/design-findings.md`

## Fase 6 — Documentación y cierre

### T20. Commit
- Mensaje: `refactor: remove gluestack, adopt native wind ui + impeccable`
- Incluir diff limpio de cambios

### T21. Sincronizar specs
- `openspec sync eliminar-gluestack-impeccable`

### T22. Archivar
- `openspec archive eliminar-gluestack-impeccable`

### T23. Agregar nota en AGENTS.md
- Registrar que los componentes UI ahora usan NativeWind puro
- Registrar que se usa Impeccable como guía de diseño mobile
