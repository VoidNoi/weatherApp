import React, { useRef, useEffect } from 'react';

const Clouds = ({ width, height }) => {
  const cloudsRef = useRef(null);

  useEffect(() => {
    const cloudsCanvas = cloudsRef.current;
    const cloudsCtx = cloudsCanvas.getContext('2d');
    let cloudsId;
    cloudsCanvas.width = width;
    cloudsCanvas.height = height;
    let clouds = [];

    const addCloud = () => {
      const cloud = {
        x: Math.floor(Math.random() * 1000) - 1100,
        y: Math.random() * cloudsCanvas.height,
        speed: Math.random() * (3 - 2) + 2,
      };

      if (clouds.length < 20) {
        clouds.push(cloud);
      }
    };

    const drawCloud = (cloud) => {
      const { x, y } = cloud;

      cloudsCtx.beginPath();
      cloudsCtx.arc(x, y, 25, Math.PI * 0.5, Math.PI * 1.5);
      cloudsCtx.arc(x + 30, y - 25, 30, Math.PI * 1, Math.PI * 1.85);
      cloudsCtx.arc(x + 66, y - 17.5, 20, Math.PI * 1.37, Math.PI * 1.91);
      cloudsCtx.arc(x + 89, y, 23, Math.PI * 1.5, Math.PI * 0.5);
      cloudsCtx.moveTo(x + 90, y + 23);
      cloudsCtx.lineTo(x, y + 25);
      cloudsCtx.strokeStyle = 'rgba(255, 255, 255,0)';
      cloudsCtx.stroke();
      cloudsCtx.filter = 'blur(10px)';
      cloudsCtx.fillStyle = 'rgba(255, 255, 255,1)';
      cloudsCtx.fill();
    };

    const updateClouds = () => {
      cloudsCtx.clearRect(0, 0, cloudsCanvas.width, cloudsCanvas.height);

      if (Math.random() < 0.1) {
        addCloud();
      }

      clouds.forEach((cloud, index) => {
        const cloudsCopy = clouds.slice();

        if (cloud.x >= cloudsCanvas.width + 150) {
          setTimeout(() => {
            cloudsCopy.splice(index, 1);
          }, 0);
          clouds = cloudsCopy;
        } else if (cloud.x < cloudsCanvas.width + 150) {
          cloud.x += cloud.speed;
        }

        drawCloud(cloud);
      });
      cloudsId = requestAnimationFrame(updateClouds);
    };

    updateClouds();

    return () => {
      cancelAnimationFrame(cloudsId);
    };
  }, []);

  return (
    <canvas
      ref={cloudsRef}
      width={window.innerWidth}
      height={window.innerHeight}
    ></canvas>
  );
};

export default Clouds;
