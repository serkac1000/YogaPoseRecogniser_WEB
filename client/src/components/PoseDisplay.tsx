import { Card, CardContent } from "@/components/ui/card";
import pose1Svg from "@/assets/pose1.svg";
import pose2Svg from "@/assets/pose2.svg";
import pose3Svg from "@/assets/pose3.svg";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { loadSettings } from "@/lib/storage";

interface PoseDisplayProps {
  currentExpectedPose: number;
  detectedPose: string | null;
}

export default function PoseDisplay({ 
  currentExpectedPose, 
  detectedPose 
}: PoseDisplayProps) {
  const [poseImages, setPoseImages] = useState({
    pose1: pose1Svg,
    pose2: pose2Svg,
    pose3: pose3Svg
  });
  
  // Load custom images from storage if available
  useEffect(() => {
    const settings = loadSettings();
    setPoseImages({
      pose1: settings.pose1Image || pose1Svg,
      pose2: settings.pose2Image || pose2Svg,
      pose3: settings.pose3Image || pose3Svg
    });
  }, []);
  
  const poses = [
    { id: 1, name: "Pose1", image: poseImages.pose1, description: "Mountain Pose" },
    { id: 2, name: "Pose2", image: poseImages.pose2, description: "Tree Pose" },
    { id: 3, name: "Pose3", image: poseImages.pose3, description: "Warrior Pose" },
  ];

  return (
    <div>
      {/* Current Pose Display - More prominent at the top */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-2">Current Expected Pose</h3>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-6 rounded-lg mb-3">
              <img 
                src={poses[currentExpectedPose - 1].image} 
                alt={poses[currentExpectedPose - 1].description} 
                className="w-32 h-32 object-contain"
              />
            </div>
            <p className="text-xl font-medium">{poses[currentExpectedPose - 1].description}</p>
            <p className="text-sm text-muted-foreground">
              Hold this pose until detected with confidence
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sequence tracker */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-2">Pose Sequence</h3>
          <div className="flex items-center justify-between">
            {poses.map((pose, index) => (
              <div key={pose.id} className="flex items-center">
                <div 
                  className={`
                    relative w-16 h-16 rounded-full flex items-center justify-center
                    ${currentExpectedPose === pose.id ? 'bg-primary/20 border-2 border-primary' : 'bg-muted'}
                  `}
                >
                  <img 
                    src={pose.image} 
                    alt={pose.description} 
                    className="w-10 h-10 object-contain" 
                  />
                  {detectedPose === pose.name && (
                    <div className="absolute -top-2 -right-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                
                {index < 2 && (
                  <ArrowRight className="mx-2 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructions card - Simplified for space */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-1">Quick Instructions</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Position yourself in front of the camera</li>
            <li>Perform the current pose shown above</li>
            <li>Hold until detected (50% confidence)</li>
            <li>A star will appear when successfully recognized</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
