# 🎯 GoalsBackend - API de Tareas y Metas Personales

Aplicación backend desarrollada con **Node.js** y **Express** que permite gestionar metas personales y las tareas necesarias para alcanzarlas.

---

## 🚀 Tecnologías utilizadas

- Node.js (versión LTS)
- Express
- Nodemon (en entorno de desarrollo)

---

## ⚙️ Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/jorge-gomez7/goalsBackend.git
cd goalsBackend
```

2. Instalar dependencias:
```bash
npm install
```
3. Ejecutar en modo desarrollo:
```bash
npm run dev
```
## 🔐 Autenticación por API Key
Todos los endpoints requieren un header Authorization con una API Key válida:
```bash
Authorization: 12345
```

## 📚 Endpoints disponibles:
| Método | Endpoint    | Descripción                         |
| ------ | ----------- | ----------------------------------- |
| GET    | /getGoals   | Obtener todas las metas registradas |
| POST   | /addGoal    | Agregar una nueva meta              |
| DELETE | /removeGoal | Eliminar una meta por ID            |
| GET    | /getTasks   | Obtener todas las tareas (global)   |
| POST   | /addTask    | Agregar una tarea a una meta        |
| DELETE | /removeTask | Eliminar una tarea de una meta      |

## Ejemplos
### 📤 POST /addGoal
![image](https://github.com/user-attachments/assets/f78f4152-60ac-4abb-b0b1-38b4d5d019f9)

### 📤 POST /addTask
![image](https://github.com/user-attachments/assets/6cdb5aa9-3786-4e9f-83e9-e0efd057f21b)

### 📤 GET /getGoals
![image](https://github.com/user-attachments/assets/4c9ea2a2-f108-43c5-a7ab-90b127aecbab)

#### Desarrollado por Jorge Gómez
