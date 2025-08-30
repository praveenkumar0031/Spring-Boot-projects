import React, { useState, useEffect } from 'react';
import './TodoForm.css';

const TodoForm = ({ onSubmit, isLoading, editTodo = null, onCancel = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    done: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editTodo) {
      setFormData({
        title: editTodo.title || '',
        description: editTodo.description || '',
        done: editTodo.done || false
      });
    }
  }, [editTodo]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const todoData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim()
    };

    if (editTodo) {
      todoData.id = editTodo.id;
    }

    onSubmit(todoData);

    if (!editTodo) {
      setFormData({
        title: '',
        description: '',
        done: false
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter todo title"
          className={`form-input ${errors.title ? 'error' : ''}`}
          disabled={isLoading}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Enter todo description (optional)"
          className="form-textarea"
          rows="3"
          disabled={isLoading}
        />
      </div>

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.done}
            onChange={(e) => handleChange('done', e.target.checked)}
            disabled={isLoading}
          />
          Mark as completed
        </label>
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading || !formData.title.trim()}
        >
          {isLoading ? '...' : editTodo ? 'Update Todo' : 'Add Todo'}
        </button>
        
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="cancel-btn"
            disabled={isLoading}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
