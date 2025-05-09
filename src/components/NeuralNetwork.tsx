import React, { useEffect, useRef, useState } from 'react';
import certificates from '../data/certificates';
import projects from '../data/projects';
import CertificateNeuron from './CertificateNeuron';
import ProjectNeuron from './ProjectNeuron';

interface CenterPoint {
  x: number;
  y: number;
}

const NeuralNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const centerPoint = useRef<CenterPoint>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      centerPoint.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      };
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = windowDimensions.width;
    canvas.height = windowDimensions.height;

    const leftNeurons: { x: number; y: number; title: string }[] = [];
    const rightNeurons: { x: number; y: number; title: string }[] = [];

    const leftCount = certificates.length;
    const rightCount = projects.length;
    const leftSpacing = windowDimensions.height / (leftCount + 1);
    const rightSpacing = windowDimensions.height / (rightCount + 1);

    for (let i = 0; i < leftCount; i++) {
      leftNeurons.push({
        x: windowDimensions.width * 0.15,
        y: leftSpacing * (i + 1),
        title: certificates[i].title
      });
    }

    for (let i = 0; i < rightCount; i++) {
      rightNeurons.push({
        x: windowDimensions.width * 0.85,
        y: rightSpacing * (i + 1),
        title: projects[i].title
      });
    }

    let animationFrameId: number;
    
    const drawConnection = (from: { x: number; y: number; title: string }, to: { x: number; y: number }, t: number) => {
      const cpX = (from.x + to.x) / 2;
      const cpY = from.y - 80 + Math.sin(t + from.y) * 20;

      ctx.beginPath();
      ctx.moveTo(from.x, from.y - 6);
      ctx.quadraticCurveTo(cpX, cpY, to.x, to.y);

      const glow = 0.4 + 0.6 * Math.abs(Math.sin(t + from.y / 100));
      ctx.strokeStyle = `rgba(245, 197, 24, ${glow})`;
      ctx.lineWidth = 2;
      ctx.shadowColor = "#f5c518";
      ctx.shadowBlur = glow * 20;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.font = '14px Outfit';
      ctx.fillStyle = `rgba(245, 197, 24, 0.6)`;
      ctx.textAlign = from.x < to.x ? 'left' : 'right';
      ctx.fillText(from.title, from.x < to.x ? from.x + 20 : from.x - 20, from.y - 15);
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = time / 500;

      leftNeurons.forEach((neuron) => {
        drawConnection(neuron, centerPoint.current, t);
      });

      rightNeurons.forEach((neuron) => {
        drawConnection(neuron, centerPoint.current, t + 1);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate(0);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [windowDimensions]);

  return (
    <div className="neural-network">
      <canvas ref={canvasRef} className="neural-canvas"></canvas>
      
      {certificates.map((cert, index) => {
        const y = (windowDimensions.height / (certificates.length + 1)) * (index + 1);
        return (
          <CertificateNeuron 
            key={cert.id}
            certificate={cert}
            x={windowDimensions.width * 0.15}
            y={y}
            index={index}
          />
        );
      })}
      
      {projects.map((project, index) => {
        const y = (windowDimensions.height / (projects.length + 1)) * (index + 1);
        return (
          <ProjectNeuron
            key={project.id}
            project={project}
            x={windowDimensions.width * 0.85}
            y={y}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default NeuralNetwork;