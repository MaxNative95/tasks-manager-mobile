# Task Manager App (React Native)

A simple task management mobile app built with **React Native**, **TypeScript**, and **Axios**, backed by a **FastAPI + MongoDB** API. The app supports user authentication (JWT), CRUD operations for tasks, and persistent login using AsyncStorage.

## Features

- User login and logout
- Authenticated API requests using JWT
- Create, read, update, and delete tasks
- Tasks assigned per user
- Persistent session with AsyncStorage
- FlatList rendering of user tasks
- React Navigation for screen handling

## Stack

- React Native (Expo)
- TypeScript
- Axios
- React Navigation
- AsyncStorage
- FastAPI + MongoDB backend

## Installation

1. Clone the repo:

```bash
git clone git@github.com:MaxNative95/tasks-manager-mobile.git
cd task-manager-app

2. Install dependencies:
npm install
# or
yarn install

3. Start the app: 
npx expo start


Make sure your backend API is running and reachable via the configured API_URL.

Folder Structure

src/
├── components/
├── context/
│   └── AuthContext.tsx
├── screens/
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   └── CreateTaskScreen.tsx
├── services/
│   └── api.ts
└── App.tsx

Create a .env file in the root:
API_URL=http://your-backend-ip-or-domain/api