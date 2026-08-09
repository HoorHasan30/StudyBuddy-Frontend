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


import { useEffect } from "react";
import { getCurrentUser, logout } from "./services/authService";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import EditCourse from "./pages/courses/EditCourse";
function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        <Route path="/courses" element={<ProtectedRoute><AllCourses/></ProtectedRoute>}/>
        <Route path="/courses/create" element={<ProtectedRoute><CreateCourse/></ProtectedRoute>}/>
        <Route path="/courses/:id" element={<ProtectedRoute><CourseDetails/></ProtectedRoute>}/>
        <Route path="/courses/:id/edit" element={<ProtectedRoute><EditCourse/></ProtectedRoute>}/>


      </Routes>
    </div>
  );
}

export default App;
