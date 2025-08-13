import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import ConversionOptions from '../components/ConversionOptions';
import ProgressIndicator from '../components/ProgressIndicator';
import FileInfo from '../components/FileInfo';
import DownloadButton from '../components/DownloadButton';
import { uploadFile } from '../utils/api';

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [options, setOptions] = useState({});
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setResult(null); // Clear previous results
    setError(null); // Clear previous errors
  };

  const handleOptionsChange = (newOptions) => {
    setOptions(newOptions);
  };

  const handleProcessFile = async () => {
    if (!selectedFile) {
      setError('Please select a file first.');
      return;
    }

    setProcessing(true);
    setProgress(0);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    // Append options to formData
    for (const key in options) {
      if (options[key]) { // Only append if value exists
        formData.append(key, options[key]);
      }
    }

    try {
      // Simulate progress for demonstration
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress <= 90) {
          setProgress(currentProgress);
        } else {
          clearInterval(interval);
        }
      }, 200);

      const response = await uploadFile(formData);
      clearInterval(interval);
      setProgress(100);

      if (response.success) {
        setResult(response);
      } else {
        setError(response.message || 'File processing failed.');
      }
    } catch (err) {
      console.error('Error during file processing:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container">
      <h1>Filemater Pro</h1>
      <p>Your all-in-one solution for file conversion, resizing, and compression.</p>

      <FileUploader onFileSelect={handleFileSelect} selectedFile={selectedFile} />

      {selectedFile && (
        <ConversionOptions
          onOptionsChange={handleOptionsChange}
          fileType={selectedFile.type}
        />
      )}

      <button
        className="button-primary"
        onClick={handleProcessFile}
        disabled={processing || !selectedFile}
      >
        {processing ? 'Processing...' : 'Process File'}
      </button>

      {processing && <ProgressIndicator progress={progress} />}

      {error && <p className="error-message">Error: {error}</p>}

      {result && result.success && (
        <>
          <p className="success-message">{result.message}</p>
          <FileInfo fileName={result.fileName} fileSize={result.fileSize} />
          <DownloadButton downloadUrl={result.downloadUrl} fileName={result.fileName} />
        </>
      )}
    </div>
  );
}

export default Home;
