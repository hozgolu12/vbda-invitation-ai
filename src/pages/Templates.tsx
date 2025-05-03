
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Templates = () => {
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
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Email Templates</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Initial Invitation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Personalized invitations for first contact with recipients.</p>
              <Button className="bg-blue-600 hover:bg-blue-700">Edit Template</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>First Follow-up</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Gentle reminder sent 5 days after initial invitation.</p>
              <Button className="bg-blue-600 hover:bg-blue-700">Edit Template</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Templates;
