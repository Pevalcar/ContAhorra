---
name: eliminar-gluestack-impeccable
description: Reemplazar Gluestack UI (29 packages) por NativeWind puro + adoptar Impeccable como guía de diseño para agentes de IA
created_at: 2026-11-15
status: proposed
---

# Proposal: Eliminar Gluestack, Adoptar Impeccable

## Problema

ContAhorra tiene **29 dependencias de `@gluestack-ui/*`** que agregan ~45KB bundle weight y complejidad innecesaria. El sistema de componentes UI custom (`components/ui/`) usa estas dependencias internamente pero solo **7 tipos de componentes son usados realmente** en la app:

| Usados | Dead code (~53 componentes) |
|--------|----------------------------|
| Button, HStack, VStack, Text | accordion, actionsheet, alert, avatar, badge... |
| Input, InputField | bottomsheet, drawer, form-control, grid... |
| Toast, useToast | heading, image, link, menu, modal, popover... |
| Image, Heading | pressable, progress, radio, select, skeleton... |
| | slider, spinner, switch, table, textarea, tooltip... |

## Objetivo

1. Eliminar las 29 dependencias `@gluestack-ui/*` de `package.json`
2. Reescribir los **7 componentes usados** con NativeWind/Tailwind puro (sin gluestack)
3. Instalar Impeccable para guía de diseño consistente en UI mobile nativa
4. Mantener compatibilidad total: 0 cambios visibles para el usuario final

## Qué NO se hace

- No se reescriben los 53+ componentes dead-code (no se usan)
- No se cambia el branding ni paleta de colores actual
- No se elimina NativeWind (se mantiene y fortalece)

## Beneficios

| Métrica | Antes | Después |
|---------|-------|---------|
| Paquetes `@gluestack-ui/*` | 29 | 0 |
| Bundle size estimado | ~45KB gzip | ~8KB gzip |
| Complejidad de mantenimiento | Alta (wrapper genérico) | Baja (NativeWind directo) |
| Guía de diseño consistente | Ninguna | Impeccable (Apple HIG / Material 3) |
