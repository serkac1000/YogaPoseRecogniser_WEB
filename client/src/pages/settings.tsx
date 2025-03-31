import { useState, useEffect, ChangeEvent } from "react";
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
import { AppSettings, loadSettings, saveSettings } from "@/lib/storage";

export default function Settings() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  // Load settings from local storage
  const [settings, setSettings] = useState<AppSettings>(loadSettings());
  const [pose1Preview, setPose1Preview] = useState<string | null>(null);
  const [pose2Preview, setPose2Preview] = useState<string | null>(null);
  const [pose3Preview, setPose3Preview] = useState<string | null>(null);

  // Set initial previews based on saved settings
  useEffect(() => {
    setPose1Preview(settings.pose1Image || pose1Svg);
    setPose2Preview(settings.pose2Image || pose2Svg);
    setPose3Preview(settings.pose3Image || pose3Svg);
  }, [settings]);

  const handleSave = () => {
    // Save settings to local storage
    saveSettings(settings);
    
    // Update model URL in the application
    setModelURL(settings.modelUrl);
    
    toast({
      title: "Settings Saved",
      description: "Your settings have been saved successfully.",
    });
    
    // Navigate to the main app
    setLocation('/app');
  };

  // Handle image file upload
  const handleImageUpload = (poseNumber: 1 | 2 | 3) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 2MB",
        variant: "destructive"
      });
      return;
    }

    // Create a URL for the image
    const imageUrl = URL.createObjectURL(file);
    
    // Convert to base64 for storage
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      
      // Update the appropriate pose in settings
      const newSettings = { ...settings };
      if (poseNumber === 1) {
        newSettings.pose1Image = base64String;
        setPose1Preview(imageUrl);
      } else if (poseNumber === 2) {
        newSettings.pose2Image = base64String;
        setPose2Preview(imageUrl);
      } else {
        newSettings.pose3Image = base64String;
        setPose3Preview(imageUrl);
      }
      
      setSettings(newSettings);
    };
    
    reader.readAsDataURL(file);
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
                value={settings.modelUrl}
                onChange={(e) => setSettings({...settings, modelUrl: e.target.value})}
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Enter the URL of your Teachable Machine model. The default model recognizes three yoga poses.
              </p>
            </div>
            
            <div>
              <Label>Customize Pose Images</Label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {[
                  { number: 1, name: "Pose 1", description: "Mountain Pose", preview: pose1Preview },
                  { number: 2, name: "Pose 2", description: "Tree Pose", preview: pose2Preview },
                  { number: 3, name: "Pose 3", description: "Warrior Pose", preview: pose3Preview }
                ].map((pose) => (
                  <Card key={pose.name} className="p-3 flex flex-col items-center">
                    <div className="w-28 h-28 flex items-center justify-center mb-2 overflow-hidden bg-muted rounded-md">
                      <img 
                        src={pose.preview || `@/assets/pose${pose.number}.svg`} 
                        alt={pose.description} 
                        className="max-w-full max-h-full object-contain" 
                      />
                    </div>
                    <h3 className="font-medium">{pose.name}</h3>
                    <p className="text-sm text-muted-foreground">{pose.description}</p>
                    
                    <div className="mt-2">
                      <Label htmlFor={`pose${pose.number}Upload`} className="cursor-pointer">
                        <div className="bg-primary/10 hover:bg-primary/20 text-primary text-sm py-1 px-2 rounded-md transition-colors">
                          Upload Custom Image
                        </div>
                        <Input
                          id={`pose${pose.number}Upload`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload(pose.number as 1 | 2 | 3)}
                        />
                      </Label>
                    </div>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                These are the yoga poses the application will recognize. The app will cycle through Pose 1 → Pose 2 → Pose 3 → Pose 1.
                You can upload custom images for each pose to help with visual reference.
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