import { create } from 'zustand';

interface Task {
  id: string;
  title: string;
}

interface ToDoStore {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
}

export const useToDoStore = create<ToDoStore>((set) => ({
  tasks: [],
  createTask: (title) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Math.random().toString(), title }],
    })),
  updateTask: (id, title) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, title } : task
      ),
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));
