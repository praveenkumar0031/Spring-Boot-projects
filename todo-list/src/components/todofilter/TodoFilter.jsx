import React from 'react';
import './TodoFilter.css';

const TodoFilter = ({ filter, onFilterChange, searchTerm, onSearchChange }) => {
  return (
    <div className="todo-filter">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="filter-buttons">
        <button
          onClick={() => onFilterChange('all')}
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        >
          All
        </button>
        <button
          onClick={() => onFilterChange('pending')}
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
        >
          Pending
        </button>
        <button
          onClick={() => onFilterChange('completed')}
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoFilter;
