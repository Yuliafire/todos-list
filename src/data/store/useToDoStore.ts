import create, { type StateCreator, type State } from 'zustand';
import { generateId } from '../helper';
import { devtools } from 'zustand/middleware';
import type { Task } from '../../types/types';

interface ToDoStore {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

function isToDoStore(object: unknown): object is ToDoStore {
  return (
    object != null &&
    typeof object === 'object' &&
    'tasks' in object &&
    Array.isArray((object as ToDoStore).tasks)
  );
}

const localStorageUpdate =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (state, ...args) => {
        set(state, ...args);

        const newState = get();
        if (isToDoStore(newState)) {
          try {
            window.localStorage.setItem(
              'tasks',
              JSON.stringify(newState.tasks)
            );
          } catch (error) {
            console.error('Failed to save tasks to localStorage:', error);
          }
        }
      },
      get,
      api
    );

const getCurrentState = (): Task[] => {
  try {
    const currentState = JSON.parse(
      window.localStorage.getItem('tasks') || '[]'
    ) as Task[];
    return currentState;
  } catch (err) {
    console.error('Failed to load tasks from localStorage:', err);
    window.localStorage.setItem('tasks', '[]');
  }
  return [];
};

export const useToDoStore = create<ToDoStore>(
  localStorageUpdate(
    devtools((set, get) => ({
      tasks: getCurrentState(),
      createTask: (title: string) => {
        const { tasks } = get();
        const newTask = {
          id: generateId(),
          title,
          completed: false,
        };
        set({
          tasks: [newTask].concat(tasks),
        });
      },
      updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
          tasks: tasks.map((task) => ({
            ...task,
            title: task.id === id ? title : task.title,
          })),
        });
      },
      removeTask: (id: string) => {
        const { tasks } = get();
        set({
          tasks: tasks.filter((task) => task.id !== id),
        });
      },

      toggleTask: (id: string) => {
        const { tasks } = get();
        set({
          tasks: tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        });
      },
    }))
  )
);
