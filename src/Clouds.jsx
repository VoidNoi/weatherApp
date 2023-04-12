import React, { useRef, useEffect } from 'react';

const Clouds = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let requestId;
    const drawCloud = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, 50, Math.PI * 0.5, Math.PI * 1.5);
      ctx.arc(x + 60, y - 50, 60, Math.PI * 1, Math.PI * 1.85);
      ctx.arc(x + 132, y - 35, 40, Math.PI * 1.37, Math.PI * 1.91);
      ctx.arc(x + 178, y, 46, Math.PI * 1.5, Math.PI * 0.5);
      ctx.moveTo(x + 180, y + 46);
      ctx.lineTo(x, y + 50);
      ctx.strokeStyle = 'rgba(255, 255, 255,0)';
      ctx.stroke();
      ctx.filter = 'blur(10px)';
      ctx.fillStyle = 'rgba(255, 255, 255,1)';
      ctx.fill();
    };
    drawCloud(100, 135);
    //   return () => {

    //   }
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
    </>
  );
};

export default Clouds;
