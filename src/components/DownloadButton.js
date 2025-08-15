import React from 'react';

function DownloadButton({ downloadUrl, fileName }) {
  const handleDownload = () => {
    // Construct the full URL to the backend's processed file endpoint
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    const fullDownloadUrl = `${backendUrl.replace('/api/files', '')}${downloadUrl}`;
    window.open(fullDownloadUrl, '_blank');
  };

  return (
    <button className="download-button" onClick={handleDownload}>
      Download Processed File
    </button>
  );
}

export default DownloadButton;
