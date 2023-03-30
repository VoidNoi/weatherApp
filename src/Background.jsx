import React, { useRef, useEffect } from 'react';

const Background = () => {
  const canvasRef = useRef(null);
  const bufferRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const bufferCanvas = bufferRef.current;
    const ctx = canvas.getContext('2d');
    const bufferCtx = bufferCanvas.getContext('2d');
    let requestId;

    const circles = [];

    const addCircle = () => {
      const circle = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        opacity: 0,
        fadeInTime: Math.random() * 5000,
        maxOpacityTime: Math.random() * 5000,
        fadeOutTime: Math.random() * 5000,
        fadeInSpeed: Math.random() * 0.01 + 0.01,
        fadeOutSpeed: Math.random() * 0.01 + 0.01,
        size: 2,
      };
      const overlap = circles.some(
        (c) => Math.hypot(circle.x - c.x, circle.y - c.y) < c.size + circle.size
      );
      if (!overlap) {
        circles.push(circle);
      }
    };

    const drawCircle = (circle) => {
      bufferCtx.beginPath();
      bufferCtx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
      bufferCtx.fillStyle = `rgba(255, 255, 255, ${circle.opacity})`;
      bufferCtx.filter = 'blur(2px)';
      bufferCtx.shadowColor = 'white';
      bufferCtx.fill();
    };

    const updateCircles = () => {
      bufferCtx.clearRect(0, 0, canvas.width, canvas.height);

      // add a new circle every 100ms
      if (Math.random() < 0.1) {
        addCircle();
      }

      // update all circles
      circles.forEach((circle) => {
        if (circle.opacity < 1 && circle.fadeInTime > 0) {
          circle.opacity += circle.fadeInSpeed;
          circle.fadeInTime -= 16.7;
        } else if (circle.maxOpacityTime > 0) {
          circle.maxOpacityTime -= 16.7;
        } else if (circle.opacity > 0 && circle.fadeOutTime > 0) {
          circle.opacity -= circle.fadeOutSpeed;
          circle.fadeOutTime -= 16.7;
        } else {
          const index = circles.indexOf(circle);
          circles.splice(index, 1);
        }
        drawCircle(circle);
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bufferCanvas, 0, 0);
      requestId = requestAnimationFrame(updateCircles);
    };

    bufferCanvas.width = canvas.width;
    bufferCanvas.height = canvas.height;
    bufferCtx.imageSmoothingEnabled = true;

    canvas.style.transform = 'translateZ(0)';

    updateCircles();

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <div>
      <div className='lightBackground'></div>
      <div className='darkBackground'></div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <canvas
        ref={bufferRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  );
};

export default Background;
