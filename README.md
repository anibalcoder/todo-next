# 📝 Todo APP

Aplicación de lista de tareas con base de datos PostgreSQL para almacenar tareas 📄.

## 🔧 Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/anibalcoder/todo-next.git
cd todo-next
```

2. **Instala dependencias**

```bash
pnpm install
```

3. **Configurar entorno**

    - Crear una copia de `.env.example` y renombrar a `.env`.

    - Para generar `AUTH_SECRET`, ejecutar: `pnpm dlx auth secret`
        - Esto generará un archivo `.env.local` con un valor de `AUTH_SECRET`.
        - Copiar ese valor dentro del archivo `.env`.

    - Luego, reemplaza los valores según tus credenciales.

4. **Iniciar servidor de desarrollo**

```bash
pnpm dev
```

## 🐘 Levantar la base de datos

```bash
docker compose up -d db
```

## 🧩 Prisma ORM

1. **Ejecutar migraciones**

```bash
# Aplica los cambios del esquema a la base de datos.
# Genera el cliente de Prisma automáticamente.
pnpm dlx prisma migrate dev
```

2. **Regenerar el cliente Prisma (si cambias el schema)**

```bash
pnpm dlx prisma generate
```