import React from 'react';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/common/LoginPage';
import Navbar from './components/common/Navbar';
import StudentDashboard from './components/student/StudentDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

function AppContent() {
  const { currentUser, isStudent, isAdmin } = useAuth();

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {isStudent() && <StudentDashboard />}
      {isAdmin() && <AdminDashboard />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
