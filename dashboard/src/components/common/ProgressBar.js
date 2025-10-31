import React from 'react';

const ProgressBar = ({ submitted }) => {
  const progress = submitted ? 100 : 0;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className={`h-full transition-all duration-300 ${
          submitted ? 'bg-green-500' : 'bg-gray-300'
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
