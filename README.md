# 🏪 ContAhorra — Gestión de Inventario & Finanzas para Comercios

Aplicación móvil multiplataforma construida con **Expo + React Native** que permite a pequeños comercios administrar su inventario, registrar transacciones financieras y ofrecer un catálogo público de productos y precios.

El proyecto fue iniciado hace ~2 años como parte del desarrollo profesional y actualmente se encuentra en producción limitada con las funcionalidades core completas.

---

## 🔍 Resumen Rápido

| Qué hace | Cómo funciona |
|----------|--------------|
| **Gestión de inventario** | Categorías, cuentas y perfiles editables desde el panel de administración |
| **Control financiero** | Registro de gastos, ingresos, préstamos y transferencias con filtros por tipo y fecha |
| **Publicación pública** | Estructura lista para exponer catálogos de productos a clientes sin registro |
| **Búsqueda inteligente** | Algoritmo proposal para recomendar dónde comprar artículos según precio y cercanía |

---

## 📸 Capturas (Placeholder)

> *Aquí irían screenshots de la app en funcionamiento una vez desplegada.*

| Pantalla | Descripción |
|----------|------------|
| Login | Autenticación con email/contraseña y Google Sign-In |
| Dashboard | Vista principal con saldo, filtros y listado de transacciones |
| Agregar transacción | Formulario paso a paso con calculadora integrada |
| Editor | CRUD de categorías, cuentas y perfiles |
| Configuración | Modo oscuro, idioma y ajustes generales |

---

## 🏗️ Arquitectura

El código sigue **Clean Architecture / DDD** con separación clara entre dominio, datos e interfaz:

```
ContAhorra/
├── app/                          # Expo Router — rutas y pantallas
│   ├── (drawer)/                 # App principal con navegación lateral
│   │   ├── (tabs)/index.tsx      # Dashboard: saldo + transacciones
│   │   ├── (tabs)/grafics.tsx    # Gráficos financieros (en desarrollo)
│   │   ├── (tabs)/editor.tsx     # Editor de categorías/cuentas/perfiles
│   │   ├── bolsillo.tsx          # Módulo billetera
│   │   ├── reports.tsx           # Reportes
│   │   └── config.tsx            # Configuración general
│   ├── login.tsx                 # Autenticación
│   └── add_tansaction.tsx        # Formulario de nueva transacción
├── components/                   # UI reutilizable (~70 componentes Gluestack-UI)
│   ├── AddTransaction/           # Paso a paso: tipo → fecha → monto → detalle
│   ├── Cuentas/                  # Filtros, saldo heading, listado por mes
│   ├── Editor/                   # Listado CRUD con edición inline
│   └── Login/                    # Formularios login, registro, recuperación
├── lib/
│   ├── domain/                   # Entidades + Casos de uso (lógica pura)
│   ├── data/                     # Repositorios SQLite local + Supabase remoto
│   ├── store/                    # Estado global con Zustand
│   └── Hooks/                    # Hooks de negocio (useLogin, useCalculadora…)
├── i18n/                         # Español / Inglés
└── .env.example                  # Variables de entorno requeridas
```

### Tecnologías principales

| Capa | Tecnologia |
|------|-----------|
| Framework | Expo SDK 51 · React Native 0.74 · TypeScript 5.3 |
| Estado | Zustand · DI Container propio |
| DB local | expo-sqlite (offline-first, migraciones automáticas) |
| Backend | Supabase (Auth + Base de datos remota) |
| UI | Gluestack-UI · NativeWind (Tailwind para RN) |
| Gráficos | react-native-gifted-charts |
| i18n | i18next · react-i18next |
| Tests | Jest · React Native Testing Library |

---

## 🗄️ Modelo de Datos

**SQLite local** con 5 entidades principales y sincronización diferida vía flag `uptodataBase`:

| Tabla | Campos clave |
|-------|-------------|
| `categorias` | id, name, icon, type (Gasto/Ingreso/Transferencia), color, userOwnerID |
| `cuentas` | id, name, icon, grupal, color, userOwnerID |
| `perfiles` | id, name, avatar_url, userOwnerID, userReferredID |
| `grupos` | id, name, icon, usersIdInGroup (array de IDs) |
| `transacciones` | id, balance, type, date, description, categoryID, accountID, prestadoaID |

---

## ✅ Funcionalidades Implementadas

- [x] Autenticación Supabase (email/password + Google Sign-In)
- [x] Crear, leer, actualizar y eliminar transacciones
- [x] Filtros por tipo y rango de fechas
- [x] Navegación mensual con SectionList agrupado
- [x] CRUD completo de categorías, cuentas y perfiles
- [x] Modo oscuro / claro con persistencia
- [x] Internacionalización ES / EN con cambio dinámico
- [x] DI Container con casos de uso tipados
- [x] Validación de formularios con Yup
- [x] Notificaciones toast en acciones críticas
- [x] Offline-first: escritura siempre local primero
- [x] Tests unitarios básicos (`useCalculadora.test.ts`)

---

## 🔲 Funcionalidades Pendientes

| Prioridad | Feature | Estado |
|-----------|---------|--------|
| 🔴 Alta | **Gráficos financieros** | Stub vacío en `grafics.tsx` |
| 🔴 Alta | **Sincronización con Supabase** | Use case solo escribe local; falta lógica de upload |
| 🔴 Alta | **Módulo Bolsillo completo** | Placeholder actual, requiere rediseño |
| 🟡 Media | **Catálogo público web** | Publicar productos/precios para clientes sin cuenta |
| 🟡 Media | **Algoritmo de búsqueda inteligente** | Recomendar tiendas por precio + distancia |
| 🟡 Media | **Geolocalización + mapas** | Integrar con Google Maps / Mapbox |
| 🟢 Baja | **Exportar reportes PDF/CSV** | Descarga de movimientos |
| 🟢 Baja | **Notificaciones push** | Recordatorios de pagos y presupuestos |

---

## 🚀 Cómo Usar la Aplicación

### Como desarrollador (desplegar localmente)

```bash
# 1. Clonar y entrar al repositorio
git clone https://github.com/Pevalcar/ContAhorra.git
cd ContAhorra

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase y Google

# 4. Ejecutar en modo desarrollo
npm run dev          # Web (puerto 3000)
npm run android      # Android
npm run ios          # iOS
```

### Como usuario final (cuando esté listo)

1. **Descargar la app** desde Google Play Store o Apple App Store (link pendiente de publicación)
2. **Crear una cuenta** con email y contraseña, o iniciar sesión con Google
3. **Configurar tu comercio**: agregar categorías, cuentas bancarias y perfiles (ej: empleados/familiares)
4. **Registrar transacciones** tocando el botón **+** y siguiendo el flujo: tipo → monto → categoría → descripción
5. **Ver resumen** en el dashboard con saldo total y movimientos por mes
6. **Compartir catálogo** publicando los productos desde el editor (funcionalidad en desarrollo)

---

## 🔒 Seguridad

- Credenciales almacenadas en variables de entorno (nunca hardcodeadas)
- Tokens JWT gestionados por Supabase Auth con refresh automático
- Datos sensibles persistidos localmente en SQLite del dispositivo
- `.env` excluido del repositorio mediante `.gitignore`

> ⚠️ **Nota:** Las credenciales antiguas de Supabase fueron revocadas y migradas a variables de entorno en octubre 2024. El historial de Git antiguo debe limpiarse antes de hacer el repo público (ver sección de seguridad abajo).

---

## 🛡️ Seguridad — Credencial Expuesta en Historial

Las keys de Supabase estuvieron hardcodeadas en commits previos (septiembre–octubre 2024). Para publicar este repo como portafolio debes:

1. **Regenerar la anon key** en [Supabase Dashboard → Settings → API](https://supabase.com/dashboard/project/_/settings/api)
2. **Limpiar el historial de Git**:
   ```bash
   git filter-branch -f --tree-filter '
     sed -i "" "/eyJhbGciOiJIUzI1NiIs/d' lib/configs/supabase.ts 2>/dev/null
   ' HEAD
   ```
   O usar [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) para mayor eficiencia.
3. **Forzar push** después de reescribir:
   ```bash
   git push --force --with-origin
   ```

---

## 📄 Licencia

MIT © 2024 Pevalcar — ver [`LICENSE`](./LICENSE) para detalles.
