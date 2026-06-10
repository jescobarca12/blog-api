# 📝 Blog API

API REST para un blog: gestiona usuarios, autores y posts, con autenticación
basada en JWT. Es el backend que consume el cliente
[blog-frontend](https://github.com/jescobarca12/blog-frontend).

<!-- TODO (con tus palabras): añade 2-3 líneas sobre POR QUÉ hiciste este proyecto
     y qué querías practicar. Eso es lo que diferencia un README de portafolio de
     uno genérico. -->

## Características

- Registro e inicio de sesión con JWT (el registro deja al usuario logueado).
- Contraseñas hasheadas con bcrypt.
- CRUD de posts (crear/editar/borrar requieren autenticación; leer es público).
- CRUD de autores.
- Validación de entrada con Zod.
- Manejo de errores centralizado.

## Stack

Node.js, Express 5, TypeScript, PostgreSQL (driver `pg`), `jsonwebtoken`,
`bcrypt`, `zod`, `cors`.

## Estructura

```
src/
├── auth/        # register, login (controller, service, schema, routes)
├── autores/     # CRUD de autores
├── posts/       # CRUD de posts
├── middleware/  # authenticate (JWT) y errorHandler
├── db.ts        # conexión a PostgreSQL
└── index.ts     # arranque del servidor y montaje de rutas
```

Cada recurso sigue el mismo patrón en capas: `routes` → `controller` →
`service` → base de datos, con su `schema` de validación.

## Instalación

Requisitos: Node.js 22.12+ y PostgreSQL.

```bash
npm install
# crea un archivo .env (ver variables abajo)
npm run dev          # http://localhost:3000
```

Variables de entorno (`.env`):
```
DATABASE_URL=postgresql://usuario:password@host:5432/blog
PORT=3000
JWT_SECRET=una_clave_larga_y_secreta
FRONTEND_URL=http://localhost:5173
```

## API

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/auth/register` | Crear cuenta (devuelve token) | No |
| POST | `/auth/login` | Iniciar sesión (devuelve token) | No |
| GET | `/posts` | Listar posts | No |
| GET | `/posts/:id` | Ver un post | No |
| POST | `/posts` | Crear post | Sí |
| PUT | `/posts/:id` | Editar post | Sí |
| DELETE | `/posts/:id` | Borrar post | Sí |
| GET | `/autores` | Listar autores | No |
| GET | `/autores/:id` | Ver un autor | No |
| POST | `/autores` | Crear autor | No |
| PUT | `/autores/:id` | Editar autor | No |
| DELETE | `/autores/:id` | Borrar autor | No |

Las rutas con auth requieren el header `Authorization: Bearer <token>`.

## Decisiones técnicas

- **Contraseñas hasheadas con bcrypt** — nunca se guardan en texto plano.
- **Autenticación con JWT** — el token se firma al registrarse/iniciar sesión y
  se verifica en un middleware (`authenticate`) en las rutas protegidas.
- **Validación con Zod** — cada endpoint valida su entrada con un schema antes de
  tocar la base de datos.
- **Manejo de errores centralizado** — un `asyncHandler` envuelve los
  controladores asíncronos y propaga los errores a un único `errorHandler`, en
  vez de repetir `try/catch` en cada uno.
- **Organización por recursos** — cada entidad (auth, autores, posts) tiene su
  propio módulo con controller, service, schema y routes, separando
  responsabilidades.

## Autor

Jorge — Estudiante de Ingeniería de Sistemas.
