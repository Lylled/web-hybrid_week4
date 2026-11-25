import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Task } from './types/task';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@tasks';

export default function App() {
  const [tasks, settasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  const addTask = (text: string) => {
    const id = tasks.length + 1
    const task: Task = { id, text, completed: 0 }
    settasks([...tasks, task]);
  };

  const toggleTask = (id: number) => {
    settasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: task.completed ? 0 : 1 }
        : task
    ));
  };

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) settasks(JSON.parse(json));
      } catch (e) {
        console.error('Lataus epäonnistui', e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch(e => console.error('Tallennus epäonnistui', e)
    );
  }, [tasks, loaded]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <AddTask addTask={addTask} />
      <TaskList tasks={tasks} toggleTask={toggleTask} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 4,
    alignSelf: 'center',
  },
});