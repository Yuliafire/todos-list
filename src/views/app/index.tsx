import styles from './index.module.scss';
import { AddTask } from '../components/AddTask';
import { useToDoStore } from '../../data/store/useToDoStore';

export const App = () => {
  const createTask = useToDoStore((state) => state.createTask);
  return (
    <div className={styles.app}>
      <h1 className={styles.appTitle}>Todo Task App</h1>
      <section className={styles.appSection}>
        <AddTask
          onAdd={(title: string) => {
            if (title) {
              createTask(title);
            }
          }}
        />
      </section>

      <section className={styles.appSection}></section>
    </div>
  );
};
