import styles from './index.module.scss';
import { AddTask } from '../components/AddTask';
import { useToDoStore } from '../../data/store/useToDoStore';
import { TaskItem } from '../components/TaskItem';
import { useState } from 'react';

type FilterType = 'all' | 'active' | 'completed';

export const App = () => {
  const tasks = useToDoStore((state) => state.tasks);
  const createTask = useToDoStore((state) => state.createTask);
  const updateTask = useToDoStore((state) => state.updateTask);
  const removeTask = useToDoStore((state) => state.removeTask);
  const toggleTask = useToDoStore((state) => state.toggleTask);

  const activeTasksCount = useToDoStore(
    (state) => state.tasks.filter((task) => !task.completed).length
  );

  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  return (
    <div className={styles.app}>
      <h1 className={styles.appTitle}>TO DO REACT APP</h1>

      {tasks.length > 0 && (
        <div className={styles.tasksInfo}>
          <p className={styles.activeTasksCount}>
            Active tasks: {activeTasksCount}
          </p>
        </div>
      )}

      {tasks.length > 0 && (
        <div className={styles.filters}>
          <button
            className={filter === 'all' ? styles.active : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>

          <button
            className={filter === 'active' ? styles.active : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>

          <button
            className={filter === 'completed' ? styles.active : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      )}

      <section className={styles.appSection}>
        <AddTask
          onAdd={(title: string) => {
            if (title) {
              createTask(title);
            }
          }}
        />
      </section>

      <section className={styles.appSection}>
        {!filteredTasks.length && (
          <p className={styles.appSectionText}>
            {filter === 'all' && 'No tasks'}
            {filter === 'active' && 'No active tasks'}
            {filter === 'completed' && 'No completed tasks'}
          </p>
        )}
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            onDeleted={removeTask}
            completed={task.completed}
            onCompleted={toggleTask}
            onEdit={updateTask}
          />
        ))}
      </section>
    </div>
  );
};
