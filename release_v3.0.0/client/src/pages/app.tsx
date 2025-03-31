import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import YogaPoseRecognizer from "@/components/YogaPoseRecognizer";
import PoseDisplay from "@/components/PoseDisplay";
import StarAnimation from "@/components/StarAnimation";
import { useLocation } from "wouter";
import { Settings } from "lucide-react";
import { loadSettings } from "@/lib/storage";
import { Progress } from "@/components/ui/progress";

export default function AppPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [currentExpectedPose, setCurrentExpectedPose] = useState(1);
  const [detectedPose, setDetectedPose] = useState<string | null>(null);
  const [showStar, setShowStar] = useState(false);
  const [confidenceLevel, setConfidenceLevel] = useState(0);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [countdownProgress, setCountdownProgress] = useState(100);
  
  // Check for saved settings on component mount
  useEffect(() => {
    const settings = loadSettings();
    // Any additional setup with settings can go here
  }, []);
  
  const handleStart = () => {
    setIsActive(true);
    setCurrentExpectedPose(1);
    setDetectedPose(null);
    setShowStar(false);
    setConfidenceLevel(0);
    toast({
      title: "Yoga Recognition Started",
      description: "Get ready for Pose 1",
    });
  };

  const handleStop = () => {
    setIsActive(false);
    setConfidenceLevel(0);
    setShowCountdown(false);
    setShowStar(false);
    toast({
      title: "Yoga Recognition Stopped",
      description: "Take a break, you've done great!",
    });
  };

  const handlePoseDetected = (pose: string, confidence: number) => {
    setDetectedPose(pose);
    setConfidenceLevel(confidence);
    
    // Check if detected pose matches the expected pose in the sequence
    if (pose === `Pose${currentExpectedPose}` && confidence >= 0.5 && !showCountdown) {
      // Show the star animation
      setShowStar(true);
      
      toast({
        title: `Pose ${currentExpectedPose} Detected!`,
        description: `Great job! Confidence: ${(confidence * 100).toFixed(0)}%`,
      });
      
      // Start the countdown animation
      setShowCountdown(true);
      setCountdownValue(3);
      setCountdownProgress(100);
      
      // Create the countdown animation
      let count = 3;
      const countdownInterval = setInterval(() => {
        count--;
        setCountdownValue(count);
        setCountdownProgress((count / 3) * 100);
        
        if (count === 0) {
          // When countdown reaches 0, clear interval and advance to next pose
          clearInterval(countdownInterval);
          setTimeout(() => {
            setShowCountdown(false);
            setShowStar(false);
            
            // Advance to the next pose in the sequence (1 -> 2 -> 3 -> 1)
            setCurrentExpectedPose(prev => prev < 3 ? prev + 1 : 1);
          }, 500);
        }
      }, 1000);
    }
  };

  const handleSettings = () => {
    setLocation('/settings');
  };

  return (
    <div className="min-h-screen w-full p-2 bg-background flex flex-col">
      {/* Header with settings button */}
      <header className="bg-primary text-primary-foreground p-2 rounded-lg mb-2 flex items-center justify-between">
        <div className="w-10">
          <Button variant="ghost" size="icon" onClick={handleSettings}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        <h1 className="text-xl font-bold">Yoga Pose Recognizer</h1>
        <div className="w-10"></div> {/* Spacer for symmetry */}
      </header>
      
      {/* Main content area - fixed height to prevent scrolling */}
      <div className="flex flex-1 gap-2 h-[calc(100vh-80px)]">
        {/* Left column: Camera view */}
        <div className="w-1/2 flex flex-col">
          <div className="relative flex-1 bg-card rounded-lg p-2 overflow-hidden">
            <YogaPoseRecognizer 
              isActive={isActive} 
              onPoseDetected={handlePoseDetected}
            />
            
            {showStar && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <StarAnimation />
              </div>
            )}
            
            {/* Countdown animation */}
            {showCountdown && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/60">
                <div className="text-8xl font-bold text-white mb-4">{countdownValue}</div>
                <div className="w-1/2">
                  <Progress value={countdownProgress} className="h-4" />
                </div>
                <div className="text-white mt-4">Get ready for next pose!</div>
              </div>
            )}
            
            {/* Confidence indicator */}
            {isActive && (
              <div className="absolute bottom-2 left-2 right-2 bg-black/50 rounded p-1 text-white text-xs flex justify-between">
                <span>Confidence: </span>
                <span>{(confidenceLevel * 100).toFixed(0)}%</span>
              </div>
            )}
          </div>
          
          <div className="mt-2 flex justify-center">
            {!isActive ? (
              <Button size="lg" onClick={handleStart} className="w-full">
                Start Recognition
              </Button>
            ) : (
              <Button size="lg" variant="destructive" onClick={handleStop} className="w-full">
                Stop Recognition
              </Button>
            )}
          </div>
        </div>
        
        {/* Right column: Pose tracking */}
        <div className="w-1/2 overflow-auto">
          <PoseDisplay 
            currentExpectedPose={currentExpectedPose} 
            detectedPose={detectedPose} 
          />
        </div>
      </div>
    </div>
  );
}