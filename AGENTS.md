# AGENTS.md — ContAhorra

## Proyecto

ContAhorra es una app móvil (Expo + React Native) para que pequeños comercios gestionen inventario, transacciones financieras y catálogos públicos de productos. Arquitectura Clean/DDD con SQLite local offline-first y Supabase como remoto. Estado global con Zustand, navegación con Expo Router (drawer + tabs), UI con Gluestack-UI + NativeWind. Incluye integración IA (OpenAI/Ollama) y MCP tools para análisis financiero.

**Rama activa:** `ai-mcp-integration`

---

## Comandos

```bash
# Desarrollo
npm run dev           # Web en puerto 3000
npm run android       # Android
npm run ios           # iOS

# QA
npm test              # Jest watch mode
npm run lint          # ESLint + Prettier

# OpenSpec
openspec new change "<name>"
openspec propose "<idea>"
openspec apply "<change-name>"
openspec archive "<change-name>"

# Pi / MCP
pi -e scripts/.pi/extensions/contahorra-ai-extension.ts
```

---

## Estilo y convenciones

- **TypeScript** 5.3 strict, path alias `@/` → root del proyecto
- **Idioma del código:** inglés (nombres de variables, funciones, interfaces)
- **Idioma del usuario:** español (`es-CO`) por defecto, inglés (`en-US`) como fallback
- **Nombres:** PascalCase para componentes e entidades, camelCase para hooks y use-cases, kebab-case para archivos
- **Hooks personalizados:** siempre `use` + PascalCase (`useLogin`, `useCalculadora`)
- **Entidades:** clases simples sin dekoradores ni framework imports
- **Stores Zustand:** interface + `create<T>()`, máximo 200 líneas por store
- **Componentes:** interface Props nombrada explícitamente, lógica en hooks (`lib/Hooks/`)

---

## Reglas

- Lee `docs/constitution.md` y la spec/change activo antes de tocar código.
- Las escrituras van SIEMPRE a SQLite local primero; Supabase es best-effort.
- No agregues dependencias nuevas sin justificar en el PR (máx 5KB gzipped).
- Nuevas strings de UI van a ambos archivos i18n (`en.json` + `es.json`).
- No modifiques `lib/domain/entities/` sin actualizar también sus `FromSQLite()` statics.
- Los MCP tools en `lib/skills/mcp-tools/` son read-only; nunca escriben datos.

---

## Al terminar cualquier tarea

1. Ejecutar `npm run lint` y corregir errores.
2. Verificar que las specs de OpenSpec (si aplica) siguen siendo válidas.
3. Confirmar cobertura de índices MCP con `check_index_coverage` si se tocó dominio.
4. Commit message siguiendo [Conventional Commits](https://www.conventionalcommits.org/): `feat:` / `fix:` / `docs:` / `refactor:` / `chore:`
