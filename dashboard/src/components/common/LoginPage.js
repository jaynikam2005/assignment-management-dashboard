import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const { students, admins, login, register } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState('student');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Registration form state
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const users = role === 'student' ? students : admins;

  const handleLogin = () => {
    if (!selectedUserId) {
      setError('Please select a user');
      return;
    }
    const user = login(selectedUserId, role);
    if (!user) {
      setError('Login failed');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    const result = register(formData.name, formData.email, role);
    
    if (result.success) {
      setSuccess(`✓ Registration successful! Logged in as ${result.user.name}`);
      setFormData({ name: '', email: '' });
      setTimeout(() => {
        setIsRegistering(false);
        setSuccess('');
      }, 2000);
    } else {
      setError(result.error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          📚 JoinEazy
        </h1>

        {isRegistering ? (
          // Registration Form
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Register As
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="student"
                    checked={role === 'student'}
                    onChange={(e) => {
                      setRole(e.target.value);
                      setError('');
                    }}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Student</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={(e) => {
                      setRole(e.target.value);
                      setError('');
                    }}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Professor</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105"
            >
              Create Account
            </button>

            <button
              type="button"
              onClick={() => {
                setIsRegistering(false);
                setError('');
                setFormData({ name: '', email: '' });
              }}
              className="w-full text-blue-600 font-medium py-2 hover:text-blue-700"
            >
              ← Back to Login
            </button>
          </form>
        ) : (
          // Login Form
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Role
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="student"
                    checked={role === 'student'}
                    onChange={(e) => {
                      setRole(e.target.value);
                      setSelectedUserId('');
                      setError('');
                    }}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Student</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={(e) => {
                      setRole(e.target.value);
                      setSelectedUserId('');
                      setError('');
                    }}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Admin/Professor</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select {role === 'student' ? 'Student' : 'Professor'}
              </label>
              <select
                value={selectedUserId}
                onChange={(e) => {
                  setSelectedUserId(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select a {role} --</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
            >
              Login
            </button>

            <button
              onClick={() => {
                setIsRegistering(true);
                setError('');
                setSelectedUserId('');
              }}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105"
            >
              Create New Account
            </button>
          </div>
        )}

        {!isRegistering && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-gray-600 text-center font-semibold mb-2">
              Demo Credentials Available:
            </p>
            <p className="text-xs text-gray-600 text-center">
              Students: Alice Johnson, Bob Smith, Carol White
            </p>
            <p className="text-xs text-gray-600 text-center">
              Professors: Prof. David Lee
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;