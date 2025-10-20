import styles from './index.module.scss';
import { useState } from 'react';

interface TaskItemProps {
  id: string;
  title: string;
  onCompleted: (id: string) => void;
  onDeleted: (id: string) => void;
  onEdit: (id: string, value: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  onCompleted,
  onDeleted,
  onEdit,
}) => {
  const [checked, setChecked] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(title);

  return (
    <div className={styles.inputTaskItem}>
      <label className={styles.inputTaskItemLabel}>
        <input
          type="checkbox"
          disabled={edit}
          checked={checked}
          className={styles.inputTaskItemCheckBox}
          onChange={(e) => {
            setChecked(e.target.checked);
            if (e.target.checked) {
              onCompleted(id);
            }
          }}
        />
        {edit ? (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onEdit(id, value);
                setEdit(false);
              }
              if (e.key === ' Escape') {
                setValue(title);
                setEdit(false);
              }
            }}
            className={styles.inputTaskItemTitleEdit}
            autoFocus
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
