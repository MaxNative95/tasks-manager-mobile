import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

export type TaskStatus = 'To Do' | 'In Progress' | 'Completed';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
}


export default function HomeScreen({ navigation }: any) {
    const { logout, userToken } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/tasks', {
                headers: { Authorization: `Bearer ${userToken}` },
            });
            setTasks(res.data);
        } catch (err) {
            console.error('Error when obtaining tasks:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [userToken]);

    const handleCreateTask = () => {
        navigation.navigate('CreateTask');
    };

    const renderItem = ({ item }: { item: Task }) => (
        <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskStatus}>{item.status.toUpperCase()}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Button title="Logout" onPress={logout} color="red" />
            <View style={styles.buttonsContainer}>
                <Button title="Create Task" onPress={handleCreateTask} />
            </View>
            <Text style={styles.header}>My tasks (pull down to refresh)</Text> {/*PULL DOWN TO REFRESH, HAD NO TIME TO INVEST IN MORE FEATURES*/}
            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={() => {
                            setRefreshing(true);
                            fetchTasks();
                        }} />
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#f2f2f2',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    buttonsContainer: {
        marginBottom: 16,
    },
    taskItem: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    taskStatus: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
});