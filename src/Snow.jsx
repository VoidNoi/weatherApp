import React, { useRef, useEffect } from 'react';

const Snow = ({ randomInt }) => {
  const snowRef = useRef(null);

  useEffect(() => {
    const snowCanvas = snowRef.current;
    const snowCtx = snowCanvas.getContext('2d');
    let snowId;

    let flakes = [];

    const addFlake = () => {
      const flake = {
        x: Math.random() * snowCanvas.width,
        y: 0,
        size: randomInt(1, 2),
        speed: randomInt(2, 3),
      };
      flakes.push(flake);
    };
    const drawFlake = (flake) => {
      const { x, y, size } = flake;

      snowCtx.beginPath();
      snowCtx.arc(x, y, size, 0, 2 * Math.PI);
      snowCtx.fillStyle = `rgba(255, 255, 255, 0.5)`;
      //   snowCtx.filter = 'blur(1px)';
      snowCtx.fill();
    };

    const updateFlakes = () => {
      snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
      addFlake();
      flakes.forEach((flake, index) => {
        if (flake.y < snowCanvas.height) {
          flake.y += flake.speed;
        } else {
          flakes.splice(index, 1);
        }
        drawFlake(flake);
      });
      snowId = requestAnimationFrame(updateFlakes);
    };
    updateFlakes();

    return () => {
      cancelAnimationFrame(snowId);
    };
  }, []);

  return (
    <canvas
      ref={snowRef}
      width={window.innerWidth}
      height={window.innerHeight}
    ></canvas>
  );
};

export default Snow;
