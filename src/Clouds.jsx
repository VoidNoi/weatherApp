import React, { useRef, useEffect } from 'react';

const Clouds = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let requestId;

    let clouds = [];

    const addCloud = () => {
      const cloud = {
        x: Math.floor(Math.random() * 1000) - 1100,
        y: Math.random() * canvas.height,
        speed: Math.random() * (3 - 2) + 2,
      };

      if (clouds.length < 20) {
        clouds.push(cloud);
      }
    };

    const drawCloud = (cloud) => {
      const { x, y } = cloud;

      ctx.beginPath();
      ctx.arc(x, y, 25, Math.PI * 0.5, Math.PI * 1.5);
      ctx.arc(x + 30, y - 25, 30, Math.PI * 1, Math.PI * 1.85);
      ctx.arc(x + 66, y - 17.5, 20, Math.PI * 1.37, Math.PI * 1.91);
      ctx.arc(x + 89, y, 23, Math.PI * 1.5, Math.PI * 0.5);
      ctx.moveTo(x + 90, y + 23);
      ctx.lineTo(x, y + 25);
      ctx.strokeStyle = 'rgba(255, 255, 255,0)';
      ctx.stroke();
      ctx.filter = 'blur(10px)';
      ctx.fillStyle = 'rgba(255, 255, 255,1)';
      ctx.fill();
    };

    const updateClouds = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.1) {
        addCloud();
      }

      clouds.forEach((cloud, index) => {
        const cloudsCopy = clouds.slice();

        if (cloud.x >= canvas.width + 150) {
          setTimeout(() => {
            cloudsCopy.splice(index, 1);
          }, 0);
          clouds = cloudsCopy;
        } else if (cloud.x < canvas.width + 150) {
          cloud.x += cloud.speed;
        }

        drawCloud(cloud);
      });
      requestId = requestAnimationFrame(updateClouds);
    };

    updateClouds();

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    ></canvas>
  );
};

export default Clouds;
