import React from 'react';
import ProgressBar from '../common/ProgressBar';

const AssignmentManagementCard = ({ assignment, students, onDelete }) => {
  const submittedCount = assignment.submissions.filter(s => s.submitted).length;
  const totalStudents = students.length;
  const submissionRate = Math.round((submittedCount / totalStudents) * 100);
  const daysRemaining = Math.ceil(
    (new Date(assignment.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-indigo-500">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800">{assignment.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{assignment.description}</p>
        </div>
        <button
          onClick={() => onDelete(assignment.id)}
          className="text-red-500 hover:text-red-700 text-lg"
          title="Delete assignment"
        >
          ✕
        </button>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Submission Progress
          </span>
          <span className="text-sm font-bold text-blue-600">
            {submittedCount}/{totalStudents} ({submissionRate}%)
          </span>
        </div>
        <ProgressBar submitted={submissionRate >= 100} />
      </div>

      {/* Student Submission Details */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-3">Student Submissions</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
          {assignment.submissions.map(submission => {
            const student = students.find(s => s.id === submission.studentId);
            return (
              <div
                key={submission.studentId}
                className={`text-xs px-3 py-2 rounded-lg flex items-center justify-between ${
                  submission.submitted
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <span className={submission.submitted ? 'text-green-800' : 'text-red-800'}>
                  {student?.name}
                </span>
                <span className="font-bold">
                  {submission.submitted ? '✓' : '✗'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
        <div>
          <p className="text-gray-500">Due Date</p>
          <p className="font-semibold text-gray-800">
            {new Date(assignment.dueDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Days Remaining</p>
          <p
            className={`font-semibold ${
              daysRemaining < 0
                ? 'text-red-600'
                : daysRemaining <= 3
                ? 'text-orange-600'
                : 'text-green-600'
            }`}
          >
            {daysRemaining < 0 ? `Overdue by ${Math.abs(daysRemaining)}` : `${daysRemaining} days`}
          </p>
        </div>
      </div>

      <a
        href={assignment.driveLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
      >
        📁 View Submissions Folder
      </a>
    </div>
  );
};

export default AssignmentManagementCard;
