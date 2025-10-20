import styles from './index.module.scss';
import { useState, useRef, useEffect } from 'react';

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  onCompleted: (id: string) => void;
  onDeleted: (id: string) => void;
  onEdit: (id: string, value: string) => void;
}

export const TaskItem = ({
  id,
  title,
  completed, // Add this
  onCompleted,
  onDeleted,
  onEdit,
}: TaskItemProps) => {
  const [checked, setChecked] = useState(completed); // Initialize with completed prop
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (edit) {
      editTitleInputRef?.current?.focus();
    }
  }, [edit]);

  // Sync local checked state with prop changes
  useEffect(() => {
    setChecked(completed);
  }, [completed]);

  return (
    <div
      className={`${styles.inputTaskItem} ${checked ? styles.completed : ''}`}
    >
      <label className={styles.inputTaskItemLabel}>
        <input
          type="checkbox"
          disabled={edit}
          checked={checked}
          className={styles.inputTaskItemCheckBox}
          onChange={(e) => {
            setChecked(e.target.checked);
            onCompleted(id); // This will toggle the completed status
          }}
        />
        {edit ? (
          <input
            ref={editTitleInputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onEdit(id, value);
                setEdit(false);
              }
              if (e.key === 'Escape') {
                setValue(title);
                setEdit(false);
              }
            }}
            className={styles.inputTaskItemTitleEdit}
          />
        ) : (
          <h3 className={styles.inputTaskItemTitle}>{title}</h3>
        )}
      </label>

      {edit ? (
        <button
          aria-label="Save"
          className={styles.saveButton}
          onClick={() => {
            onEdit(id, value);
            setEdit(false);
          }}
        />
      ) : (
        <button
          aria-label="edit"
          onClick={() => setEdit(true)}
          className={styles.editButton}
          disabled={checked}
        />
      )}

      <button
        aria-label="delete"
        onClick={() => onDeleted(id)}
        className={styles.deleteButton}
      />
    </div>
  );
};