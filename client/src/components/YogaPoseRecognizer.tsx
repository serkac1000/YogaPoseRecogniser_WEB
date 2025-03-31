import { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { loadModel, classifyImage } from '@/lib/yogaPoseModel';
import { Loader2 } from 'lucide-react';
import StarAnimation from './StarAnimation';
import * as poseDetection from '@tensorflow-models/pose-detection';

interface YogaPoseRecognizerProps {
  isActive: boolean;
  onPoseDetected: (pose: string, confidence: number) => void;
}

export default function YogaPoseRecognizer({ isActive, onPoseDetected }: YogaPoseRecognizerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skeletonCanvasRef = useRef<HTMLCanvasElement>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showStar, setShowStar] = useState(false);
  const [currentPose, setCurrentPose] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [poseDetector, setPoseDetector] = useState<poseDetection.PoseDetector | null>(null);

  // Model loading effect
  useEffect(() => {
    const initModel = async () => {
      try {
        // Load pose classification model
        await loadModel();
        
        // Load pose detection model (MoveNet)
        const detectorConfig = {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
          enableSmoothing: true
        };
        const detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          detectorConfig
        );
        setPoseDetector(detector);
        
        setModelLoaded(true);
      } catch (err) {
        console.error('Failed to load model:', err);
        setError('Failed to load the pose recognition model');
      }
    };

    initModel();
    
    // Cleanup
    return () => {
      if (poseDetector) {
        // Future versions of the model might include a dispose method
      }
    };
  }, []);

  // Camera setup effect
  useEffect(() => {
    if (!modelLoaded) return;
    
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: 640, height: 480 }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('Unable to access your camera. Please ensure camera permissions are enabled.');
      }
    };

    setupCamera();
    
    return () => {
      // Cleanup camera stream when component unmounts
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [modelLoaded]);

  // Function to draw skeleton on the canvas
  const drawSkeleton = (
    poses: poseDetection.Pose[],
    ctx: CanvasRenderingContext2D,
    videoWidth: number,
    videoHeight: number
  ) => {
    // Reset canvas
    ctx.clearRect(0, 0, videoWidth, videoHeight);
    
    // Draw each pose
    for (const pose of poses) {
      // Draw keypoints
      if (pose.keypoints) {
        for (const keypoint of pose.keypoints) {
          if (keypoint.score && keypoint.score > 0.3) {
            // Map position to mirror the coordinates
            const x = videoWidth - keypoint.x;
            const y = keypoint.y;
            
            // Draw circle for the keypoint
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = '#00FF00';
            ctx.fill();
            ctx.strokeStyle = '#003300';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        
        // Draw connections between keypoints
        const adjacentKeypoints = [
          // Torso
          ['left_shoulder', 'right_shoulder'],
          ['left_shoulder', 'left_hip'],
          ['right_shoulder', 'right_hip'],
          ['left_hip', 'right_hip'],
          // Arms
          ['left_shoulder', 'left_elbow'],
          ['left_elbow', 'left_wrist'],
          ['right_shoulder', 'right_elbow'],
          ['right_elbow', 'right_wrist'],
          // Legs
          ['left_hip', 'left_knee'],
          ['left_knee', 'left_ankle'],
          ['right_hip', 'right_knee'],
          ['right_knee', 'right_ankle'],
        ];
        
        // Create a map of keypoint name to x,y coordinates
        const keypointMap = new Map();
        pose.keypoints.forEach(keypoint => {
          if (keypoint.score && keypoint.score > 0.3) {
            keypointMap.set(keypoint.name, {
              x: videoWidth - keypoint.x, // Mirror x-coordinate
              y: keypoint.y
            });
          }
        });
        
        // Draw lines connecting keypoints
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#00FF00';
        
        for (const [first, second] of adjacentKeypoints) {
          const firstKeypoint = keypointMap.get(first);
          const secondKeypoint = keypointMap.get(second);
          
          if (firstKeypoint && secondKeypoint) {
            ctx.beginPath();
            ctx.moveTo(firstKeypoint.x, firstKeypoint.y);
            ctx.lineTo(secondKeypoint.x, secondKeypoint.y);
            ctx.stroke();
          }
        }
      }
    }
  };
  
  // Timer-based image classification for pose detection
  useEffect(() => {
    if (!isActive || !modelLoaded || !poseDetector) return;
    
    let timerId: number;
    let skeletonTimerId: number;
    
    const processFrame = async () => {
      if (!videoRef.current || !canvasRef.current) return;
      
      const context = canvasRef.current.getContext('2d');
      if (!context) return;
      
      // Capture frame from video to canvas with horizontal mirroring
      const { width, height } = canvasRef.current;
      // Flip the image horizontally for processing
      context.translate(width, 0);
      context.scale(-1, 1);
      context.drawImage(videoRef.current, 0, 0, width, height);
      // Reset the transformation matrix
      context.setTransform(1, 0, 0, 1, 0, 0);
      
      try {
        // Classify the image
        const result = await classifyImage(canvasRef.current);
        if (result) {
          const { className, probability } = result;
          
          // Improve confidence verification:
          // Only update if confidence is above a minimum threshold to avoid flickering
          const minConfidenceThreshold = 0.3;
          if (probability >= minConfidenceThreshold) {
            // Update state with the detected pose and its confidence
            setCurrentPose(className);
            setConfidence(probability);
            
            // Show star animation if confidence is above threshold
            setShowStar(probability >= 0.5);
            
            // Only report pose to parent if we're confident
            if (probability >= 0.5) {
              onPoseDetected(className, probability);
            }
          }
        }
      } catch (err) {
        console.error('Error during pose classification:', err);
      }
    };
    
    // Function to render skeleton
    const renderSkeleton = async () => {
      if (!videoRef.current || !skeletonCanvasRef.current || !poseDetector) return;
      
      try {
        // Detect poses
        const poses = await poseDetector.estimatePoses(videoRef.current);
        
        // Draw skeleton on canvas
        const ctx = skeletonCanvasRef.current.getContext('2d');
        if (ctx && poses.length > 0) {
          const videoWidth = videoRef.current.videoWidth || 640;
          const videoHeight = videoRef.current.videoHeight || 480;
          drawSkeleton(poses, ctx, videoWidth, videoHeight);
        }
      } catch (err) {
        console.error('Error during pose detection:', err);
      }
    };
    
    // Run classification less frequently (500ms)
    timerId = window.setInterval(processFrame, 500);
    
    // Run skeleton detection more frequently for smoothness (100ms)
    skeletonTimerId = window.setInterval(renderSkeleton, 100);
    
    return () => {
      window.clearInterval(timerId);
      window.clearInterval(skeletonTimerId);
    };
  }, [isActive, modelLoaded, onPoseDetected, poseDetector]);

  if (error) {
    return (
      <Card className="flex flex-col items-center justify-center p-6 h-[480px] bg-red-50 border-red-200">
        <p className="text-red-500 text-center">{error}</p>
      </Card>
    );
  }

  if (!modelLoaded) {
    return (
      <Card className="flex flex-col items-center justify-center p-6 h-[480px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-center">Loading pose recognition model...</p>
      </Card>
    );
  }

  return (
    <div className="relative">
      <Card className="overflow-hidden">
        <div className="relative">
          {/* Video element */}
          <video 
            ref={videoRef}
            className="w-full h-auto" 
            style={{ 
              display: 'block',
              transform: 'scaleX(-1)', // Mirror horizontally so left hand appears on left side
              WebkitTransform: 'scaleX(-1)' // For Safari support
            }}
            playsInline
            muted
          />

          {/* Skeleton overlay */}
          {isActive && (
            <canvas
              ref={skeletonCanvasRef}
              width={640}
              height={480}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />
          )}
        </div>
        
        {/* Hidden canvas for processing */}
        <canvas 
          ref={canvasRef} 
          width={640} 
          height={480} 
          className="hidden"
        />
      </Card>
      
      {/* Overlay to show when inactive */}
      {!isActive && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <p className="text-white text-xl font-medium">Press Start to Begin</p>
        </div>
      )}
      
      {/* Star animation overlay */}
      {showStar && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <StarAnimation />
        </div>
      )}
      
      {/* Pose detection info overlay */}
      {isActive && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-2 rounded">
          <p className="text-center">
            {confidence >= 0.5 
              ? `${currentPose} Detected! (${(confidence * 100).toFixed(0)}%)` 
              : 'No Pose Detected'}
          </p>
        </div>
      )}
    </div>
  );
}
