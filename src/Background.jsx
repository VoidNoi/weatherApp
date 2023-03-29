import React, { useRef, useEffect } from 'react';

const Background = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;

    ctx.canvas.width = width;
    ctx.canvas.height = height;
    ctx.fillStyle = '#FFFFFF';
    // let alpha = 1;
    // const randomWidth = getRandomInt(width);
    // const randomHeight = getRandomInt(height);
    // const drawStar = () => {
    // let speed = 0.1;
    // setTimeout(() => {
    //   alpha -= speed;
    //   if (alpha <= 0 || alpha >= 1) {
    //     speed = -speed;
    //   }
    // }, 2000);
    // ctx.clearRect(0, 0, width, height);
    // ctx.globalAlpha = alpha;
    // ctx.filter = 'blur(2px)';
    //   ctx.beginPath();
    //   ctx.arc(randomWidth, randomHeight, 2, 0, 2 * Math.PI);
    //   ctx.closePath();
    //   ctx.fill();
    // animationRef.current = requestAnimationFrame(drawStar);
    // };
    class Star {
      constructor(data) {
        this.data = data;
        // this.alpha = 1;
      }
      draw() {
        let speed = 0.1;
        setTimeout(() => {
          this.data.alpha -= speed;
          if (this.data.alpha <= 0) {
            this.data.alpha = 0;
            // speed = -speed;
          }
        }, getRandomInt(5000));
        ctx.globalAlpha = this.data.alpha;
        ctx.filter = 'blur(2px)';
        ctx.beginPath();
        ctx.arc(this.data.width, this.data.height, 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.fill();
      }
    }

    let stars = [];
    stars.push(
      new Star({
        width: getRandomInt(width),
        height: getRandomInt(height),
        alpha: 1,
      })
    );
    setInterval(() => {
      if (stars.length < 20) {
        stars.push(
          new Star({
            width: getRandomInt(width),
            height: getRandomInt(height),
            alpha: 1,
          })
        );
      }
      console.log(stars);
    }, 1000);
    // if (stars[0].data.alpha <= 0) {
    //   stars.shift();
    // }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);
      stars.forEach((item, index) => {
        item.draw();
        if (item.data.alpha <= 0) {
          stars.splice(index, 1);
        }
      });
    }
    animate();
    // animationRef.current = requestAnimationFrame(drawStar);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div>
      <div className='lightBackground'></div>
      <div className='darkBackground'></div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Background;
