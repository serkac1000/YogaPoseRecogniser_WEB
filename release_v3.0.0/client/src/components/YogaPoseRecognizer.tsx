import { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { loadModel, classifyImage } from '@/lib/yogaPoseModel';
import { Loader2 } from 'lucide-react';
import StarAnimation from './StarAnimation';
import DemoSkeleton from './DemoSkeleton';
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
        const modelLoaded = await loadModel();

        if (!modelLoaded) {
          console.warn('Classification model failed to load, continuing with pose detection only');
        }

        try {
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
          console.log('Pose detector model loaded successfully');
        } catch (poseErr) {
          console.error('Failed to load pose detection model:', poseErr);
          // Continue even if pose detector fails - we'll just not show the skeleton
        }

        // Mark as loaded even if only the classification model loaded
        setModelLoaded(true);
      } catch (err) {
        console.error('Failed to load models:', err);
        setError('Failed to load the pose recognition models. Please check your internet connection and try again.');
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

    let attemptCount = 0;
    const maxAttempts = 3;

    const setupCamera = async () => {
      try {
        // First check if getUserMedia is available
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera access is not supported in this browser or environment.');
        }

        // Try to access the camera with lower constraints if we've already failed before
        const constraints = attemptCount === 0 
          ? { video: { facingMode: 'user', width: 640, height: 480 } }
          : { video: true }; // Simplified constraints as fallback

        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          try {
            await videoRef.current.play();
            console.log('Camera stream started successfully');
          } catch (playError) {
            console.error('Error playing video stream:', playError);
            throw new Error('Could not play camera stream');
          }
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        attemptCount++;

        if (attemptCount < maxAttempts) {
          console.log(`Retrying camera setup (attempt ${attemptCount + 1}/${maxAttempts})...`);
          setTimeout(setupCamera, 500); // Try again after a short delay
        } else {
          setError('Unable to access your camera. Please ensure camera permissions are enabled and you are using a device with a camera.');

          // In a real environment, this would access the camera
          // For development/testing, we can continue without camera access
          if (process.env.NODE_ENV === 'development') {
            setError('Camera not available. Running in demo mode with mock classification data.');
          }
        }
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
    if (!isActive || !modelLoaded) return;

    let timerId: number;
    let skeletonTimerId: number | undefined;

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
          const minConfidenceThreshold = 0.95; // Increased threshold
          if (probability >= minConfidenceThreshold) {
            // Update state with the detected pose and its confidence
            setCurrentPose(className);
            setConfidence(probability);

            // Show star animation if confidence is above threshold
            setShowStar(probability >= 0.95); // Increased threshold

            // Only report pose to parent if we're confident
            if (probability >= 0.95) { // Increased threshold
              onPoseDetected(className, probability);
            }
          }
        }
      } catch (err) {
        console.error('Error during pose classification:', err);
      }
    };

    // Run classification less frequently (500ms)
    timerId = window.setInterval(processFrame, 500);

    // Only run skeleton detection if pose detector is available
    if (poseDetector) {
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

      // Run skeleton detection more frequently for smoothness (100ms)
      skeletonTimerId = window.setInterval(renderSkeleton, 100);
    }

    return () => {
      window.clearInterval(timerId);
      if (skeletonTimerId) {
        window.clearInterval(skeletonTimerId);
      }
    };
  }, [isActive, modelLoaded, onPoseDetected, poseDetector]);

  if (!modelLoaded) {
    return (
      <Card className="flex flex-col items-center justify-center p-6 h-[480px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-center">Loading pose recognition model...</p>
      </Card>
    );
  }

  if (error) {
    // In error/demo mode we'll use a demo skeleton animation
    // For camera errors, show the demo skeleton with error message
    return (
      <div className="space-y-4">
        <Card className="overflow-hidden">
          {/* Show demo skeleton animation */}
          <DemoSkeleton isActive={isActive} />
        </Card>

        <Card className="p-4 bg-red-50 border-red-200">
          <div className="text-center">
            <p className="text-red-500 font-semibold mb-2">
              {error}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Note: For the full experience, this app requires a camera and permission to access it.
              When using this app in a real environment, please ensure:
            </p>
            <ul className="text-gray-600 text-sm list-disc list-inside mt-2">
              <li>You're using a device with a camera</li>
              <li>Camera permissions are granted in your browser</li>
              <li>You're not in private/incognito mode (which may block camera access)</li>
            </ul>

            <div className="mt-4">
              <p className="text-gray-700 font-medium">Demo Mode Active</p>
              <p className="text-gray-600 text-xs">Using simulated data for demonstration</p>
            </div>
          </div>
        </Card>

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
              {confidence >= 0.95
                ? `${currentPose} Detected! (${(confidence * 100).toFixed(0)}%)`
                : 'No Pose Detected'}
            </p>
          </div>
        )}
      </div>
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
            {confidence >= 0.95
              ? `${currentPose} Detected! (${(confidence * 100).toFixed(0)}%)`
              : 'No Pose Detected'}
          </p>
        </div>
      )}
    </div>
  );
}