
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Upload = () => {
  const navigate = useNavigate();

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
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">Drag and drop your CSV file here, or click to browse</p>
            <Button className="bg-blue-600 hover:bg-blue-700">Browse Files</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
