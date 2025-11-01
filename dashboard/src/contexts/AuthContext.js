import React, { createContext, useState, useContext, useEffect } from 'react';
import { initializeMockData, getStudents, getAdmins } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Reset data on first load to get fresh mockData
    //localStorage.clear();
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

  const register = (name, email, role) => {
    // Check if email already exists
    const allUsers = [...students, ...admins];
    if (allUsers.some(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const newUser = {
      id: role === 'student' ? `s${Date.now()}` : `a${Date.now()}`,
      name,
      email,
      role
    };

    // Save to localStorage
    if (role === 'student') {
      const updatedStudents = [...students, newUser];
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      setStudents(updatedStudents);
    } else {
      const updatedAdmins = [...admins, newUser];
      localStorage.setItem('admins', JSON.stringify(updatedAdmins));
      setAdmins(updatedAdmins);
    }

    // Auto-login after registration
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    return { success: true, user: newUser };
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
      register,
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