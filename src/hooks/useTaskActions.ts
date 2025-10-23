import { useToDoStore } from '../data/store/useToDoStore';

export const useTaskActions = () => {
  const createTask = useToDoStore((state) => state.createTask);
  const updateTask = useToDoStore((state) => state.updateTask);
  const removeTask = useToDoStore((state) => state.removeTask);
  const toggleTask = useToDoStore((state) => state.toggleTask);

  return { createTask, updateTask, removeTask, toggleTask };
};
