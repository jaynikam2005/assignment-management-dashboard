import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const { students, admins, login } = useAuth();
  const [role, setRole] = useState('student');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [error, setError] = useState('');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          📚 JoinEazy
        </h1>
        
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
        </div>

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
      </div>
    </div>
  );
};

export default LoginPage;
