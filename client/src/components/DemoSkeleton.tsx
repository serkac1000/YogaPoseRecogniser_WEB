import { useEffect, useRef } from 'react';

interface DemoSkeletonProps {
  isActive: boolean;
}

// This component displays a simulated skeleton animation when camera access isn't available
export default function DemoSkeleton({ isActive }: DemoSkeletonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIdRef = useRef<number | null>(null);
  
  // Animation state variables
  const animationState = useRef({
    time: 0,
    joints: [
      // Head
      { x: 320, y: 100, radius: 15 },
      // Shoulders
      { x: 270, y: 150, radius: 8 },
      { x: 370, y: 150, radius: 8 },
      // Elbows
      { x: 230, y: 200, radius: 6 },
      { x: 410, y: 200, radius: 6 },
      // Wrists
      { x: 220, y: 250, radius: 5 },
      { x: 420, y: 250, radius: 5 },
      // Hip
      { x: 320, y: 220, radius: 10 },
      // Knees
      { x: 290, y: 300, radius: 7 },
      { x: 350, y: 300, radius: 7 },
      // Ankles
      { x: 280, y: 380, radius: 5 },
      { x: 360, y: 380, radius: 5 },
    ],
    connections: [
      // Torso
      [1, 2], // Shoulders
      [1, 7], // Left shoulder to hip
      [2, 7], // Right shoulder to hip
      // Arms
      [1, 3], // Left shoulder to elbow
      [3, 5], // Left elbow to wrist
      [2, 4], // Right shoulder to elbow
      [4, 6], // Right elbow to wrist
      // Legs
      [7, 8], // Hip to left knee
      [8, 10], // Left knee to ankle
      [7, 9], // Hip to right knee
      [9, 11], // Right knee to ankle
      // Head
      [0, 1], // Head to left shoulder
      [0, 2], // Head to right shoulder
    ]
  });
  
  // Function to animate the skeleton in a yoga pose
  useEffect(() => {
    // Always run animation, regardless of isActive state for demo mode
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update time
      animationState.current.time += 0.02;
      const time = animationState.current.time;
      
      // Create a "breathing" yoga pose by slightly moving joints
      // Tree pose - one leg up, arms above head
      
      // Left leg up
      animationState.current.joints[8].x = 320 + Math.sin(time) * 5; // Left knee
      animationState.current.joints[8].y = 220; // Knee up to hip level
      animationState.current.joints[10].x = 365 + Math.sin(time) * 5; // Left ankle
      animationState.current.joints[10].y = 220; // Ankle near hip
      
      // Arms up
      animationState.current.joints[3].x = 270 + Math.sin(time + 1) * 5; // Left elbow
      animationState.current.joints[3].y = 100; // Above shoulder
      animationState.current.joints[5].x = 290 + Math.sin(time + 1.5) * 5; // Left wrist
      animationState.current.joints[5].y = 60; // Above elbow
      
      animationState.current.joints[4].x = 370 + Math.sin(time + 1) * 5; // Right elbow
      animationState.current.joints[4].y = 100; // Above shoulder
      animationState.current.joints[6].x = 350 + Math.sin(time + 1.5) * 5; // Right wrist
      animationState.current.joints[6].y = 60; // Above elbow
      
      // Slight "breathing" movement
      animationState.current.joints[0].y = 100 + Math.sin(time) * 2; // Head
      animationState.current.joints[1].y = 150 + Math.sin(time) * 2; // Left shoulder
      animationState.current.joints[2].y = 150 + Math.sin(time) * 2; // Right shoulder
      animationState.current.joints[7].y = 220 + Math.sin(time) * 2; // Hip
      
      // Draw skeleton
      // Draw connections first (lines)
      ctx.strokeStyle = '#00FF00';
      ctx.lineWidth = 3;
      
      animationState.current.connections.forEach(([i, j]) => {
        const joint1 = animationState.current.joints[i];
        const joint2 = animationState.current.joints[j];
        
        ctx.beginPath();
        ctx.moveTo(joint1.x, joint1.y);
        ctx.lineTo(joint2.x, joint2.y);
        ctx.stroke();
      });
      
      // Draw joints (circles)
      animationState.current.joints.forEach(joint => {
        ctx.fillStyle = '#00FF00';
        ctx.beginPath();
        ctx.arc(joint.x, joint.y, joint.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = '#003300';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      // Request next frame using ref to avoid state updates
      frameIdRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    frameIdRef.current = requestAnimationFrame(animate);
    
    // Cleanup animation on unmount
    return () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      width={640}
      height={480}
      className="w-full h-auto bg-gray-900"
    />
  );
}