import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function CreateTaskScreen() {
  const { userToken } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('TODO');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  const handleCreateTask = async () => {
    const params = new URLSearchParams();
        params.append('title', title);
        params.append('description', description);
        params.append('status', status);
    try {
      await axios.post(
        'http://127.0.0.1:8000/tasks',
        { title, description, status },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      Alert.alert('Success', 'Task created');
      navigation.goBack(); // Regresar a la pantalla anterior
    } catch (err) {
      Alert.alert('Error', 'Could not create task');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Create Task" onPress={handleCreateTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});
