import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Task } from '../types/task'
import { StyleSheet } from 'react-native'

interface TodoRowProps {
    item: Task
    toggleTask: (id: number) => void
}

export default function Row({ item, toggleTask }: TodoRowProps) {
    return (
        <Pressable style={styles.todoRow} onPress={() => toggleTask(item.id)}>
            <Text style={[styles.todoText, item.completed ? styles.done : null]}>
                {item.text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    todoRow: {
        flexDirection: 'row',
        padding: 4,
        margin: 4,
    },
    todoText: {
        flex: 1,
        fontSize: 20,
    },
    done: {
        textDecorationLine: 'line-through',
    },
});