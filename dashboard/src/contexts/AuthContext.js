import React, { createContext, useState, useContext, useEffect } from 'react';
import { initializeMockData, getStudents, getAdmins } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Initialize mock data
    initializeMockData();
    setStudents(getStudents());
    setAdmins(getAdmins());

    // Check if user was logged in before
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userId, role) => {
    const users = role === 'student' ? students : admins;
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const isStudent = () => currentUser?.role === 'student';
  const isAdmin = () => currentUser?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      login, 
      logout, 
      isStudent, 
      isAdmin, 
      students, 
      admins 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
