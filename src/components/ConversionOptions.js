import React, { useState, useEffect } from 'react';

function ConversionOptions({ onOptionsChange, fileType }) {
  const [format, setFormat] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [quality, setQuality] = useState('');
  const [bitrate, setBitrate] = useState('');
  const [resolution, setResolution] = useState('');
  const [sizeInKB, setSizeInKB] = useState('');
  const [sizeInMB, setSizeInMB] = useState('');

  useEffect(() => {
    // Reset options when fileType changes
    setFormat('');
    setWidth('');
    setHeight('');
    setQuality('');
    setBitrate('');
    setResolution('');
    setSizeInKB('');
    setSizeInMB('');
  }, [fileType]);

  useEffect(() => {
    onOptionsChange({
      format,
      width: width ? parseInt(width) : undefined,
      height: height ? parseInt(height) : undefined,
      quality: quality ? parseInt(quality) : undefined,
      bitrate: bitrate || undefined,
      resolution: resolution || undefined,
      sizeInKB: sizeInKB ? parseInt(sizeInKB) : undefined,
      sizeInMB: sizeInMB ? parseInt(sizeInMB) : undefined,
    });
  }, [format, width, height, quality, bitrate, resolution, sizeInKB, sizeInMB, onOptionsChange]);

  const renderImageOptions = () => (
    <div className="options-grid">
      <div className="option-group">
        <label htmlFor="imageFormat">Convert to:</label>
        <select id="imageFormat" value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="">Original</option>
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
          <option value="webp">WebP</option>
          <option value="gif">GIF</option>
          <option value="bmp">BMP</option>
        </select>
      </div>
      <div className="option-group">
        <label htmlFor="width">Width (px):</label>
        <input type="number" id="width" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="e.g., 800" />
      </div>
      <div className="option-group">
        <label htmlFor="height">Height (px):</label>
        <input type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 600" />
      </div>
      <div className="option-group">
        <label htmlFor="quality">Quality (1-100):</label>
        <input type="number" id="quality" value={quality} onChange={(e) => setQuality(e.target.value)} min="1" max="100" placeholder="e.g., 80" />
      </div>
      <div className="option-group">
        <label htmlFor="sizeInKB">Resize to (KB):</label>
        <input type="number" id="sizeInKB" value={sizeInKB} onChange={(e) => setSizeInKB(e.target.value)} placeholder="e.g., 500" />
      </div>
      <div className="option-group">
        <label htmlFor="sizeInMB">Resize to (MB):</label>
        <input type="number" id="sizeInMB" value={sizeInMB} onChange={(e) => setSizeInMB(e.target.value)} placeholder="e.g., 1" />
      </div>
    </div>
  );

  const renderAudioVideoOptions = () => (
    <div className="options-grid">
      <div className="option-group">
        <label htmlFor="avFormat">Convert to:</label>
        <select id="avFormat" value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="">Original</option>
          {fileType.startsWith('audio') && (
            <>
              <option value="mp3">MP3</option>
              <option value="wav">WAV</option>
              <option value="aac">AAC</option>
            </>
          )}
          {fileType.startsWith('video') && (
            <>
              <option value="mp4">MP4</option>
              <option value="avi">AVI</option>
              <option value="mov">MOV</option>
            </>
          )}
        </select>
      </div>
      <div className="option-group">
        <label htmlFor="bitrate">Bitrate (e.g., 128k, 1M):</label>
        <input type="text" id="bitrate" value={bitrate} onChange={(e) => setBitrate(e.target.value)} placeholder="e.g., 128k (audio), 1M (video)" />
      </div>
      {fileType.startsWith('video') && (
        <div className="option-group">
          <label htmlFor="resolution">Resolution (e.g., 1280x720):</label>
          <input type="text" id="resolution" value={resolution} onChange={(e) => setResolution(e.target.value)} placeholder="e.g., 1280x720" />
        </div>
      )}
    </div>
  );

  const renderDocumentOptions = () => (
    <div className="options-grid">
      <div className="option-group">
        <label htmlFor="docFormat">Convert to:</label>
        <select id="docFormat" value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="">Original</option>
          {fileType.includes('text/plain') && <option value="html">HTML</option>}
          {/* Add more document formats if backend supports them */}
          {/* <option value="pdf">PDF</option> */}
          {/* <option value="docx">DOCX</option> */}
        </select>
      </div>
    </div>
  );

  const renderArchiveOptions = () => (
    <div className="options-grid">
      <div className="option-group">
        <label htmlFor="archiveFormat">Compress to:</label>
        <select id="archiveFormat" value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="">Original</option>
          <option value="zip">ZIP</option>
          {/* Add more archive formats if backend supports them */}
        </select>
      </div>
    </div>
  );

  const getOptionsForFileType = () => {
    if (fileType.startsWith('image/')) {
      return renderImageOptions();
    } else if (fileType.startsWith('audio/') || fileType.startsWith('video/')) {
      return renderAudioVideoOptions();
    } else if (fileType.includes('text/') || fileType.includes('application/pdf') || fileType.includes('application/msword') || fileType.includes('application/vnd.openxmlformats-officedocument')) {
      return renderDocumentOptions();
    } else if (fileType.includes('application/zip') || fileType.includes('application/x-rar-compressed') || fileType.includes('application/gzip')) {
      return renderArchiveOptions();
    }
    return <p>No specific options available for this file type.</p>;
  };

  return (
    <div className="conversion-options">
      <h3>Conversion Options</h3>
      {getOptionsForFileType()}
    </div>
  );
}

export default ConversionOptions;
