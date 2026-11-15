---
name: eliminar-gluestack-impeccable
description: Reemplazar Gluestack UI (29 packages) por NativeWind puro + adoptar Impeccable como guía de diseño para agentes de IA
created_at: 2026-11-15
status: in_progress
---

# Proposal: Eliminar Gluestack, Adoptar Impeccable

## Problema

ContAhorra tiene **29 dependencias de `@gluestack-ui/*`** que agregan ~45KB bundle weight y complejidad innecesaria. El sistema de componentes UI custom (`components/ui/`) usa estas dependencias internamente pero solo **7 tipos de componentes son usados realmente** en la app.

| Usados | Dead code (~53 componentes) |
|--------|----------------------------|
| Button, HStack, VStack, Text | accordion, actionsheet, alert, avatar, badge... |
| Input, InputField | bottomsheet, drawer, form-control, grid... |
| Toast, useToast | heading, image, link, menu, modal, popover... |
| Image, Heading | pressable, progress, radio, select, skeleton... |
| | slider, spinner, switch, table, textarea, tooltip... |

## Objetivo

1. Eliminar las 29 dependencias `@gluestack-ui/*` de `package.json`
2. Reescribir los **7 componentes usados** con RN + NativeWind directo (sin gluestack)
3. Instalar Impeccable para guía de diseño consistente en UI mobile nativa
4. Mantener compatibilidad: mismo look & feel, cero cambios visibles para el usuario

## Qué NO se hace

- No se reescriben los 53+ componentes dead-code (no se usan ni se importan)
- No se elimina NativeWind (se mantiene v4.x como motor de estilos)
- No se cambia la paleta de colores actual (se mantienen los tokens CSS)
- No se instalan deps nuevas

## Decisiones confirmadas (post-explore)

### D1: Theme — CSS estático directo
Los CSS custom properties (`--color-primary-*`, etc.) se definen directamente en `global.css` con valores hexadecimales fijos. Se elimina `GluestackUIProvider` completamente. El cambio light/dark se maneja con clase CSS `.dark` o media query, no con vars dinámicas en runtime.

### D2: Layout — estructura limpia sin providers extra
```
app/_layout.tsx
└── ThemeProvider (@react-navigation/native)     ← MANTENER
    ├── SafeAreaProvider                         ← MANTENER
    ├── SQLiteProvider                           ← MANTENER
    └── Stack (expo-router)                      ← MANTENER
( Sin GluestackUIProvider )
```

### D3: Toast — API simplificada
Nueva implementación con `Animated` de React Native. La API cambia de `toast.show({ id, render, placement })` a `showToast(message, type)` más simple. `useMyToast` se reescribe para usar esta nueva API.

### D4: Impeccable como guía, no como dependencia runtime
Se instala a nivel de agente/harness (no package de la app):
```bash
npx impeccable install --scope project
```
Crea `.impeccable/config.json` + `PRODUCT.md` que guían al agente en desarrollo.

## Beneficios

| Métrica | Antes | Después |
|---------|-------|---------|
| Paquetes `@gluestack-ui/*` | 29 | 0 |
| Bundle size estimado | ~45KB gzip | ~8KB gzip |
| Complejidad de mantenimiento | Alta (wrapper genérico) | Baja (NativeWind directo) |
| Guía de diseño consistente | Ninguna | Impeccable (Apple HIG / Material 3) |
