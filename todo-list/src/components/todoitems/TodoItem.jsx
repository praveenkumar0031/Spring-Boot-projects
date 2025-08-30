import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title || '',
    description: todo.description || ''
  });

  const handleToggleDone = () => {
    onUpdate({
      ...todo,
      done: !todo.done
    });
  };

  const handleSave = () => {
    if (editData.title.trim()) {
      onUpdate({
        ...todo,
        title: editData.title.trim(),
        description: editData.description.trim()
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      title: todo.title || '',
      description: todo.description || ''
    });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`todo-item ${todo.done ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={handleToggleDone}
          className="todo-checkbox"
        />
        
        <div className="todo-details">
          {isEditing ? (
            <div className="todo-edit-form">
              <input
                type="text"
                value={editData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                onKeyDown={handleKeyPress}
                className="todo-edit-title"
                placeholder="Todo title"
                autoFocus
              />
              <textarea
                value={editData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                onKeyDown={handleKeyPress}
                className="todo-edit-description"
                placeholder="Todo description"
                rows="2"
              />
            </div>
          ) : (
            <div className="todo-display" onDoubleClick={() => setIsEditing(true)}>
              <h4 className="todo-title">{todo.title}</h4>
              {todo.description && (
                <p className="todo-description">{todo.description}</p>
              )}
              <small className="todo-id">ID: {todo.id}</small>
            </div>
          )}
        </div>
      </div>
      
      <div className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="save-btn" title="Save">
              ✓
            </button>
            <button onClick={handleCancel} className="cancel-btn" title="Cancel">
              ✗
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => setIsEditing(true)} 
              className="edit-btn"
              title="Edit"
            >
              ✏️
            </button>
            <button 
              onClick={() => onDelete(todo.id)} 
              className="delete-btn"
              title="Delete"
            >
              🗑️
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
