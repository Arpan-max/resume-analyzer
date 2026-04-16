import React, { useEffect, useState } from 'react';

function ScoreRing({ score, size = 140, strokeWidth = 8 }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    let start = 0;
    const step = score / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [score]);

  const getColor = (s) => {
    if (s >= 75) return '#4caf82';
    if (s >= 50) return '#f7c948';
    return '#ff6b6b';
  };

  const color = getColor(score);

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.05s linear',
            filter: `drop-shadow(0 0 8px ${color}66)`
          }}
        />
      </svg>
      {/* Center text */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: size * 0.22,
          fontWeight: 800,
          color,
          lineHeight: 1,
          letterSpacing: '-0.03em'
        }}>
          {animatedScore}
        </span>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: size * 0.08,
          color: 'rgba(136,136,170,0.8)',
          letterSpacing: '0.05em',
          marginTop: 2
        }}>
          / 100
        </span>
      </div>
    </div>
  );
}

export default ScoreRing;
