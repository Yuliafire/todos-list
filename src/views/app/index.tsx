import styles from './index.module.scss';
import { useEffect } from 'react';
import { AddTask } from '../components/AddTask';
import { useToDoStore } from '../../data/store/useToDoStore';
import { TaskItem } from '../components/TaskItem';

export const App = () => {
  const tasks = useToDoStore((state) => state.tasks);
  const createTask = useToDoStore((state) => state.createTask);
  const updateTask = useToDoStore((state) => state.updateTask);
  const removeTask = useToDoStore((state) => state.removeTask);

  useEffect(() => {
    createTask('');
  }, [createTask]);



  return (
    <div className={styles.app}>
      <h1 className={styles.appTitle}>TO DO OR NOT TO DO APP</h1>
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
        {!tasks.length && (
          <p className={styles.appSectionText}>There are no tasks.</p>
        )}
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            onDeleted={removeTask}
            onCompleted={removeTask}
            onEdit={updateTask}
          />
        ))}
      </section>
    </div>
  );
};
