import React, { useRef, useEffect } from 'react';

const Lightning = () => {
  const canvasRef = useRef(null);

  const randomInt = (min, max) => {
    return Math.random() * (max - min + 1) + min;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let requestId;

    let bolts = [];
    var lightTimeCurrent = 0;
    var lightTimeTotal = 0;

    const addBolt = () => {
      const x = randomInt(100, canvas.width - 100);
      const y = randomInt(0, canvas.height / 4);
      const branchNum = randomInt(1, 3);
      for (let i = 0; i < branchNum; i++) {
        const bolt = {
          x: x,
          y: y,
          xRange: randomInt(5, 30),
          yRange: randomInt(10, 25),
          path: [{ x: x, y: y }],
          pathLimit: randomInt(40, 55),
        };
        bolts.push(bolt);
      }
    };

    const drawBolt = (bolt, index) => {
      bolt.path.push({
        x:
          bolt.path[bolt.path.length - 1].x +
          (randomInt(0, bolt.xRange) - bolt.xRange / 2),
        y: bolt.path[bolt.path.length - 1].y + randomInt(0, bolt.yRange),
      });

      if (bolt.path.length > bolt.pathLimit) {
        bolts.splice(index, 1);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255,.1)';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(bolt.x, bolt.y);
      for (var i = 0; i < bolt.path.length; i++) {
        ctx.lineTo(bolt.path[i].x, bolt.path[i].y);
      }
      ctx.stroke();
    };

    const updateBolts = () => {
      ctx.globalCompositeOperation = 'destination-out';

      ctx.fillStyle = 'rgba(0,0,0,' + randomInt(1, 30) / 100 + ')';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';

      lightTimeCurrent++;

      if (lightTimeCurrent >= lightTimeTotal) {
        addBolt();
        lightTimeCurrent = 0;
        lightTimeTotal = 200;
      }
      bolts.forEach((bolt, index) => {
        drawBolt(bolt, index);
      });

      requestId = requestAnimationFrame(updateBolts);
    };
    updateBolts();
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

export default Lightning;
