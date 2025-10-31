import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  getStudentAssignments,
  updateSubmissionStatus,
} from '../../data/mockData';
import AssignmentCard, { SubmissionModal } from './AssignmentCard';

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [filter, setFilter] = useState('all');

  const loadAssignments = useCallback(() => {
    const data = getStudentAssignments(currentUser.id);
    setAssignments(data);
  }, [currentUser.id]);

  useEffect(() => {
    loadAssignments();
  }, [loadAssignments]);

  const handleSubmit = (assignmentId) => {
    updateSubmissionStatus(assignmentId, currentUser.id, true);
    loadAssignments();
    setSelectedAssignment(null);
  };

  const filteredAssignments = assignments.filter(assignment => {
    const submission = assignment.submissions.find(s => s.studentId === currentUser.id);
    if (filter === 'submitted') return submission?.submitted;
    if (filter === 'pending') return !submission?.submitted;
    return true;
  });

  const submitted = assignments.filter(a => 
    a.submissions.find(s => s.studentId === currentUser.id)?.submitted
  ).length;

  const stats = {
    total: assignments.length,
    submitted,
    pending: assignments.length - submitted,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Welcome, {currentUser.name}! 👋
          </h1>
          <p className="text-gray-600">Track and manage your assignments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Assignments</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Submitted</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.submitted}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Pending</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">{stats.pending}</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 flex-wrap">
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
            onClick={() => setFilter('submitted')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'submitted'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Submitted
          </button>
        </div>

        {/* Assignments List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredAssignments.length > 0 ? (
            filteredAssignments.map(assignment => {
              const submission = assignment.submissions.find(
                s => s.studentId === currentUser.id
              );
              return (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  submission={submission}
                  onOpenModal={(assign, sub) => setSelectedAssignment(assign)}
                />
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500 text-lg">
                No assignments found in this category
              </p>
            </div>
          )}
        </div>

        {/* Submission Modal */}
        {selectedAssignment && (
          <SubmissionModal
            assignment={selectedAssignment}
            submission={selectedAssignment.submissions.find(
              s => s.studentId === currentUser.id
            )}
            onClose={() => setSelectedAssignment(null)}
            onSubmit={(status) => handleSubmit(selectedAssignment.id)}
          />
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
