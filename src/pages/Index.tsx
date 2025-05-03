
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            VBDA 2025 Invitation System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-powered invitation management for the Viksit Bharat Dialogues & Awards
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Upload Recipients
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Email Templates
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Outreach</CardTitle>
            </CardHeader>
            <CardContent>
              <p>AI-generated personalized emails based on recipient achievements and contributions.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Automated Follow-ups</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Schedule and automate follow-up emails to maximize engagement and attendance.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Real-time Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Track email opens, responses, and RSVPs with comprehensive dashboards.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
