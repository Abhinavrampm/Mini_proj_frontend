// CircularProgress.tsx

import React from 'react';

interface CircularProgressProps {
  progress: number; // Progress percentage (0-100)
  radius: number; // Radius of the circle
  strokeWidth: number; // Stroke width of the progress bar
}

const CircularProgress: React.FC<CircularProgressProps> = ({ progress, radius, strokeWidth }) => {
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#d2d3d4"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        stroke="#007bff"
        strokeWidth="1px"
        dy=".3em"
        fontSize="20px"
      >
        {progress}%
      </text>
    </svg>
  );
};

export default CircularProgress;
