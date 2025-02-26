'use client'

import { useState, useEffect } from 'react';

const Loading = () => {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval); // Stop the interval when progress reaches 100%
          return 100;
        }
        return prevProgress + 1; // Increment progress by 1%
      });
    }, 30); // Adjust the interval speed (e.g., 30ms for faster animation)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="loadingContainer">
      <div className="loadingBar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="loadingText">Loading... {progress}%</div>
    </div>
  );
};

export default Loading;