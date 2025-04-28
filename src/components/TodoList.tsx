import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

type TodoListProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>; // Додано для оновлення стану
};

export const TodoList: React.FC<TodoListProps> = React.memo(
  ({ todos, setTodos }) => {
    const handleToggle = (id: number) => {
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    };

    return (
      <section className="todoapp__main" data-cy="TodoList">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle} // Передаємо handleToggle в TodoItem
          />
        ))}
      </section>
    );
  },
);

TodoList.displayName = 'TodoList';
