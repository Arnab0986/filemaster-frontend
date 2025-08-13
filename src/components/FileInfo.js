import React from 'react';

function FileInfo({ fileName, fileSize }) {
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="file-info">
      <h3>Processed File Information:</h3>
      <p><strong>File Name:</strong> {fileName}</p>
      <p><strong>File Size:</strong> {formatBytes(fileSize)}</p>
    </div>
  );
}

export default FileInfo;
