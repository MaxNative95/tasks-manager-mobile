// src/navigation/AppNavigator.tsx
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { AuthContext } from '../context/AuthContext';
import CreateTaskScreen from '../screens/CreateTask';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { userToken, loading } = useContext(AuthContext);

    if (loading) return null; // puedes poner un splash o loader aquí

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {userToken == null ? (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
