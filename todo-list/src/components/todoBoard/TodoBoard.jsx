import React, { useState, useEffect, useMemo } from 'react';
import TodoItem from '../todoitems/TodoItem';
import TodoForm from '../todoform/TodoForm';
import Pagination from '../pagination/Pagination';
import TodoFilter from '../todofilter/TodoFilter';
import TodoAPI from '../../services/todoApi';
import './board.css'; // move CSS here if you want

const TodoBoard = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  // filters
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos(0, 10);
  }, []);

  const filteredTodos = useMemo(() => {
    let filtered = todos;
    if (filter === 'pending') filtered = filtered.filter(todo => !todo.done);
    if (filter === 'completed') filtered = filtered.filter(todo => todo.done);
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        todo =>
          (todo.title && todo.title.toLowerCase().includes(lower)) ||
          (todo.description && todo.description.toLowerCase().includes(lower))
      );
    }
    return filtered;
  }, [todos, filter, searchTerm]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="doboard"><b>Do Board</b></h1>
      </header>

      <TodoFilter
        filter={filter}
        onFilterChange={setFilter}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="todos-container">
        {loading && <p>Loading...</p>}
        {!loading && filteredTodos.length === 0 && <p>No todos found</p>}
        <div className="todos-list">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalElements={totalElements}
          size={pageSize}
          onPageChange={() => {}}
          onSizeChange={() => {}}
        />
      </div>
    </div>
  );
};

export default TodoBoard;
