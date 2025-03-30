import { useEffect, useState } from 'react';
import starSvg from "@/assets/star.svg";

export default function StarAnimation() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Create a pulsing/fading effect
    const interval = setInterval(() => {
      setVisible(prev => !prev);
    }, 300);

    // Automatically hide after 2 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
      setVisible(false);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="animate-pulse transition-all duration-300">
      <img 
        src={starSvg} 
        alt="Success Star" 
        className="w-28 h-28 filter drop-shadow-lg"
        style={{ 
          animation: "spin 1s linear infinite, scale 0.5s alternate infinite",
        }}
      />
    </div>
  );
}
