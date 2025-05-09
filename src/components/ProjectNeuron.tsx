import React, { useState } from 'react';
import { Project } from '../data/projects';

interface ProjectNeuronProps {
  project: Project;
  x: number;
  y: number;
  index: number;
}

const ProjectNeuron: React.FC<ProjectNeuronProps> = ({ project, x, y, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`neuron project-neuron ${isExpanded ? 'expanded' : ''}`}
      style={{ 
        right: x, 
        top: y,
        animationDelay: `${index * 0.1}s`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className={`neuron-pulse ${isHovered || isExpanded ? 'hovered' : ''}`}></div>
      <div className={`neuron-info ${isHovered || isExpanded ? 'visible' : ''}`}>
        <p className="neuron-title">{project.title}</p>
        <div className={`neuron-description ${isExpanded ? 'fade-in' : ''}`}>
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