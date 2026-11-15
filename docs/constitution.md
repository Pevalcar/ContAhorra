# Constitution — ContAhorra

Principios que toda modificación debe respetar. Si una propuesta los viola, se refactoriza antes de continuar.

---

## C1 — Offline-First

Las escrituras siempre van a SQLite local primero. Supabase es best-effort. La flag `uptodataBase` en cada entidad rastrea el estado de sincronización. Nunca lanzar error por falta de red; acumular para luego.

**Regla:** si un use-case depende de red, envolver en try/catch y loggear, nunca bublear.

---

## C2 — Dominio Puro

Entidades en `lib/domain/entities/` no conocen bases de datos, redes ni UI. Use-cases en `lib/domain/usecases/` solo importan interfaces, nunca implementaciones. Si un use-case importa `expo-sqlite` o `@supabase/supabase-js`, la capa está rota — mover la llamada al repositorio correspondiente.

**Regla:** `domain/` no importa nada de `lib/data`, `components` ni `app`.

---

## C3 — Stores Sencillos

Zustand stores en `lib/store/` manejan solo estado de UI (loading, filtros, tabs activas) y orquestan use-cases vía el DI container. Nunca importan repositorios directamente. Máximo 200 líneas; si crece más, separar en sub-stores.

**Regla:** las acciones del store llaman `Container.xxx.execute()`, nunca `repository.metodo()`.

---

## C4 — Componentes con Contrato Explícito

Cada componente declara sus props como `interface Props { ... }` nombrada. Sin tipos inline. Los componentes reciben datos por props o hooks; nunca acceden a stores directamente. La lógica de negocio vive en `lib/Hooks/`.

**Regla:** `useTransaccionesStore()` dentro de un component de pantalla está prohibido — usar hook de `lib/Hooks/` en su lugar.

---

## C5 — Navegación por Convención de Archivos

Rutas definidas exclusivamente por ubicación de archivos bajo `app/`. Grupos entre paréntesis `(drawer)` y `(tabs)` se resuelven automáticamente por Expo Router. Crear una pantalla nueva = un archivo `.tsx`; sin configuración adicional.

**Regla:** nuevas pantallas → `app/`. Nuevos items de drawer/tab → `CustomDrawer.tsx` + layout group correspondiente.

---

## C6 — Internacionalización desde el Inicio

Todo texto visible para el usuario pasa por `useTranslation()` de `react-i18next`. Las keys viven en `i18n/locales/en.json` y `es.json`. Al agregar string nuevo, agregar a AMBOS archivos. Default: `es-CO`, fallback: `en-US`.

**Regla:** cero strings hardcodeados en español o inglés dentro de componentes.

---

## C7 — IA Augmenta, Nunca Decide

Los módulos de IA (OpenAI/Ollama) proveen sugerencias — categorización, insights, alertas. Jamás escriben datos solos, jamás sobrescriben categorías sin confirmación explícita del usuario, jamás toman decisiones financieras. Los resultados AI se muestran siempre con etiqueta "Suggested".

**Regla:** no existe ningún path de escritura impulsado por IA.

---

## C8 — Puerta de Entrada para Dependencias

Agregar un paquete npm requiere justificación: (1) no se puede resolver con deps existentes, (2) menos de 5KB gzipped, (3) tree-shakeable o bundle pequeño. Preferir APIs nativas de React Native, módulos de expo o paquetes ya instalados.

**Regla:** PRs que agregan dependencias deben incluir justificación en comentario dentro de `package.json`.
