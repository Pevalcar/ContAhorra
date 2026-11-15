# AGENTS.md — ContAhorra

## Proyecto

ContAhorra es una app móvil multiplataforma construida con Expo + React Native que permite a pequeños comercios administrar su inventario, registrar transacciones financieras y ofrecer un catálogo público de productos y precios. Arquitectura Clean/DDD: SQLite local offline-first como fuente de verdad, Supabase para autenticación y sincronización remota. Estado global con Zustand, navegación con Expo Router, UI con Gluestack-UI y NativeWind.

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
```

---

## Estilo y convenciones

- **TypeScript** 5.3 strict, path alias `@/` → root del proyecto
- **Idioma del código:** inglés en TODO nombre de variable, función, clase, interfaz y archivo
- **Idioma del usuario:** español (`es-CO`) por defecto, inglés (`en-US`) como fallback
- **Nombres:** PascalCase para componentes y entidades, camelCase para hooks y use-cases, kebab-case para archivos
- **Hooks personalizados:** siempre `use` + PascalCase (`useLogin`, `useCalculator`)
- **Entidades:** clases simples sin decoradores ni imports de framework
- **Stores Zustand:** interface explícita + `create<T>()`, máximo 200 líneas; si crece, separar
- **Componentes:** `interface Props { ... }` nombrada, lógica en `lib/hooks/` (no dentro del JSX)

> **Nota de deuda existente:** Nombres como `Transaccion`, `Categoria`, `Cuentas`, `add_tansaction` rompen esta regla. Se corrigirán en el primer refactor dedicado. Mientras tanto, las reglas aplican a todo código NUEVO.

---

## Reglas

- Lee `docs/constitution.md` y cualquier spec/change activo antes de modificar código.
- Las escrituras van SIEMPRE a SQLite local primero; Supabase es best-effort.
- No agregues dependencias nuevas sin justificación en el PR (máx 5KB gzipped).
- Textos visibles para el usuario: usar `useTranslation()`. Agregar a ambos archivos i18n (`en.json` + `es.json`).
- Al modificar `lib/domain/entities/`, actualizar también los statics `FromSQLite()`.
- Los MCP tools expuestos al agente son read-only; nunca escriben datos del usuario.

---

## Al terminar cualquier tarea

1. Ejecutar `npm run lint` y corregir errores.
2. Verificar que las specs de OpenSpec (si aplica) sigan siendo válidas.
3. Confirmar cobertura de índices MCP con `check_index_coverage` si se tocó dominio.
4. Commit message siguiendo Conventional Commits: `feat:` / `fix:` / `docs:` / `refactor:` / `chore:`
