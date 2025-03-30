import { Card, CardContent } from "@/components/ui/card";
import pose1Svg from "@/assets/pose1.svg";
import pose2Svg from "@/assets/pose2.svg";
import pose3Svg from "@/assets/pose3.svg";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface PoseDisplayProps {
  currentExpectedPose: number;
  detectedPose: string | null;
}

export default function PoseDisplay({ 
  currentExpectedPose, 
  detectedPose 
}: PoseDisplayProps) {
  
  const poses = [
    { id: 1, name: "Pose1", image: pose1Svg, description: "Mountain Pose" },
    { id: 2, name: "Pose2", image: pose2Svg, description: "Tree Pose" },
    { id: 3, name: "Pose3", image: pose3Svg, description: "Warrior Pose" },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-2">Current Sequence</h3>
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
                    className="w-10 h-10" 
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

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-2">Current Expected Pose</h3>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-6 rounded-lg mb-3">
              <img 
                src={poses[currentExpectedPose - 1].image} 
                alt={poses[currentExpectedPose - 1].description} 
                className="w-28 h-28"
              />
            </div>
            <p className="text-lg font-medium">{poses[currentExpectedPose - 1].description}</p>
            <p className="text-sm text-muted-foreground">
              Hold this pose until detected with confidence
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-2">Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Click "Start Recognition" to begin</li>
            <li>Position yourself in front of the camera</li>
            <li>Perform the current expected pose</li>
            <li>Hold steady until the pose is recognized</li>
            <li>A star will appear when a pose is detected correctly</li>
            <li>Continue through the sequence: Pose 1 → Pose 2 → Pose 3 → Pose 1</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
