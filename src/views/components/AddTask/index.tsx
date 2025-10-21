import styles from './index.module.scss';
import { useState, useCallback } from 'react';

interface AddTaskProps {
  onAdd: (title: string) => void;
}

export const AddTask = ({ onAdd }: AddTaskProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddTask = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (inputValue.trim()) {
        onAdd(inputValue.trim());
        setInputValue('');
      }
    },
    [inputValue, onAdd]
  );

  return (
    <div className={styles.addTask}>
      <input
        type="text"
        id="taskInput"
        className={styles.addTaskValue}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddTask(e);
          }
        }}
        placeholder="Add a task"
        aria-label="Add a task"
      />
      <button className={styles.addTaskButton} onClick={handleAddTask} type="submit">
        Add
      </button>
    </div>
  );
};
