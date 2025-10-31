import React, { useState } from 'react';
import ProgressBar from '../common/ProgressBar';

const SubmissionModal = ({ assignment, submission, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);

  const handleConfirm = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onSubmit(true);
      onClose();
    }
  };

  const handleCancel = () => {
    if (step === 2) {
      setStep(1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Confirm Submission
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to mark "{assignment.title}" as submitted?
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Make sure you have uploaded your work to the provided Drive link.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                No, Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Yes, I have submitted
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Final Confirmation
              </h2>
            </div>
            <p className="text-gray-600 mb-2">
              This is your final confirmation to submit "{assignment.title}".
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Once confirmed, your submission status will be marked as submitted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Go Back
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Confirm Submission
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const AssignmentCard = ({ assignment, submission, onOpenModal }) => {
  const isSubmitted = submission?.submitted || false;
  const daysRemaining = Math.ceil(
    (new Date(assignment.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800 flex-1">{assignment.title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            isSubmitted
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {isSubmitted ? '✓ Submitted' : 'Pending'}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{assignment.description}</p>

      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">Progress</p>
        <ProgressBar submitted={isSubmitted} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
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
            {daysRemaining < 0 ? `Overdue by ${Math.abs(daysRemaining)} days` : `${daysRemaining} days`}
          </p>
        </div>
      </div>

      <div className="flex gap-2 flex-col sm:flex-row">
        <a
          href={assignment.driveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          📁 View Drive Link
        </a>
        {!isSubmitted ? (
          <button
            onClick={() => onOpenModal(assignment, submission)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Mark as Submitted
          </button>
        ) : (
          <div className="flex-1 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-lg font-medium text-center">
            ✓ Submitted on {submission.submittedAt}
          </div>
        )}
      </div>
    </div>
  );
};

export { SubmissionModal };
export default AssignmentCard;
