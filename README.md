# StudyBuddy Frontend

## Overview
StudyBuddy is a productivity dashboard that helps students and users manage courses, projects, tasks, schedules, and study sessions in one place. The frontend includes protected routes, JWT-authentication, a Pomodoro timer, and deadline tracking to support focused study management.

- Frontend: Deployed frontend
- Backend API: Deployed Backend
- Backend Repository: Backend GitHub Repository

## Screenshots

### Home Page

### Sign In / Sign Up Page

### Dashboard

### Courses / Projects / Tasks Pages

### Pomodoro Session Page

## Technologies Used
- React
- Vite
- React Router
- Axios
- CSS
- JWT-based protected authentication flow

## Features
- User registration and login
- Protected routes for authenticated users only
- Dashboard with overview metrics
- Course management
- Project management
- Task creation, editing, and tracking
- Deadline tracking for projects and tasks
- Timetable management (Photo Upload)
- Pomodoro session tracking
- Responsive and modern UI

## Project Structure
```text
src/
├── assets/
├── components/
│   ├── LayoutWithoutNavbar.jsx
│   ├── ProtectedRoute.jsx
│   ├── RootLayout.jsx
│   └── Navbar.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── Homepage.jsx
│   ├── SigninPage.jsx
│   ├── SignupPage.jsx
│   ├── Dashboard.jsx
│   ├── PageNotFound.jsx
│   ├── courses/
│   ├── projects/
│   ├── sessions/
│   ├── tasks/
│   └── timetable/
├── services/
│   ├── authService.js
│   ├── courseService.js
│   ├── projectService.js
│   ├── sessionService.js
│   ├── timetableService.js
│   └── tasksService.js
├── styles/
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

### Prerequisites
Install the following before running the project:

- Node.js
- A working backend API

The backend API must be running before the frontend can access protected data.

### Installation

#### 1. Clone the repository

```bash
git clone FRONTEND_REPOSITORY_URL
cd FRONTEND_REPOSITORY_NAME
```

#### 2. Install dependencies

```bash
npm i
```

#### 3. Create the environment file

Create a `.env` file in the root directory:

```env
VITE_BACK_END_SERVER_URL=http://localhost:3000
```

#### 4. Start the development server

```bash
npm run dev
```

Then open:

```text
http://localhost:5173
```

## Application Routes

| Route | Page | Access |
| ----- | ---- | ------ |
| `/` | Home page | Public |
| `/sign-up` | Sign up page | Public |
| `/sign-in` | Sign in page | Public |
| `/dashboard` | Dashboard | Authenticated |
| `/courses` | All courses | Authenticated |
| `/courses/create` | Create course | Authenticated |
| `/courses/:id` | Course details | Authenticated |
| `/courses/:id/edit` | Edit course | Authenticated |
| `/courses/:id/tasks` | Course tasks | Authenticated |
| `/courses/:id/tasks/create` | Create task | Authenticated |
| `/courses/:id/tasks/:taskId` | Task details | Authenticated |
| `/courses/:id/tasks/:taskId/edit` | Edit task | Authenticated |
| `/timetable` | Timetable | Authenticated |
| `/timetable/create` | Create timetable | Authenticated |
| `/sessions` | Pomodoro sessions | Authenticated |
| `/projects` | All projects | Authenticated |
| `/projects/create` | Create project | Authenticated |
| `/projects/:projectId` | Project details | Authenticated |
| `/projects/:projectId/edit` | Edit project | Authenticated |
| `/projects/:projectId/tasks` | Project tasks | Authenticated |
| `/projects/:projectId/tasks/create` | Create task | Authenticated |
| `/projects/:projectId/tasks/:taskId` | Task details | Authenticated |
| `/projects/:projectId/tasks/:taskId/edit` | Edit task | Authenticated |
| `*` | Not found page | Public |

## User Stories

- As a user, I want to sign up and log in securely.
- As a user, I want to view my dashboard summary.
- As a user, I want to manage my courses and projects.
- As a user, I want to share a project with someone by username, so we can collaborate.
    - As a collaborator, I want to manage ONLY the tasks on a shared project
- As a user, I want to create and update tasks with deadlines so i can track my progress.
- As a user, I want to upload my study timetable.
- As a user, I want to use a Pomodoro timer for focused study sessions.
- As a user, I want protected routes to prevent unauthorized access.

## Future Enhancements
- Calendar view for timetable
- Task reminders and notifications
- More detailed analytics and productivity insights
- Better mobile optimization
- Improved accessibility features

## Team Members

| Name | GitHub |
| ---- | ------ |
| Hoor Yousif | [GitHub profile] |
| Walaa Ahmed | [GitHub profile] |

## Credits
