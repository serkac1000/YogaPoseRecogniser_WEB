import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { Card } from '@/components/ui/card';
import StarAnimation from './StarAnimation';
import DemoSkeleton from './DemoSkeleton';

interface YogaPoseRecognizerProps {
  isActive: boolean;
  onPoseDetected: (pose: string, confidence: number) => void;
}

export default function YogaPoseRecognizer({ isActive, onPoseDetected }: YogaPoseRecognizerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skeletonCanvasRef = useRef<HTMLCanvasElement>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [poseDetector, setPoseDetector] = useState<poseDetection.PoseDetector | null>(null);
  const [currentPose, setCurrentPose] = useState<string>('');
  const [poseConfidences, setPoseConfidences] = useState<{[key: string]: number}>({
    'pose1': 0,
    'pose2': 0,
    'pose3': 0
  });
  const [error, setError] = useState<string>('');
  const [showStar, setShowStar] = useState(false);


  // Load model and pose detector
  useEffect(() => {
    const initModels = async () => {
      try {
        // Load TensorFlow.js pose detector
        const detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          { modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER }
        );
        setPoseDetector(detector);

        // Load classification model  (REPLACE WITH YOUR ACTUAL MODEL URL)
        const model = await tf.loadLayersModel('https://teachablemachine.withgoogle.com/models/gIF64n3nR/model.json');
        setModelLoaded(true);

        return model;
      } catch (err) {
        console.error('Failed to load models:', err);
        setError('Failed to load models. Please check your connection.');
        return null;
      }
    };

    initModels();
  }, []);

  // Camera setup
  useEffect(() => {
    if (!modelLoaded) return;

    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        setError('Failed to access camera. Please check permissions.');
      }
    };

    if (isActive) {
      setupCamera();
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isActive, modelLoaded]);

  // Process video frames
  useEffect(() => {
    if (!isActive || !modelLoaded) return;

    let timerId: number;
    let skeletonTimerId: number;

    const processFrame = async () => {
      if (!videoRef.current || !canvasRef.current || !poseDetector) return;

      try {
        // Detect poses
        const poses = await poseDetector.estimatePoses(videoRef.current);

        if (poses.length > 0) {
          // Draw skeleton
          const ctx = skeletonCanvasRef.current?.getContext('2d');
          if (ctx) {
            drawSkeleton(poses[0], ctx);
          }

          // Update pose confidences (REPLACE WITH ACTUAL CONFIDENCE CALCULATION)
          const newConfidences = {
            'pose1': Math.random(), 
            'pose2': Math.random(),
            'pose3': Math.random()
          };
          setPoseConfidences(newConfidences);

          // Find highest confidence pose
          const maxPose = Object.entries(newConfidences).reduce((a, b) => 
            a[1] > b[1] ? a : b
          );

          if (maxPose[1] > 0.9) { // 90% threshold
            setCurrentPose(maxPose[0]);
            onPoseDetected(maxPose[0], maxPose[1]);
            setShowStar(true); // Show star animation on detection
          } else {
            setShowStar(false); // Hide star animation if confidence is low.
          }
        }
      } catch (err) {
        console.error('Error during pose detection:', err);
      }
    };

    timerId = window.setInterval(processFrame, 100);
    return () => {
      window.clearInterval(timerId);
    };
  }, [isActive, modelLoaded, onPoseDetected, poseDetector]);

  const drawSkeleton = (pose: poseDetection.Pose, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (!pose.keypoints) return;

    // Draw points
    pose.keypoints.forEach(keypoint => {
      if (keypoint.score && keypoint.score > 0.3) {
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#00FF00';
        ctx.fill();
      }
    });

    // Draw lines
    const connections = [
      ['nose', 'left_eye'], ['left_eye', 'left_ear'], ['nose', 'right_eye'],
      ['right_eye', 'right_ear'], ['nose', 'left_shoulder'],
      ['nose', 'right_shoulder'], ['left_shoulder', 'left_elbow'],
      ['left_elbow', 'left_wrist'], ['right_shoulder', 'right_elbow'],
      ['right_elbow', 'right_wrist'], ['left_shoulder', 'left_hip'],
      ['right_shoulder', 'right_hip'], ['left_hip', 'left_knee'],
      ['left_knee', 'left_ankle'], ['right_hip', 'right_knee'],
      ['right_knee', 'right_ankle']
    ];

    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 2;

    connections.forEach(([start, end]) => {
      const startPoint = pose.keypoints.find(kp => kp.name === start);
      const endPoint = pose.keypoints.find(kp => kp.name === end);

      if (startPoint && endPoint && startPoint.score && endPoint.score &&
          startPoint.score > 0.3 && endPoint.score > 0.3) {
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
      }
    });
  };

  return (
    <div className="relative">
      <Card className="overflow-hidden">
        <div className="relative">
          <video 
            ref={videoRef}
            className="w-full h-auto"
            style={{ transform: 'scaleX(-1)' }}
            playsInline
            muted
          />
          <canvas
            ref={skeletonCanvasRef}
            width={640}
            height={480}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          />
          <canvas ref={canvasRef} className="hidden" width={640} height={480} />
        </div>
      </Card>

      {/* Pose confidence bars */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/70 p-2 rounded">
        {Object.entries(poseConfidences).map(([pose, confidence]) => (
          <div key={pose} className="flex items-center mb-1">
            <span className="text-white w-20">{pose}:</span>
            <div className="flex-1 bg-gray-700 h-4 rounded overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all"
                style={{ width: `${confidence * 100}%` }}
              />
            </div>
            <span className="text-white ml-2 w-16">
              {(confidence * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>

      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-500/70 text-white p-2 rounded">
          {error}
        </div>
      )}
      {showStar && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <StarAnimation />
        </div>
      )}
    </div>
  );
}