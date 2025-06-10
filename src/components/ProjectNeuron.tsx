import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../data/projects';

interface ProjectNeuronProps {
  project: Project;
  x: number;
  y: number;
  index: number;
  isLineHovered?: boolean;
}

const ProjectNeuron: React.FC<ProjectNeuronProps> = ({ project, x, y, index, isLineHovered }) => { 
  const [isHovered, setIsHovered] = useState(false);
  const showInfo = isHovered || isLineHovered;
  const infoRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    if (showInfo && infoRef.current) {
      const rect = infoRef.current.getBoundingClientRect();
      const overflow = rect.bottom - window.innerHeight;
      if (overflow > 0) {
        // Increase a little extra (10px) for padding from the viewport edge.
        setTranslateY(overflow + 10);
      } else {
        setTranslateY(0);
      }
    }
  }, [showInfo, x, y]);

  return (
    <div 
      className={`neuron project-neuron`}
      style={{ 
        right: x, 
        top: y,
        animationDelay: `${index * 0.1}s`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`neuron-pulse ${showInfo ? 'hovered' : ''}`}></div>
      <div 
        ref={infoRef}
        className={`neuron-info ${showInfo ? 'visible' : ''}`}
        style={translateY ? { transform: `translateY(-${translateY}px)` } : undefined}
      >
        <p 
          className="neuron-title"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {project.title}
        </p>
        <div className="neuron-description fade-in">
          <p>{project.description}</p>
          {project.technologies && (
            <div className="neuron-technologies">
              {project.technologies.map((tech, i) => (
                <span key={i} className="neuron-tech">{tech}</span>
              ))}
            </div>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="neuron-link">
              View Project
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectNeuron;