/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../types/Todo';
import cn from 'classnames';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
};

export const TodoItem: React.FC<TodoItemProps> = React.memo(
  ({ todo, onToggle }) => {
    const { completed, title, id } = todo;

    const handleToggle = () => {
      onToggle(id); // Викликаємо обробник, коли чекбокс змінюється
    };

    return (
      <div
        data-cy="Todo"
        className={cn('todo', {
          completed: completed,
        })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={completed} // Використовуємо checked для контролю стану
            onChange={handleToggle} // Обробник зміни статусу
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          {title}
        </span>

        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>

        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    );
  },
);

TodoItem.displayName = 'TodoItem';
