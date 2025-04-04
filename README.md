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


## Recommendations and Future Improvements

- Add user registration directly from the app.
- Validate forms and inputs on both frontend and backend.
- Implement better error handling and user feedback on the mobile app.
- Add loading spinners or skeletons for API calls.
- Improve token expiration handling and auto-logout.
- Use refresh tokens for better session management.
- Integrate push notifications for task reminders.
- Add due dates and priorities for tasks.
- Implement offline mode or optimistic UI for better UX.
- Improve UI/UX with design systems like Tailwind (web) or styled-components (mobile).
- Add unit and integration tests on both frontend and backend.
- Use environment-based configuration for production and development builds.
- Restrict CORS properly in the backend.
- Add user profile management (update email/password).
- Paginate or lazy-load task lists for scalability.
- Improve API error messages with standard error codes.
- Add Swagger/OpenAPI documentation to the FastAPI backend.
- Use role-based access control if supporting multiple user roles in the future.
- Deploy backend and frontend with CI/CD pipelines.
- Add analytics or logging tools for monitoring the app.
