
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import { generatePersonalizedHook } from "@/utils/aiPersonalization";
import { toast } from "sonner";

interface AiPersonalizationProps {
  onInsertText: (text: string) => void;
}

const AiPersonalization = ({ onInsertText }: AiPersonalizationProps) => {
  const [name, setName] = useState("Jane Doe");
  const [achievement, setAchievement] = useState("$100M investment in AI startup");
  const [organization, setOrganization] = useState("TechFuture Inc");
  const [role, setRole] = useState("CEO");
  const [generatedText, setGeneratedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!name || !achievement || !organization || !role) {
      toast.error("Please fill in all fields to generate personalized content");
      return;
    }

    setIsLoading(true);
    try {
      const hook = await generatePersonalizedHook(name, achievement, organization, role);
      setGeneratedText(hook);
    } catch (error) {
      console.error("Error in AI generation:", error);
      toast.error("Failed to generate content. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInsert = () => {
    if (generatedText) {
      onInsertText(generatedText);
      toast.success("Text inserted into template");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          AI Personalization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Recipient Name</Label>
            <Input 
              id="name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. Jane Doe"
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input 
              id="role"
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              placeholder="e.g. CEO"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="organization">Organization</Label>
          <Input 
            id="organization"
            value={organization} 
            onChange={(e) => setOrganization(e.target.value)} 
            placeholder="e.g. TechFuture Inc"
          />
        </div>
        
        <div>
          <Label htmlFor="achievement">Recent Achievement</Label>
          <Input 
            id="achievement"
            value={achievement} 
            onChange={(e) => setAchievement(e.target.value)} 
            placeholder="e.g. $100M investment in AI"
          />
        </div>
        
        <div>
          <Button 
            onClick={handleGenerate}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Personalized Hook
              </>
            )}
          </Button>
        </div>
        
        {generatedText && (
          <div className="mt-4">
            <Label htmlFor="generatedText">Generated Content</Label>
            <Textarea 
              id="generatedText"
              value={generatedText} 
              onChange={(e) => setGeneratedText(e.target.value)}
              className="h-24"
            />
            <Button 
              className="mt-2 w-full" 
              onClick={handleInsert}
              variant="outline"
            >
              Insert into Template
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AiPersonalization;
