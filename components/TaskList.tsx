import { FlatList } from 'react-native';
import { Task } from '../types/task';
import Row from './Row';

interface TaskListProps {
  tasks: Task[]
  toggleTask: (id: number) => void
}

export default function TaskList({ tasks, toggleTask }: TaskListProps) {
  return (
    <FlatList<Task>
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Row item={item} toggleTask={toggleTask} />}
    />
  );
}