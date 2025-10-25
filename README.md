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

    - Crear una copia de `.env.template` y renombrar a `.env`.
    - Luego, reemplaza los valores según tus credenciales.

4. **Iniciar servidor de desarrollo**

```bash
pnpm dev
```

## 🐘 Levantar la base de datos

```bash
docker compose up -d db
```