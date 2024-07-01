import React from 'react';
import { TypewriterEffect } from '../components/typewriter-effect';
import { HoverBorderGradient } from '../components/hover-border-gradient';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center space-y-8 mt-[-10vh]">
        <TypewriterEffect
          words={[
            { text: "Elevate " },
            { text: "Your " },
            { text: "Tech " },
            { text: "Blog " },
            { text: "Experience " },
            { text: "With " },
            { text: "Fusion " },
            { text: ", " },
            { text: "Where " },
            { text: "Ideas " },
            { text: "Merge " },
            { text: "and " },
            { text: "Stories " },
            { text: "Evolve " },
          ]}
        />
        <HoverBorderGradient >
          <button onClick={() => navigate('/auth')}>Get Started</button>
         
        </HoverBorderGradient>
      </div>
    </div>
  );
}

export default Landing;
