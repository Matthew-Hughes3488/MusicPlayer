import React, { useState, useRef } from 'react';
import { formatFileSize } from '../../utils/formatters.js';
import type { FileUploadItem } from '../../types/index.js';

const FileUploader = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<FileUploadItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const validFiles = Array.from(fileList).filter((file: File) => {
      const isAudio = file.type.startsWith('audio/');
      const validExtensions = ['.mp3', '.wav', '.flac', '.m4a', '.ogg'];
      const hasValidExtension = validExtensions.some(ext => 
        file.name.toLowerCase().endsWith(ext)
      );
      return isAudio || hasValidExtension;
    });

    const newFiles = validFiles.map((file: File) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'pending' as const // pending, uploading, completed, error
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleUpload = async () => {
    setUploading(true);
    
    for (let fileItem of files.filter(f => f.status === 'pending')) {
      try {
        // Update status to uploading
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id ? { ...f, status: 'uploading' } : f
        ));

        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setFiles(prev => prev.map(f => 
            f.id === fileItem.id ? { ...f, progress } : f
          ));
        }

        // Mark as completed
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id ? { ...f, status: 'completed', progress: 100 } : f
        ));

        console.log('Uploaded file:', fileItem.name);
      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id ? { ...f, status: 'error' } : f
        ));
        console.error('Upload error:', error);
      }
    }
    
    setUploading(false);
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const clearAll = () => {
    setFiles([]);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading':
        return (
          <svg className="w-5 h-5 animate-spin text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'completed':
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Upload Music</h2>
        <p className="text-gray-400">
          Upload your music files to add them to your library. Supported formats: MP3, WAV, FLAC, M4A, OGG
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive
            ? 'border-purple-400 bg-purple-900 bg-opacity-20'
            : 'border-gray-600 hover:border-gray-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="audio/*,.mp3,.wav,.flac,.m4a,.ogg"
          onChange={handleChange}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          
          <div>
            <p className="text-lg font-medium text-white mb-2">
              Drop your music files here
            </p>
            <p className="text-gray-400 mb-4">
              or click to browse from your computer
            </p>
            <button
              onClick={onButtonClick}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Choose Files
            </button>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-gray-900 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Files to Upload ({files.length})
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={handleUpload}
                disabled={uploading || files.every(f => f.status !== 'pending')}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {uploading ? 'Uploading...' : 'Upload All'}
              </button>
              <button
                onClick={clearAll}
                disabled={uploading}
                className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {files.map((fileItem) => (
              <div key={fileItem.id} className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
                {getStatusIcon(fileItem.status)}
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {fileItem.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatFileSize(fileItem.size)}
                  </p>
                </div>

                {fileItem.status === 'uploading' && (
                  <div className="w-24">
                    <div className="bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${fileItem.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1 text-center">
                      {fileItem.progress}%
                    </p>
                  </div>
                )}

                <button
                  onClick={() => removeFile(fileItem.id)}
                  disabled={fileItem.status === 'uploading'}
                  className="text-gray-400 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed p-1 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Upload Tips</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Supported formats: MP3, WAV, FLAC, M4A, OGG</span>
          </li>
          <li className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Maximum file size: 50MB per file</span>
          </li>
          <li className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Files with proper metadata (artist, album, etc.) will be organized automatically</span>
          </li>
          <li className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>You can upload multiple files at once</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FileUploader;