import { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { loadModel, classifyImage } from '@/lib/yogaPoseModel';
import { Loader2 } from 'lucide-react';
import StarAnimation from './StarAnimation';

interface YogaPoseRecognizerProps {
  isActive: boolean;
  onPoseDetected: (pose: string, confidence: number) => void;
}

export default function YogaPoseRecognizer({ isActive, onPoseDetected }: YogaPoseRecognizerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showStar, setShowStar] = useState(false);
  const [currentPose, setCurrentPose] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);

  // Model loading effect
  useEffect(() => {
    const initModel = async () => {
      try {
        await loadModel();
        setModelLoaded(true);
      } catch (err) {
        console.error('Failed to load model:', err);
        setError('Failed to load the pose recognition model');
      }
    };

    initModel();
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

  // Timer-based image classification for pose detection
  useEffect(() => {
    if (!isActive || !modelLoaded) return;
    
    let timerId: number;
    
    const processFrame = async () => {
      if (!videoRef.current || !canvasRef.current) return;
      
      const context = canvasRef.current.getContext('2d');
      if (!context) return;
      
      // Capture frame from video to canvas
      context.drawImage(
        videoRef.current, 
        0, 0, 
        canvasRef.current.width, canvasRef.current.height
      );
      
      try {
        // Classify the image
        const result = await classifyImage(canvasRef.current);
        if (result) {
          const { className, probability } = result;
          
          // Update state with the detected pose and its confidence
          setCurrentPose(className);
          setConfidence(probability);
          
          // Show star animation if confidence is above threshold
          setShowStar(probability >= 0.5);
          
          // Report detected pose to parent component
          onPoseDetected(className, probability);
        }
      } catch (err) {
        console.error('Error during pose classification:', err);
      }
    };
    
    timerId = window.setInterval(processFrame, 500); // Process every 500ms like in the original app
    
    return () => {
      window.clearInterval(timerId);
    };
  }, [isActive, modelLoaded, onPoseDetected]);

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
        <video 
          ref={videoRef}
          className="w-full h-auto" 
          style={{ display: 'block' }}
          playsInline
          muted
        />
        
        <canvas 
          ref={canvasRef} 
          width={640} 
          height={480} 
          className="hidden" // Hidden canvas for processing
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
      {isActive && currentPose && (
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
