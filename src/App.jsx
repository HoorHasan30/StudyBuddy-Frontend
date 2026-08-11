import { useState } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";

import AllCourses from "./pages/courses/AllCourses";
import CreateCourse from "./pages/courses/CreateCourse";
import CourseDetails from "./pages/courses/CourseDetails";
import EditCourse from "./pages/courses/EditCourse";
import { createCourse, getAllCourses, getOneCourse, deleteCourse, updateCourse } from "./services/courseService";


import CreateTable from "./pages/timetable/CreateTable";
import GetTable from "./pages/timetable/GetTable";
import { getTimetable, createTimeTable, deleteTimetable } from "./services/timetableService";


import CreateSession from "./pages/sessions/CreateSession";
import { createSessions } from "./services/sessionService";


import CreateProject from "./pages/projects/CreateProject";
import AllProjects from "./pages/projects/AllProjects";
import ProjectDetails from "./pages/projects/ProjectDetails";
import EditProject from "./pages/projects/EditProject";

import CreateTask from "./pages/tasks/CreateTask";
import AllTasks from "./pages/tasks/AllTasks";
import EditTask from "./pages/tasks/EditTask";
import TaskDetails from "./pages/tasks/TaskDetails";
import { createProject, getAllProjects } from "./services/projectService";

import { useEffect } from "react";
import { getCurrentUser, logout } from "./services/authService";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import RootLayout from "./components/RootLayout";
import LayoutWithNavbar from "./components/LayoutWithoutNavbar";

function App() {
  return (
    <div>

      {/* <Navbar /> */}
      <Routes>

        <Route path='/' element={<RootLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
        </Route>


        <Route element={<LayoutWithNavbar />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          <Route path="/courses" element={<ProtectedRoute><AllCourses /></ProtectedRoute>} />
          <Route path="/courses/create" element={<ProtectedRoute><CreateCourse /></ProtectedRoute>} />
          <Route path="/courses/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
          <Route path="/courses/:id/edit" element={<ProtectedRoute><EditCourse /></ProtectedRoute>} />


          <Route path="/courses/:id/tasks" element={<ProtectedRoute><AllTasks /></ProtectedRoute>} />
          <Route path="/courses/:id/tasks/create" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
          <Route path="/courses/:id/tasks/:taskId" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />
          <Route path="/courses/:id/tasks/:taskId/edit" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />



          <Route path="/timetable" element={<ProtectedRoute><GetTable /></ProtectedRoute>} />
          <Route path="/timetable/create" element={<ProtectedRoute><CreateTable /></ProtectedRoute>} />

          <Route path="/sessions" element={<ProtectedRoute><CreateSession /></ProtectedRoute>} />

          <Route path="/projects/create" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute><AllProjects /></ProtectedRoute>} />
          <Route path="/projects/:projectId" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
          <Route path="/projects/:projectId/edit" element={<ProtectedRoute><EditProject /></ProtectedRoute>} />

          <Route path="/projects/:projectId/tasks" element={<ProtectedRoute><AllTasks /></ProtectedRoute>} />
          <Route path="/projects/:projectId/tasks/create" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
          <Route path="/projects/:projectId/tasks/:taskId" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />
          <Route path="/projects/:projectId/tasks/:taskId/edit" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />

        </Route>

      </Routes>
    </div>
  );
}

export default App;
