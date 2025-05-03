
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Upload = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (file.type === "text/csv" || file.name.endsWith('.csv')) {
      toast.success(`File "${file.name}" uploaded successfully`);
    } else {
      toast.error("Please upload a CSV file");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <Button 
        variant="outline" 
        className="mb-6" 
        onClick={() => navigate('/')}
      >
        Back to Dashboard
      </Button>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Upload Recipients</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">Upload your CSV file containing recipient data here.</p>
          <div 
            className={`border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-blue-300'} rounded-lg p-8 text-center cursor-pointer transition-colors`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <p className="text-gray-500 mb-4">Drag and drop your CSV file here, or click to browse</p>
            <Button className="bg-blue-600 hover:bg-blue-700">Browse Files</Button>
            <input 
              id="file-upload"
              type="file" 
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
