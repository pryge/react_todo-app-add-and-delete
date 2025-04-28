import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';

import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoHeader } from './components/Header';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/Footer';
import { Filter } from './types/Filter';
import { createTodo } from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filterBy, setFilterBy] = useState<Filter>(Filter.All);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const activeTodosCount = useMemo(
    () => todos.reduce((sum, todo) => (!todo.completed ? sum + 1 : sum), 0),
    [todos],
  );

  const handleAdd = async () => {
    if (newTodoTitle.trim() === '') {
      setError('Title should not be empty');

      return;
    }

    const trimmedTitle = newTodoTitle.trim();

    setIsAdding(true);

    try {
      const newTodoFromServer = await createTodo({
        title: trimmedTitle,
        userId: 2619,
        completed: false,
      });

      setTodos(currentTodos => [...currentTodos, newTodoFromServer]);
      setNewTodoTitle('');
    } catch (err) {
      setError('Unable to add todo');
    } finally {
      setIsAdding(false);
    }
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterBy) {
        case Filter.Active:
          return !todo.completed;

        case Filter.Completed:
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filterBy]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          newTodoTitle={newTodoTitle}
          setNewTodoTitle={setNewTodoTitle}
          isAdding={isAdding}
          onAdd={handleAdd}
        />

        {todos.length !== 0 && (
          <TodoList todos={filteredTodos} setTodos={setTodos} />
        )}

        {todos.length !== 0 && (
          <TodoFooter
            setFilterBy={setFilterBy}
            filterBy={filterBy}
            activeTodosCount={activeTodosCount}
          />
        )}
      </div>

      {/* Error notification */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setError('')}
        />
        {error}
      </div>
    </div>
  );
};
