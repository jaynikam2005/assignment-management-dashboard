import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  getAssignmentsByAdmin,
  getStudents,
  saveAssignments,
  getAssignments,
} from '../../data/mockData';
import CreateAssignmentModal from './CreateAssignmentModal';
import AssignmentManagementCard from './AssignmentManagementCard';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState('all');

  const loadData = useCallback(() => {
    const adminAssignments = getAssignmentsByAdmin(currentUser.id);
    setAssignments(adminAssignments);
    setStudents(getStudents());
  }, [currentUser.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDeleteAssignment = (assignmentId) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      const allAssignments = getAssignments();
      const filtered = allAssignments.filter(a => a.id !== assignmentId);
      saveAssignments(filtered);
      loadData();
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const submittedCount = assignment.submissions.filter(s => s.submitted).length;
    if (filter === 'completed') return submittedCount === students.length;
    if (filter === 'pending') return submittedCount < students.length;
    return true;
  });

  const stats = {
    total: assignments.length,
    submitted: assignments.reduce(
      (acc, a) => acc + a.submissions.filter(s => s.submitted).length,
      0
    ),
    totalStudentSubmissions: assignments.length * students.length,
  };

  const submissionRate =
    stats.totalStudentSubmissions > 0
      ? Math.round((stats.submitted / stats.totalStudentSubmissions) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Welcome, {currentUser.name}! 👨‍🏫
          </h1>
          <p className="text-gray-600">Manage assignments and track student submissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Assignments</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Submissions</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.submitted}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Submission Rate</p>
            <p className="text-3xl font-bold text-indigo-600 mt-2">{submissionRate}%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Students</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">{students.length}</p>
          </div>
        </div>

        {/* Create Button and Filters */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All Assignments
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'pending'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Completed
            </button>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            + Create Assignment
          </button>
        </div>

        {/* Assignments Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map(assignment => (
              <AssignmentManagementCard
                key={assignment.id}
                assignment={assignment}
                students={students}
                onDelete={handleDeleteAssignment}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500 text-lg">
                {assignments.length === 0
                  ? 'No assignments created yet'
                  : 'No assignments in this category'}
              </p>
            </div>
          )}
        </div>

        {/* Create Assignment Modal */}
        {showCreateModal && (
          <CreateAssignmentModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={loadData}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
