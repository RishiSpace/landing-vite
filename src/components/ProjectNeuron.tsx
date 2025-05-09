import React, { useState } from 'react';
import { Project } from '../data/projects';

interface ProjectNeuronProps {
  project: Project;
  x: number;
  y: number;
  index: number;
  isLineHovered?: boolean; // Added this prop
}

const ProjectNeuron: React.FC<ProjectNeuronProps> = ({ project, x, y, index, isLineHovered }) => { // Destructured isLineHovered
  const [isDirectlyHovered, setIsDirectlyHovered] = useState(false); // Renamed for clarity
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const showInfo = isDirectlyHovered || isLineHovered || isExpanded; // Updated logic

  return (
    <div 
      className={`neuron project-neuron ${isExpanded ? 'expanded' : ''}`}
      style={{ 
        right: x, 
        top: y,
        animationDelay: `${index * 0.1}s`
      }}
      onMouseEnter={() => setIsDirectlyHovered(true)} // Updated state setter
      onMouseLeave={() => setIsDirectlyHovered(false)} // Updated state setter
      onClick={handleClick}
    >
      <div className={`neuron-pulse ${showInfo ? 'hovered' : ''}`}></div> {/* Updated logic */}
      <div className={`neuron-info ${showInfo ? 'visible' : ''}`}> {/* Updated logic */}
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