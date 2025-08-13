import React, { useRef } from 'react';

function FileUploader({ onFileSelect, selectedFile }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="file-input-area"
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {selectedFile ? (
        <p>Selected file: <strong>{selectedFile.name}</strong> ({ (selectedFile.size / (1024 * 1024)).toFixed(2) } MB)</p>
      ) : (
        <p>Drag & drop your file here, or click to select</p>
      )}
    </div>
  );
}

export default FileUploader;
