import React, { useRef, useEffect } from 'react';

const Stars = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext('2d');
    let requestId;

    let circles = [];

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
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${circle.opacity})`;
      ctx.filter = 'blur(2px)';
      ctx.fill();
    };

    const updateCircles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // add a new circle every 100ms
      if (Math.random() < 0.1) {
        addCircle();
      }

      // update all circles
      circles.forEach((circle, index) => {
        const circlesCopy = circles.slice();
        if (circle.opacity < 1 && circle.fadeInTime > 0) {
          circle.opacity += circle.fadeInSpeed;
          circle.fadeInTime -= 16.7;
        } else if (circle.maxOpacityTime > 0) {
          circle.maxOpacityTime -= 16.7;
        } else if (circle.opacity > 0 && circle.fadeOutTime > 0) {
          circle.opacity -= circle.fadeOutSpeed;
          circle.fadeOutTime -= 16.7;
        } else {
          setTimeout(() => {
            circlesCopy.splice(index, 1);
          }, 0);
          circles = circlesCopy;
        }
        drawCircle(circle);
      });

      requestId = requestAnimationFrame(updateCircles);
    };

    updateCircles();

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default Stars;
