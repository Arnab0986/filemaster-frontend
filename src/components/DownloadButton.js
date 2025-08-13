import React from 'react';

function DownloadButton({ downloadUrl, fileName }) {
  const handleDownload = () => {
    // Construct the full URL to the backend's processed file endpoint
    const fullDownloadUrl = `http://localhost:5000${downloadUrl}`;
    window.open(fullDownloadUrl, '_blank');
  };

  return (
    <button className="download-button" onClick={handleDownload}>
      Download Processed File
    </button>
  );
}

export default DownloadButton;
