import React, { useRef, useEffect } from 'react';

const Lightning = ({ randomInt }) => {
  const lightningRef = useRef(null);

  useEffect(() => {
    const lightningCanvas = lightningRef.current;
    const lightningCtx = lightningCanvas.getContext('2d');
    let lightningId;

    let bolts = [];
    let lightTimeCurrent = 0;
    let lightTimeTotal = 0;

    const addBolt = () => {
      const x = randomInt(100, lightningCanvas.width - 100);
      const y = randomInt(0, lightningCanvas.height / 4);
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
      lightningCtx.strokeStyle = 'rgba(255, 255, 255,.1)';
      lightningCtx.lineWidth = 2;

      lightningCtx.beginPath();
      lightningCtx.moveTo(bolt.x, bolt.y);
      for (let i = 0; i < bolt.path.length; i++) {
        lightningCtx.lineTo(bolt.path[i].x, bolt.path[i].y);
      }
      lightningCtx.stroke();
    };

    const updateBolts = () => {
      lightningCtx.globalCompositeOperation = 'destination-out';

      lightningCtx.fillStyle = 'rgba(0,0,0,' + randomInt(1, 30) / 100 + ')';
      lightningCtx.fillRect(
        0,
        0,
        lightningCanvas.width,
        lightningCanvas.height
      );
      lightningCtx.globalCompositeOperation = 'source-over';

      lightTimeCurrent++;

      if (lightTimeCurrent >= lightTimeTotal) {
        addBolt();
        lightTimeCurrent = 0;
        lightTimeTotal = 200;
      }
      bolts.forEach((bolt, index) => {
        drawBolt(bolt, index);
      });

      lightningId = requestAnimationFrame(updateBolts);
    };
    updateBolts();
    return () => {
      cancelAnimationFrame(lightningId);
    };
  }, []);
  return (
    <canvas
      ref={lightningRef}
      width={window.innerWidth}
      height={window.innerHeight}
    ></canvas>
  );
};

export default Lightning;
