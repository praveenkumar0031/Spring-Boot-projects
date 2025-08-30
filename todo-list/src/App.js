import React, { useState, useEffect, useMemo } from 'react';
import TodoItem from './components/todoitems/TodoItem';
import TodoForm from './components/todoform/TodoForm';
import Pagination from './components/pagination/Pagination';
import TodoFilter from './components/todofilter/TodoFilter';
import TodoAPI from './services/todoApi';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  
  // Filter states
  const [filter, setFilter] = useState('all'); // all, pending, completed
  const [searchTerm, setSearchTerm] = useState('');

  // Load todos with pagination
  const loadTodos = async (page = currentPage, size = pageSize) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await TodoAPI.getTodosPage(page, size);
      
      setTodos(response.content || []);
      setTotalPages(response.totalPages || 0);
      setTotalElements(response.totalElements || 0);
      setCurrentPage(page);
      setPageSize(size);
    } catch (err) {
      setError('Failed to load todos: ' + err.message);
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter and search todos
  const filteredTodos = useMemo(() => {
    let filtered = todos;

    // Apply status filter
    if (filter === 'pending') {
      filtered = filtered.filter(todo => !todo.done);
    } else if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.done);
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(todo =>
        (todo.title && todo.title.toLowerCase().includes(searchLower)) ||
        (todo.description && todo.description.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, [todos, filter, searchTerm]);

  // Add new todo
  const handleAddTodo = async (todoData) => {
    try {
      setError(null);
      await TodoAPI.createTodo(todoData);
      setShowForm(false);
      
      // Reload current page
      await loadTodos(currentPage, pageSize);
    } catch (err) {
      setError('Failed to add todo: ' + err.message);
      console.error('Error adding todo:', err);
    }
  };

  // Update todo
  const handleUpdateTodo = async (updatedTodo) => {
    try {
      setError(null);
      await TodoAPI.updateTodo(updatedTodo);
      
      // Update local state
      setTodos(prev =>
        prev.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
      
      setEditingTodo(null);
    } catch (err) {
      setError('Failed to update todo: ' + err.message);
      console.error('Error updating todo:', err);
    }
  };

  // Delete single todo
  const handleDeleteTodo = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        setError(null);
        await TodoAPI.deleteTodo(id);
        
        // Reload current page
        await loadTodos(currentPage, pageSize);
      } catch (err) {
        setError('Failed to delete todo: ' + err.message);
        console.error('Error deleting todo:', err);
      }
    }
  };

  // Delete all todos
  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete ALL todos? This action cannot be undone.')) {
      try {
        setError(null);
        await TodoAPI.deleteAllTodos();
        
        // Reset to first page and reload
        await loadTodos(0, pageSize);
      } catch (err) {
        setError('Failed to delete all todos: ' + err.message);
        console.error('Error deleting all todos:', err);
      }
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 0 && page < totalPages) {
      loadTodos(page, pageSize);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (size) => {
    if (size !== pageSize) {
      loadTodos(0, size); // Reset to first page with new size
    }
  };

  // Load todos on component mount
  useEffect(() => {
    loadTodos(0, 10);
  }, []);

  // Calculate stats
  const stats = useMemo(() => {
    const completed = todos.filter(todo => todo.done).length;
    const pending = todos.length - completed;
    return { total: todos.length, completed, pending };
  }, [todos]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="doboard"><b>Do Board</b></h1>
        <div className="todo-stats">
          <div className="stat-item">
            <span className="stat-number">{totalElements}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-number pending">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-item">
            <span className="stat-number completed">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
        
        <button 
          onClick={() => setShowForm(true)} 
          className="add-todo-btn"
          disabled={loading}
        >
          + Add New Todo
        </button>
      </header>

      {error && (
        <div className="error-message">
          <span>{error}</span>
          <button onClick={() => loadTodos(currentPage, pageSize)}>
            Retry
          </button>
        </div>
      )}

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Todo</h2>
            <TodoForm
              onSubmit={handleAddTodo}
              isLoading={loading}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {editingTodo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Todo</h2>
            <TodoForm
              editTodo={editingTodo}
              onSubmit={handleUpdateTodo}
              isLoading={loading}
              onCancel={() => setEditingTodo(null)}
            />
          </div>
        </div>
      )}

      <TodoFilter
        filter={filter}
        onFilterChange={setFilter}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="todos-container">
        {loading && todos.length === 0 ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading todos...</p>
          </div>
        ) : filteredTodos.length === 0 ? (
          <div className="empty-state">
            {todos.length === 0 ? (
              <div>
                <h3>No todos yet</h3>
                <p>Create your first todo to get started!</p>
                <button 
                  onClick={() => setShowForm(true)} 
                  className="empty-state-btn"
                >
                  Add Todo
                </button>
              </div>
            ) : (
              <div>
                <h3>No todos match your filters</h3>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="todos-list">
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalElements={totalElements}
              size={pageSize}
              onPageChange={handlePageChange}
              onSizeChange={handlePageSizeChange}
            />
          </>
        )}
      </div>

      {todos.length > 0 && (
        <div className="bulk-actions">
          <button 
            onClick={handleDeleteAll} 
            className="delete-all-btn"
            disabled={loading}
          >
            🗑️ Delete All Todos
          </button>
          
          <button 
            onClick={() => loadTodos(currentPage, pageSize)} 
            className="refresh-btn"
            disabled={loading}
          >
            🔄 Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
