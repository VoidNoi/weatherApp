import React, { useRef, useEffect } from 'react';

const Background = () => {
  const canvasRef = useRef(null);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const drawStar = (ctx, width, height) => {
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(getRandomInt(width), getRandomInt(height), 2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    drawStar(ctx, width, height);
  }, [drawStar]);

  return (
    <div>
      <div className='lightBackground'></div>
      <div className='darkBackground'></div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Background;
