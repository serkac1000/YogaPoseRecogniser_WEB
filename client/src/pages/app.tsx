import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import YogaPoseRecognizer from "@/components/YogaPoseRecognizer";
import PoseDisplay from "@/components/PoseDisplay";
import StarAnimation from "@/components/StarAnimation";
import { useLocation } from "wouter";

export default function AppPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [currentExpectedPose, setCurrentExpectedPose] = useState(1);
  const [detectedPose, setDetectedPose] = useState<string | null>(null);
  const [showStar, setShowStar] = useState(false);
  
  const handleStart = () => {
    setIsActive(true);
    setCurrentExpectedPose(1);
    setDetectedPose(null);
    setShowStar(false);
    toast({
      title: "Yoga Recognition Started",
      description: "Get ready for Pose 1",
    });
  };

  const handleStop = () => {
    setIsActive(false);
    toast({
      title: "Yoga Recognition Stopped",
      description: "Take a break, you've done great!",
    });
  };

  const handlePoseDetected = (pose: string, confidence: number) => {
    setDetectedPose(pose);
    
    // Check if detected pose matches the expected pose in the sequence
    if (pose === `Pose${currentExpectedPose}` && confidence >= 0.5) {
      // Show the star animation
      setShowStar(true);
      
      // Reset star after animation completes
      setTimeout(() => {
        setShowStar(false);
      }, 2000);
      
      toast({
        title: `Pose ${currentExpectedPose} Detected!`,
        description: `Great job! Confidence: ${(confidence * 100).toFixed(0)}%`,
      });
      
      // Advance to the next pose in the sequence (1 -> 2 -> 3 -> 1)
      setCurrentExpectedPose(prev => prev < 3 ? prev + 1 : 1);
    }
  };

  const handleSettings = () => {
    setLocation('/settings');
  };

  return (
    <div className="min-h-screen w-full p-4 bg-background flex flex-col items-center justify-center">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader className="text-center bg-primary text-primary-foreground p-6 rounded-t-lg flex justify-between">
          <Button variant="outline" onClick={handleSettings}>
            Settings
          </Button>
          <CardTitle className="text-3xl font-bold">Yoga Pose Recognizer</CardTitle>
          <div className="w-20"></div> {/* Spacer for symmetry */}
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">Camera View</h2>
              <div className="relative">
                <YogaPoseRecognizer 
                  isActive={isActive} 
                  onPoseDetected={handlePoseDetected}
                />
                
                {showStar && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <StarAnimation />
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex gap-4 justify-center">
                {!isActive ? (
                  <Button size="lg" onClick={handleStart}>
                    Start Recognition
                  </Button>
                ) : (
                  <Button size="lg" variant="destructive" onClick={handleStop}>
                    Stop Recognition
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">Pose Tracking</h2>
              <PoseDisplay 
                currentExpectedPose={currentExpectedPose} 
                detectedPose={detectedPose} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}