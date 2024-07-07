import React from 'react';
import { TypewriterEffect } from '../components/typewriter-effect';
import { HoverBorderGradient } from '../components/hover-border-gradient';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center space-y-8 mt-[-15vh]">
        <TypewriterEffect
          words={[
            { text: "Elevate " },
            { text: "Your " },
            { text: "Tech " },
            { text: "Blog " },
            { text: "Experience " },
            { text: "With " },
            { text: "Fusion " },
          ]}
          textStyle="text-4xl md:text-6xl lg:text-7xl" // Responsive text size classes
        />
        <div className="mt-4"> {/* Add margin to create a gap */}
          <HoverBorderGradient>
            <button 
              className="px-6 py-3 text-lg md:text-xl font-bold border border-black rounded-lg transition duration-300 ease-in-out transform hover:bg-black hover:text-white hover:scale-105" // Increase padding and font size for a larger button
              onClick={() => navigate('/auth')}
            >
              Get Started
            </button>
          </HoverBorderGradient>
        </div>
      </div>
    </div>
  );
}

export default Landing;
