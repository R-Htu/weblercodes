import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";

type Particle = {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  color: string;
};

function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    const particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const { clientWidth, clientHeight } = canvas;

      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); 
      ctx.clearRect(0, 0, clientWidth, clientHeight);
    };


    resize();
    window.addEventListener("resize", resize);

    const width = () => canvas.clientWidth;
    const height = () => canvas.clientHeight;

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width(),
        y: Math.random() * height(),
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.6,
        dy: (Math.random() - 0.5) * 0.6,
        color: `hsla(${Math.random() * 360}, 100%, 70%, 0.8)`,
      });
    }

    const animate = () => {
      const w = width();
      const h = height();

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
   
        p.x += p.dx;
        p.y += p.dy;

     
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;

     
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <footer className="wb-home-footer">
      <canvas
        ref={canvasRef}
        className="footer-particles"
        style={{ display: "block", width: "100%", height: "160px" }}
      />
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/Contact">Contact</Link>
        <Link to="/Terms-of-use">Terms of Use</Link>
      </div>
      <div className="wb-made-by">
        Made with <FaHeart className="red-heart" /> by <b>Webler</b>
      </div>
    </footer>
  );
}

export default Footer;