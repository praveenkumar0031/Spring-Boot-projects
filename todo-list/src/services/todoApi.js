const API_BASE_URL = process.env.REACT_APP_Backend_APi;

// helper to get headers with Authorization token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

class TodoAPI {
  async getAllTodos() {
    const response = await fetch(`${API_BASE_URL}/get/all`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch todos");
    return response.json();
  }

  async getTodosPage(page = 0, size = 10) {
    const response = await fetch(
      `${API_BASE_URL}/page?no=${page}&size=${size}`,
      { headers: getAuthHeaders() }
    );
    if (!response.ok) throw new Error("Failed to fetch todos page");
    return response.json();
  }

  async getTodoById(id) {
    const response = await fetch(`${API_BASE_URL}/get?todoId=${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch todo");
    return response.json();
  }

  async createTodo(todoData) {
    const response = await fetch(`${API_BASE_URL}/create`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(todoData),
    });
    if (!response.ok) throw new Error("Failed to create todo");
    return response.json();
  }

  async updateTodo(todoData) {
    const response = await fetch(`${API_BASE_URL}/update`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(todoData),
    });
    if (!response.ok) throw new Error("Failed to update todo");
    return response.json();
  }

  async deleteTodo(id) {
    const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete todo");
    return response.text();
  }

  async deleteAllTodos() {
    const response = await fetch(`${API_BASE_URL}/delete/all`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete all todos");
    return response.text();
  }
}

export default new TodoAPI();
