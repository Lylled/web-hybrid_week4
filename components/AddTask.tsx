import { useState } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

interface AddTaskProps {
  addTask: (text: string) => void
}

export default function AddTask({ addTask }: AddTaskProps) {
  const [input, setinput] = useState<string>('');

  const save = () => {
    if (!input.trim()) return;
    addTask(input);
    setinput('');
  };

  return (
    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={input}
        onChangeText={setinput}
      />
      <Button title="Save" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
});