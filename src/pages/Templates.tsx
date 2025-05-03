
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Send, Copy, Sparkles } from "lucide-react";
import AiPersonalization from '@/components/AiPersonalization';

const Templates = () => {
  const navigate = useNavigate();
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState({
    name: '',
    subject: '',
    content: '',
    variables: ['FirstName', 'Email', 'Organization', 'Achievement', 'Role']
  });
  const [showAiPersonalization, setShowAiPersonalization] = useState(false);

  const handleEditTemplate = (templateName: string, templateType: string) => {
    let templateContent = '';
    let templateSubject = '';
    
    if (templateType === 'initial') {
      templateSubject = 'Invitation to Viksit Bharat Dialogues & Awards 2025';
      templateContent = `Dear {FirstName},

We are pleased to invite you to the Viksit Bharat Dialogues & Awards 2025, celebrating innovation and excellence in India's development journey.

Your recent {Achievement} at {Organization} has significantly contributed to India's growth story, and we would be honored by your presence at this prestigious event.

Date: June 15, 2025
Venue: Bharat Mandapam, New Delhi
RSVP: Please confirm your attendance by May 30, 2025

We look forward to your participation.

Warm regards,
Viksit Bharat Foundation Team`;
    } else if (templateType === 'followup') {
      templateSubject = 'Following up: Viksit Bharat Dialogues & Awards 2025';
      templateContent = `Dear {FirstName},

We hope this message finds you well. We recently extended an invitation to you for the Viksit Bharat Dialogues & Awards 2025, and we're writing to follow up.

As a key {Role} at {Organization}, your presence would add tremendous value to our discussions on India's development roadmap.

The event details are:
Date: June 15, 2025
Venue: Bharat Mandapam, New Delhi

Please let us know if you'll be able to join us for this important occasion.

Best regards,
Viksit Bharat Foundation Team`;
    } else if (templateType === 'final') {
      templateSubject = 'Final Reminder: Viksit Bharat Dialogues & Awards 2025';
      templateContent = `Dear {FirstName},

This is a final reminder about the upcoming Viksit Bharat Dialogues & Awards 2025.

As spaces are filling quickly, we wanted to ensure you have the opportunity to attend this prestigious gathering of industry leaders.

With your impressive background as {Role} at {Organization} and your recent {Achievement}, your insights would be invaluable to our discussions on India's development journey.

Date: June 15, 2025
Venue: Bharat Mandapam, New Delhi
RSVP: Please confirm your attendance within the next 48 hours to secure your place.

We hope to see you there.

Kind regards,
Viksit Bharat Foundation Team`;
    }

    setCurrentTemplate({
      name: templateName,
      subject: templateSubject,
      content: templateContent,
      variables: ['FirstName', 'Email', 'Organization', 'Achievement', 'Role']
    });
    
    setIsEditSheetOpen(true);
    setShowAiPersonalization(false);
  };

  const handleSaveTemplate = () => {
    toast.success(`Template "${currentTemplate.name}" saved successfully`);
    setIsEditSheetOpen(false);
  };

  const insertVariable = (variable: string) => {
    setCurrentTemplate({
      ...currentTemplate,
      content: currentTemplate.content + ` {${variable}}`
    });
  };

  const handleInsertAiText = (text: string) => {
    // Insert at beginning of the content after "Dear {FirstName},"
    const contentParts = currentTemplate.content.split('\n');
    if (contentParts.length >= 2) {
      // Insert after the first line
      contentParts.splice(1, 0, `\n${text}`);
      setCurrentTemplate({
        ...currentTemplate,
        content: contentParts.join('\n')
      });
    } else {
      // Fallback if content format is unexpected
      setCurrentTemplate({
        ...currentTemplate,
        content: currentTemplate.content + '\n' + text
      });
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
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Email Templates</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2" />
                Initial Invitation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Personalized invitations for first contact with recipients.</p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => handleEditTemplate("Initial Invitation", "initial")}
              >
                Edit Template
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="mr-2" />
                First Follow-up
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Gentle reminder sent 5 days after initial invitation.</p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => handleEditTemplate("First Follow-up", "followup")}
              >
                Edit Template
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Copy className="mr-2" />
                Final Reminder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Final reminder with urgency sent 10 days after initial invitation.</p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => handleEditTemplate("Final Reminder", "final")}
              >
                Create Template
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit {currentTemplate.name}</SheetTitle>
            <SheetDescription>
              Customize your email template. Use variables to personalize content.
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6">
            <Label htmlFor="subject">Email Subject</Label>
            <Input 
              id="subject"
              value={currentTemplate.subject} 
              onChange={(e) => setCurrentTemplate({...currentTemplate, subject: e.target.value})}
              className="mb-4"
            />
            
            <Label htmlFor="content">Email Content</Label>
            <Textarea 
              id="content"
              value={currentTemplate.content} 
              onChange={(e) => setCurrentTemplate({...currentTemplate, content: e.target.value})}
              className="min-h-[300px] mb-4"
            />
            
            <div className="mb-6">
              <Label>Insert Variables:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {currentTemplate.variables.map((variable) => (
                  <Button 
                    key={variable}
                    variant="outline" 
                    size="sm" 
                    onClick={() => insertVariable(variable)}
                  >
                    {variable}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-yellow-50 border-yellow-200"
                  onClick={() => setShowAiPersonalization(!showAiPersonalization)}
                >
                  <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
                  AI Personalization
                </Button>
              </div>
            </div>
            
            {showAiPersonalization && (
              <div className="mb-6">
                <AiPersonalization onInsertText={handleInsertAiText} />
              </div>
            )}
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsEditSheetOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveTemplate}>
                Save Template
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Templates;
