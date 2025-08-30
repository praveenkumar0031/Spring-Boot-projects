📝 TodoBoard – Todo List Manager
    
A simple and elegant Todo List Manager built with React (frontend) and Spring Boot (backend).
It helps you organize tasks, filter by status, and search with ease.

🚀 Features

✅ Create, Read, Update, Delete (CRUD) todos

✅ Filter tasks by All / Pending / Completed

✅ Search tasks instantly

✅ Pagination support for large lists

✅ REST API powered by Spring Boot

✅ Responsive UI with React & CSS

🏗️ Tech Stack

Frontend
⚛️ React (Vite or CRA)
🎨 CSS / Tailwind

Backend
☕ Spring Boot (Java)
🗄️ Spring Data JPA + Hibernate
💾 H2 / MySQL (configurable)


📡 API Endpoints
| Method | Endpoint                   | Description           |
| ------ | -------------------------- | --------------------- |
| GET    | `/api/todo/get/{id}`       | Get todo by ID        |
| GET    | `/api/todo/get/all`        | Get all todos         |
| POST   | `/api/todo/create`         | Create new todo       |
| PUT    | `/api/todo/update`         | Update existing todo  |
| DELETE | `/api/todo/delete/{id}`    | Delete todo by ID     |
| DELETE | `/api/todo/delete/all`     | Delete all todos      |
| GET    | `/api/todo/page?no=&size=` | Get todos with paging |
