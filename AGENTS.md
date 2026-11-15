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
- **Internacionalización:** toda la UI va en español para MiPymes colombianas; los text keys en i18n usansnake_case en inglés (`transaction_added`, `sync_failed`). Agregar a AMBOS archivos (`en.json` + `es.json`). Default: `es-CO`, fallback: `en-US`. Cero strings hardcodeados en componentes.

> **Nota de deuda existente:** Nombres como `Transaccion`, `Categoria`, `Cuentas`, `add_tansaction` rompen esta regla. Se corregirán en el primer refactor dedicado. Mientras tanto, las reglas aplican a todo código NUEVO.

---

## Reglas

- Lee `docs/constitution.md` y cualquier spec/change activo antes de modificar código.
- Las escrituras van SIEMPRE a SQLite local primero; Supabase es best-effort.
- No agregues dependencias nuevas sin justificación en el PR (máx 5KB gzipped).
- Textos visibles para el usuario: usar `useTranslation()`. Agregar a ambos archivos i18n (`en.json` + `es.json`).
- Al modificar `lib/domain/entities/`, actualizar también los statics `FromSQLite()`.
- Los MCP tools expuestos al agente son read-only; nunca escriben datos del usuario.
- Credenciales, tokens y claves API NI SIQUIERA en comentarios; solo en `.env` o variables de entorno.

---

## Requisitos — Concurso Innovación Casanare 2026

La App debe cumplir estos criterios para la convocatoria de la Gobernación de Casanare (noviembre 2026). Cada ítem corresponde a una variable de evaluación ponderada.

### 🔴 Crítico — Conectividad Limitada / Modo Offline (6%)

- [ ] SQLite embebido como motor de persistencia local (expo-sqlite)
- [ ] Timestamp preciso en cada registro capturedo offline (`created_at`, `updated_at`)
- [ ] Estrategia de resolución de conflictos declarada e implementada (último-write-wins o fusión)
- [ ] Sync silencioso en segundo plano: al recuperar señal, sincronizar progresivamente sin intervención del usuario
- [ ] Cero pérdidas de datos al volver a conectar
- [ ] Prueba de aceptación en modo avión: validar que funciones principales operan sin red y que no hay crashes

### 🔴 Crítico — Seguridad de la Información (6%)

- [ ] HTTPS con TLS 1.2+ para todas las comunicaciones (Supabase ya lo provee)
- [ ] Contraseñas hashed con salt + algoritmo reconocido (bcrypt/scrypt), NUNCA texto plano
- [ ] Cumplimiento OWASP Mobile Top 10: inyección SQL, XSS, CSRF, exposición de secrets, auth inseguro, control de acceso deficiente, deserialización insegura, ejecución de código malicioso, deps desactualizadas
- [ ] Validación y sanitización de inputs de usuarios, APIs externas y servicios de integración
- [ ] Logs de auditoría: suficientes para trazabilidad pero SIN exponer contraseñas, datos personales ni secrets
- [ ] Gestión segura de secretos: credenciales y API keys fuera del código fuente (`.env` excluido del repo)
- [ ] Relación de componentes de terceros: versión + tipo de licencia al hacer deploy

### 🔴 Crítico — Protección de Datos Personales (Jurídica, 4%)

- [ ] Cumplimiento Ley 1581 de 2012 (Habeas Data) y Decreto 1377 de 2013
- [ ] Política de Tratamiento de Datos Personales como documento entregable
- [ ] Formato de aviso de privacidad / consentimiento informado conforme art. 4 Ley 1581
- [ ] Principio de minimización: solicitar solo datos estrictamente necesarios
- [ ] Derechos de los titulares: acceso, actualización, rectificación, supresión, revocatoria
- [ ] Confidencialidad: reserva sobre datos personales conocidos
- [ ] Evaluación de inscripción en RNBD (Registro Nacional de Bases de Datos) de la SIC si aplica

### 🟡 Alta — Documentación y Entregables (varias variables)

- [ ] Documento de arquitectura técnica para Android e iOS
- [ ] Manual técnico: instalación, compilación, despliegue, configuración
- [ ] Manual de usuario dirigido a MiPymes
- [ ] Scripts de creación de base de datos, estructura de tablas y datos mínimos requeridos
- [ ] Credenciales institucionales para administración inicial
- [ ] Constancia de radicación ante DNDA (Dirección Nacional de Derecho de Autor)
- [ ] Registro ante SIC si la base de datos de MiPymes supera umbrales legales

### 🟢 Media — Escalabilidad y Sostenibilidad

- [ ] Arquitectura que admita nuevas funcionalidades sin rediseño estructural
- [ ] Capacidad de crecer el número de usuarios (MiPymes) sin cambios arquitecturales mayores
- [ ] Estimación realista de costos de despliegue y operación post-entrega
- [ ] Costo de adopción y mantenimiento accesible para MiPymes de Casanare

---

## Al terminar cualquier tarea

1. Ejecutar `npm run lint` y corregir errores.
2. Verificar que las specs de OpenSpec (si aplica) sigan siendo válidas.
3. Confirmar cobertura de índices MCP con `check_index_coverage` si se tocó dominio.
4. Revisar el checklist de requisitos del concurso (sección arriba) para verificar que no se violó ningún criterio.
5. Commit message siguiendo Conventional Commits: `feat:` / `fix:` / `docs:` / `refactor:` / `chore:`

---

## Integración Skills + OpenSpec — Guía de Flujo

### ¿Cómo se complementan?

OpenSpec gestiona el ciclo de vida del cambio (nuevo spec → aplicar → sync → archive).
Skills de Addy Osmani dan los workflows detallados para cada fase del desarrollo.

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUJO DE DESARROLLO                          │
│                                                                 │
│  1. IDEA                                                       │
│     ↓ open idea-refine o interview-me                          │
│     ↓ openspec propose "idea"                                   │
│  2. ESPECIFICACIÓN                                               │
│     ↓ skill:spec-driven-development (PRD)                      │
│     ↓ openspec new change "name"                                │
│  3. PLANificación                                                │
│     ↓ skill:planning-and-task-breakdown                         │
│  4. IMPLEMENTACIÓN                                               │
│     ↓ skill:incremental-implementation + test-driven           │
│     ↓ openspec apply "change"                                  │
│  5. VERIFICACIÓN                                                 │
│     ↓ skill:security-and-hardening + code-review               │
│     ↓ npm test + npm run lint                                  │
│  6. SHIPPING                                                     │
│     ↓ skill:shipping-and-launch + git-workflow                 │
│     ↓ openspec sync + archive                                  │
│                                                                 │
│  EXPO SKILLS (sobre demanda):                                    │
│    - expo-router  → navegación                                 │
│    - expo-data-fetching → sync cola offline                    │
│    - eas-app-stores   → publicación final                       │
│    - expo-design-system → validación diseño                     │
└─────────────────────────────────────────────────────────────────┘
```

### Cuándo usar qué Skill vs OpenSpec

| Tarea | Herramienta | Acción del agente |
|-------|-------------|-------------------|
| Nuevo feature/recordatorio | `spec-driven-development` | Escribe PRD con objetivos y specs |
| Definir estándar de calidad | `constraint-driven-development` | Crea CONSTRAINTS.md con thresholds |
| Cambiar código existente | `incremental-implementation` | Vertical slices, feature flags |
| Implementar lógica nueva | `test-driven-development` | Red-Green-Refactor, pyramid |
| Código toca usuario/input/auth | `security-and-hardening` | OWASP Mobile Top 10 check |
| Antes de merge/deploy | `code-review-and-quality` | Five-axis review, ~100 lines |
| Demostrar que funciona | `debugging-and-error-recovery` | 5-step triage |
| Lanzamiento al concurso | `shipping-and-launch` | Checklist pre-lanzamiento |
| Navegación nueva | `expo-router` | Stack, tabs, modals |
| Sync SQLite ↔ Supabase | `expo-data-fetching` | Caching, offline support |
| Publicar a Play Store/TestFlight | `eas-app-stores` | Metadata, workflows |

### Ejemplo de flujo completo: "Implementar sync offline-first"

```bash
# 1. Planificar
openspec propose "offline-sync"

# 2. Definir PRD con skill
# El agente activa spec-driven-development automáticamente
# → Genera /changes/offline-sync/spec.md con objetivos

# 3. Crear cambio en OpenSpec
openspec new change "offline-sync"
# → Crea estructura con tasks derivadas del spec

# 4. Para cada task:
# skill increment + TDD
# commit atomico por skill git-workflow

# 5. Verificar seguridad
bunx skills use:security-and-hardening
# Checklist OWASP + secrets management

# 6. Review antes de merge
bunx skills use:code-review-and-quality

# 7. Sync specs al main
openspec sync "offline-sync"

# 8. Cuando esté listo el lanzamiento
bunx skills use:shipping-and-launch
openspec archive "offline-sync"
```

### Conflictos conocidos entre sistemas

| Problema | Solución |
|----------|----------|
| OpenSpec ya tiene su propio sistema de tareas | Usar Addy's `planning-and-task-breakdown` como complemento visual, no duplicado |
| `spec-driven-development` y `openspec propose` son similares | Openspec es la implementación; Addy es el workflow detallado del PRD |
| Dos archivos de restricciones (`CONSTRAINTS.md` vs `docs/constitution.md`) | Constitution es la fuente de verdad global; CONSTRAINTS.md es por feature/change |
| `expo-data-fetching` vs nuestro `lib/data/local/` | Expo Data Fetching guía el caching/sync; nuestro código implementa la lógica |
| `browser-testing-with-devtools` no aplica | Somos RN mobile, no web; ignorar este skill |

### Workflow recomendado por tipo de trabajo

**Para un nuevo feature:**
```
interview-me → spec-driven-development → openspec new change
→ planning-and-task-breakdown → incremental-implementation + TDD
→ security-and-hardening → code-review-and-quality → shipping-and-launch
```

**Para refactor/cambio menor:**
```
openspec propose "refactor-X" → constraint-driven-development
→ incremental-implementation → code-simplification (si aplica)
→ testing-driven-development → code-review-and-quality
```

**Para debugging:**
```
debugging-and-error-recovery (5 pasos) → root cause fix
→ testing-driven-development → regression test → code-review
```

---

## Lista completa de Skills instalados

### 🔵 Addy Osmani Agent-Skills (25)

| Categoría | Skills |
|-----------|--------|
| **Meta** | using-agent-skills |
| **Define** | interview-me, idea-refine, spec-driven-development, constraint-driven-development |
| **Plan** | planning-and-task-breakdown |
| **Build** | incremental-implementation, test-driven-development, context-engineering, source-driven-development, doubt-driven-development, frontend-ui-engineering, api-and-interface-design |
| **Verify** | debugging-and-error-recovery, browser-testing-with-devtools |
| **Review** | code-review-and-quality, code-simplification, security-and-hardening, performance-optimization |
| **Ship** | git-workflow-and-versioning, ci-cd-and-automation, deprecation-and-migration, documentation-and-adrs, observability-and-instrumentation, shipping-and-launch |

### 🟢 Expo Skills (12)

| Category | Skills |
|----------|--------|
| **Core** | expo-router, expo-data-fetching, expo-design-system, expo-project-structure |
| **DevTools** | expo-dev-client, expo-dom, expo-upgrade |
| **Deployment** | eas-app-stores, eas-update-insights, eas-workflows, eas-observe |

### ⚪ OpenSpec Skills (6)

| Skills | Purpose |
|--------|---------|
| openspec-explore | Explorar ideas sin commitment |
| openspec-propose | Propuesta completa con design + spec |
| openspec-apply-change | Implementar tasks desde spec |
| openspec-update-change | Revisar cambios existentes |
| openspec-archive-change | Finalizar y archivar change |
| openspec-sync-specs | Sincronizar delta specs al main |
