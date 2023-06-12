import React, { useRef, useEffect } from 'react';

const Rain = ({ randomInt }) => {
  const rainRef = useRef(null);

  useEffect(() => {
    const rainCanvas = rainRef.current;
    const rainCtx = rainCanvas.getContext('2d');
    let rainId;

    let drops = [];

    const addDrop = () => {
      const drop = {
        x: Math.random() * rainCanvas.width,
        y: 0,

        speed: randomInt(10, 20),
        size: randomInt(1, 5),
      };
      drops.push(drop);
    };

    const drawDrop = (drop) => {
      const { x, y, size, speed } = drop;
      rainCtx.beginPath();
      rainCtx.moveTo(x, y);
      rainCtx.lineTo(x, y + size * speed);
      rainCtx.strokeStyle = 'rgba( 	156,174,201,0.8)';
      rainCtx.lineWidth = 1;
      rainCtx.lineCap = 'round';
      rainCtx.stroke();
    };

    const updateDrops = () => {
      rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
      addDrop();
      drops.forEach((drop, index) => {
        if (drop.y < rainCanvas.height) {
          drop.y += drop.speed;
        } else {
          drops.splice(index, 1);
        }
        drawDrop(drop);
      });
      rainId = requestAnimationFrame(updateDrops);
    };

    updateDrops();

    return () => {
      cancelAnimationFrame(rainId);
    };
  }, []);

  return (
    <canvas
      ref={rainRef}
      width={window.innerWidth}
      height={window.innerHeight}
    ></canvas>
  );
};

export default Rain;
