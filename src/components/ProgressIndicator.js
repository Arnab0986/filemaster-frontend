import React from 'react';

function ProgressIndicator({ progress }) {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}>
        {progress}%
      </div>
    </div>
  );
}

export default ProgressIndicator;
