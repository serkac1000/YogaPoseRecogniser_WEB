import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getModelURL, setModelURL } from "@/lib/yogaPoseModel";
import { useLocation } from "wouter";
import pose1Svg from "@/assets/pose1.svg";
import pose2Svg from "@/assets/pose2.svg";
import pose3Svg from "@/assets/pose3.svg";

export default function Settings() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [modelUrl, setModelUrlState] = useState(getModelURL());

  const handleSave = () => {
    // Save the model URL
    setModelURL(modelUrl);
    
    toast({
      title: "Settings Saved",
      description: "Your settings have been saved successfully.",
    });
    
    // Navigate to the main app
    setLocation('/app');
  };

  return (
    <div className="min-h-screen w-full p-4 bg-background flex flex-col items-center justify-center">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader className="text-center bg-primary text-primary-foreground p-6 rounded-t-lg">
          <CardTitle className="text-3xl font-bold">Yoga Pose Recognizer - Settings</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="modelUrl">Teachable Machine Model URL</Label>
              <Input
                id="modelUrl"
                placeholder="https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/"
                value={modelUrl}
                onChange={(e) => setModelUrlState(e.target.value)}
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Enter the URL of your Teachable Machine model. The default model recognizes three yoga poses.
              </p>
            </div>
            
            <div>
              <Label>Available Poses</Label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {[
                  { name: "Pose 1", description: "Mountain Pose", image: pose1Svg },
                  { name: "Pose 2", description: "Tree Pose", image: pose2Svg },
                  { name: "Pose 3", description: "Warrior Pose", image: pose3Svg }
                ].map((pose) => (
                  <Card key={pose.name} className="p-3 flex flex-col items-center">
                    <img src={pose.image} alt={pose.description} className="w-20 h-20 mb-2" />
                    <h3 className="font-medium">{pose.name}</h3>
                    <p className="text-sm text-muted-foreground">{pose.description}</p>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                These are the yoga poses the application will recognize. The app will cycle through Pose 1 → Pose 2 → Pose 3 → Pose 1.
              </p>
            </div>
            
            <div className="flex justify-center mt-4">
              <Button size="lg" onClick={handleSave}>
                Save Settings & Start
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}