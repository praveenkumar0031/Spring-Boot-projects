const API_BASE_URL = 'http://localhost:8080/api/todo'; // Update with your backend URL

class TodoAPI {
  async getAllTodos() {
    const response = await fetch(`${API_BASE_URL}/get/all`);
    console.log(response);
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
  }

  async getTodosPage(page = 0, size = 10) {
    const response = await fetch(`${API_BASE_URL}/page?no=${page}&size=${size}`);
    if (!response.ok) throw new Error('Failed to fetch todos page');
    return response.json();
  }

  async getTodoById(id) {
    const response = await fetch(`${API_BASE_URL}/get?todoId=${id}`);
    if (!response.ok) throw new Error('Failed to fetch todo');
    return response.json();
  }

  async createTodo(todoData) {
    const response = await fetch(`${API_BASE_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    if (!response.ok) throw new Error('Failed to create todo');
    return response.json();
  }

  async updateTodo(todoData) {
    const response = await fetch(`${API_BASE_URL}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    if (!response.ok) throw new Error('Failed to update todo');
    return response.json();
  }

  async deleteTodo(id) {
    const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete todo');
    return response.text();
  }

  async deleteAllTodos() {
    const response = await fetch(`${API_BASE_URL}/delete/all`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete all todos');
    return response.text();
  }
}
const todoApiInstance = new TodoAPI();

export default new TodoAPI();
