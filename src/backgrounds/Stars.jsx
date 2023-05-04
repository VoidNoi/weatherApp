import React, { useRef, useEffect } from 'react';

const Stars = () => {
  const starsRef = useRef(null);

  useEffect(() => {
    const starsCanvas = starsRef.current;

    const starsCtx = starsCanvas.getContext('2d');
    let starsId;

    let circles = [];

    const addCircle = () => {
      const circle = {
        x: Math.random() * starsCanvas.width,
        y: Math.random() * starsCanvas.height,
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
      starsCtx.beginPath();
      starsCtx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
      starsCtx.fillStyle = `rgba(255, 255, 255, ${circle.opacity})`;
      starsCtx.filter = 'blur(2px)';
      starsCtx.fill();
    };

    const updateCircles = () => {
      starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);

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

      starsId = requestAnimationFrame(updateCircles);
    };

    updateCircles();

    return () => {
      cancelAnimationFrame(starsId);
    };
  }, []);

  return (
    <canvas
      ref={starsRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default Stars;
