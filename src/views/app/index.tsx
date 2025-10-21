import styles from './index.module.scss';
import { AddTask } from '../components/AddTask';
import { useToDoStore } from '../../data/store/useToDoStore';
import { TaskItem } from '../components/TaskItem';


export const App = () => {
  const tasks = useToDoStore((state) => state.tasks);
  const createTask = useToDoStore((state) => state.createTask);
  const updateTask = useToDoStore((state) => state.updateTask);
  const removeTask = useToDoStore((state) => state.removeTask);
  const toggleTask = useToDoStore((state) => state.toggleTask);
  // const activeTasksCount = tasks.filter((task) => !task.completed).length;

  const activeTasksCount = useToDoStore(
    (state) => state.tasks.filter((task) => !task.completed).length
  );

  return (
    <div className={styles.app}>
      <h1 className={styles.appTitle}>TO DO OR NOT TO DO APP</h1>

      {tasks.length > 0 && (
        <div className={styles.tasksInfo}>
          <p className={styles.activeTasksCount}>
            Осталось задач: {activeTasksCount}
          </p>
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
        {!tasks.length && (
          <p className={styles.appSectionText}>There are no tasks.</p>
        )}
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            onDeleted={removeTask}
            completed={task.completed}
            // onCompleted={removeTask}
            onCompleted={toggleTask}
            onEdit={updateTask}
          />
        ))}
      </section>
    </div>
  );
};
