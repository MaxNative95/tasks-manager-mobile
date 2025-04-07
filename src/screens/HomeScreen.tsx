import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator, RefreshControl, Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { Card, TextInput, Button as PaperButton, Dialog, Portal, Menu } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const { width } = Dimensions.get("window");

    const openEditDialog = (task: Task) => {
        setSelectedTask(task);
        setEditedTitle(task.title);
        setVisibleDialog(true);
    };

    const closeEditDialog = () => {
        setVisibleDialog(false);
        setSelectedTask(null);
        setEditedTitle('');
    };

    const saveTitleChange = async () => {
        if (selectedTask) {
            await updateTask(selectedTask.id, { title: editedTitle });
            closeEditDialog();
        }
    };

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

    const updateTask = async (taskId: string, updatedFields: Partial<Task>) => {
        try {
            await axios.put(`http://127.0.0.1:8000/tasks/${taskId}`, updatedFields, {
                headers: { Authorization: `Bearer ${userToken}` },
            });
            fetchTasks(); // Refrescar después de la actualización
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${userToken}` },
            });
            fetchTasks(); // Refrescar después del borrado
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    const cycleStatus = (status: TaskStatus): TaskStatus => {
        switch (status) {
            case 'To Do': return 'In Progress';
            case 'In Progress': return 'Completed';
            case 'Completed': return 'To Do';
        }
    };

    const renderItem = ({ item }: { item: Task }) => (
        <Card style={{ marginBottom: 16 }}>
            <Card.Title title={item.title} subtitle={`Status: ${item.status}`} />
            <Card.Content>
                {item.description && <Text>{item.description}</Text>}
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
                <PaperButton icon="pencil" onPress={() => openEditDialog(item)}>Edit</PaperButton>
                <Menu
                    visible={menuVisible && selectedTask?.id === item.id}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                        <PaperButton
                            icon="refresh"
                            onPress={() => {
                                setSelectedTask(item);
                                setMenuVisible(true);
                            }}
                        >
                            Change Status
                        </PaperButton>
                    }
                >
                    {['To Do', 'In Progress', 'Completed'].map((status) => (
                        <Menu.Item
                            key={status}
                            onPress={() => {
                                updateTask(item.id, { status: status as TaskStatus });
                                setMenuVisible(false);
                            }}
                            title={status}
                        />
                    ))}
                </Menu>
                <PaperButton icon="delete" onPress={() => deleteTask(item.id)} color="red">
                    Delete
                </PaperButton>
            </Card.Actions>
        </Card>
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
            <Portal>
                <Dialog visible={visibleDialog} onDismiss={closeEditDialog}>
                    <Dialog.Title>Edit Task Title</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="New Title"
                            value={editedTitle}
                            onChangeText={setEditedTitle}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <PaperButton onPress={closeEditDialog}>Cancel</PaperButton>
                        <PaperButton onPress={saveTitleChange}>Save</PaperButton>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
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
    cardActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 8,
    },
    actionButton: {
        marginRight: 8,
        marginBottom: 8,
    },
});