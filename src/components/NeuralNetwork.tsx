import React, { useEffect, useRef, useState } from 'react';
import certificates, { Certificate } from '../data/certificates';
import projects, { Project } from '../data/projects';
import CertificateNeuron from './CertificateNeuron';
import ProjectNeuron from './ProjectNeuron';
import '../NeuralNetwork.css'; 

interface CenterPoint {
  x: number;
  y: number;
}

interface NeuronDataItem {
  x: number;
  y: number;
  title: string;
  id: string;
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
  const neuronHalfSize = 6; // Neurons are 12x12, so half is 6px
  const [hoveredLineInfo, setHoveredLineInfo] = useState<{ type: 'certificate' | 'project', id: string } | null>(null);
  const currentTimeRef = useRef(0);
  const localLeftNeuronsRef = useRef<NeuronDataItem[]>([]);
  const localRightNeuronsRef = useRef<NeuronDataItem[]>([]);
  const [showHelperText, setShowHelperText] = useState(false);
  const helperTextTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null); // Use ReturnType<typeof setTimeout> for better portability

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

    const leftCount = certificates.length;
    const rightCount = projects.length;
    const leftSpacing = windowDimensions.height / (leftCount + 1);
    const rightSpacing = windowDimensions.height / (rightCount + 1);

    const populatedLeftNeurons: NeuronDataItem[] = certificates.map((cert, i) => ({
      x: windowDimensions.width * 0.15,
      y: leftSpacing * (i + 1),
      title: cert.title,
      id: cert.id
    }));
    localLeftNeuronsRef.current = populatedLeftNeurons;

    const populatedRightNeurons: NeuronDataItem[] = projects.map((project, i) => ({
      x: windowDimensions.width * 0.85,
      y: rightSpacing * (i + 1),
      title: project.title,
      id: project.id
    }));
    localRightNeuronsRef.current = populatedRightNeurons;

    let animationFrameId: number;
    
    const drawConnection = (from: NeuronDataItem, to: { x: number; y: number }, t: number) => {
      const cpX = (from.x + to.x) / 2;
      const cpY = from.y - 80 + Math.sin(t + from.y) * 20;

      ctx.beginPath();
      ctx.moveTo(from.x, from.y); // Connect line to neuron's center
      ctx.quadraticCurveTo(cpX, cpY, to.x, to.y);

      const glow = 0.4 + 0.6 * Math.abs(Math.sin(t + from.y / 100));
      ctx.strokeStyle = `rgba(245, 197, 24, ${glow})`;
      ctx.lineWidth = 2;
      ctx.shadowColor = "#f5c518";
      ctx.shadowBlur = glow * 20;
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow before drawing text

      ctx.font = '14px Outfit'; // Ensure font is set before measureText
      ctx.fillStyle = `rgba(245, 197, 24, 0.6)`;
      
      const text = from.title;
      const textMetrics = ctx.measureText(text);
      const textWidth = textMetrics.width;
      
      const horizontalTextMargin = 20; // Horizontal offset from neuron center
      // neuronHalfSize (6) + approx font size (14) for baseline below neuron
      const verticalTextOffsetBelow = neuronHalfSize + 14; 
      const screenEdgePadding = 10; // Min padding from canvas edges

      let textXPosition: number;
      // Default y position (above neuron's center, as in original code)
      let textYPosition: number = from.y - 15; 
      
      const isLeftNeuron = from.x < to.x; // Assuming 'to.x' is the center dividing line

      if (isLeftNeuron) {
        // For left neurons, default text to the left
        const preferredTextX = from.x - horizontalTextMargin;
        // Check if text fits to the left
        if (preferredTextX - textWidth >= screenEdgePadding) {
          ctx.textAlign = 'right'; // Text aligns to the right of textXPosition
          textXPosition = preferredTextX;
          // textYPosition remains above (from.y - 15)
        } else {
          // Not enough space to the left, place below neuron
          ctx.textAlign = 'center';
          textXPosition = from.x;
          textYPosition = from.y + verticalTextOffsetBelow; // Baseline below neuron
        }
      } else { // Right neuron
        // For right neurons, default text to the right
        const preferredTextX = from.x + horizontalTextMargin;
        // Check if text fits to the right
        if (preferredTextX + textWidth <= canvas.width - screenEdgePadding) {
          ctx.textAlign = 'left'; // Text aligns to the left of textXPosition
          textXPosition = preferredTextX;
          // textYPosition remains above (from.y - 15)
        } else {
          // Not enough space to the right, place below neuron
          ctx.textAlign = 'center';
          textXPosition = from.x;
          textYPosition = from.y + verticalTextOffsetBelow; // Baseline below neuron
        }
      }
      
      ctx.fillText(text, textXPosition, textYPosition);
    };

    const animate = (time: number) => {
      currentTimeRef.current = time;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = time / 500;

      populatedLeftNeurons.forEach((neuron) => {
        drawConnection(neuron, centerPoint.current, t);
      });

      populatedRightNeurons.forEach((neuron) => {
        drawConnection(neuron, centerPoint.current, t + 1);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate(0);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [windowDimensions, certificates, projects]);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const mx = (event.clientX - rect.left) * scaleX;
        const my = (event.clientY - rect.top) * scaleY;

        let foundHovered: { type: 'certificate' | 'project', id: string } | null = null;
        const currentT = currentTimeRef.current / 500;

        const checkLinesHit = (
            neuronList: NeuronDataItem[],
            type: 'certificate' | 'project',
            timeOffset: number
        ) => {
            if (foundHovered) return; 
            for (const neuron of neuronList) {
                const from = neuron;
                const to = centerPoint.current;
                const tForCurve = currentT + timeOffset;
                const cpX = (from.x + to.x) / 2;
                const cpY = from.y - 80 + Math.sin(tForCurve + from.y) * 20;

                ctx.beginPath();
                ctx.moveTo(from.x, from.y);
                ctx.quadraticCurveTo(cpX, cpY, to.x, to.y);
                
                const originalLineWidth = ctx.lineWidth;
                ctx.lineWidth = 10; // Hit detection tolerance (10px wide)
                if (ctx.isPointInStroke(mx, my)) {
                    foundHovered = { type, id: neuron.id };
                    ctx.lineWidth = originalLineWidth;
                    return; 
                }
                ctx.lineWidth = originalLineWidth;
            }
        };
        
        checkLinesHit(localLeftNeuronsRef.current, 'certificate', 0);
        if (!foundHovered) {
            checkLinesHit(localRightNeuronsRef.current, 'project', 1);
        }
        
        setHoveredLineInfo(foundHovered);
    };

    const handleMouseLeave = () => {
        setHoveredLineInfo(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [canvasRef]); // Only depends on canvasRef, as other data is accessed via refs

  const handleMouseMoveForHelperText = () => {
    if (helperTextTimeoutRef.current) {
      clearTimeout(helperTextTimeoutRef.current);
    }
    setShowHelperText(true);
    helperTextTimeoutRef.current = setTimeout(() => {
      setShowHelperText(false);
    }, 1500);
  };

  useEffect(() => {
    // Clear timeout on component unmount
    return () => {
      if (helperTextTimeoutRef.current) {
        clearTimeout(helperTextTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="neural-network" onMouseMove={handleMouseMoveForHelperText}>
      <p 
        className={`helper-text ${showHelperText ? 'visible' : ''}`}
        style={{ 
          textAlign: 'center', 
          color: '#aaa', 
          marginBottom: '10px', 
          fontSize: '0.9em', 
          position: 'absolute', 
          top: '10px', 
          width: '100%', 
          zIndex: 10,
          // Opacity and transition will be handled by CSS
        }}
      >
        Hover over any of the neurons for description (Input Neurons are certificates and Output Neurons are my Projects)
      </p>
      <canvas ref={canvasRef} className="neural-canvas"></canvas>
      
      {certificates.map((cert, index) => {
        const neuronCenterX = windowDimensions.width * 0.15;
        const neuronCenterY = (windowDimensions.height / (certificates.length + 1)) * (index + 1);
        return (
          <CertificateNeuron 
            key={cert.id}
            certificate={cert}
            x={neuronCenterX - neuronHalfSize} // Position top-left for left: style
            y={neuronCenterY - neuronHalfSize} // Position top-left for top: style
            index={index}
            isLineHovered={hoveredLineInfo?.type === 'certificate' && hoveredLineInfo?.id === cert.id}
          />
        );
      })}
      
      {projects.map((project, index) => {
        const neuronCenterX = windowDimensions.width * 0.85; // Target center X for project neurons
        const neuronCenterY = (windowDimensions.height / (projects.length + 1)) * (index + 1);
        return (
          <ProjectNeuron
            key={project.id}
            project={project}
            // x prop for ProjectNeuron is used for 'style.right'
            // style.right = viewportWidth - (neuron_actual_right_edge_X_coord)
            // neuron_actual_right_edge_X_coord = neuronCenterX + neuronHalfSize
            x={windowDimensions.width - (neuronCenterX + neuronHalfSize)}
            y={neuronCenterY - neuronHalfSize} // Position top-left for top: style
            index={index}
            isLineHovered={hoveredLineInfo?.type === 'project' && hoveredLineInfo?.id === project.id}
          />
        );
      })}
    </div>
  );
};

export default NeuralNetwork;