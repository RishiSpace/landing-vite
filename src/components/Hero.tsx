import React from 'react';
import NeuralNetwork from './NeuralNetwork';
import { Github, Linkedin, FileText } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="hero" id="home">
      <NeuralNetwork />
      
      <div className="hero-center-node">
        <div className="oval-node">
          <h1>Rishikesh Giridhar</h1>
          <p>Engineering Student | AI/ML Enthusiast</p>
          <div className="social-links">
            <a href="https://rishisp.me/r/linkedin" target="_blank" rel="noopener noreferrer">
              <Linkedin size={24} />
            </a>
            <a href="https://github.com/RishiSpace" target="_blank" rel="noopener noreferrer">
              <Github size={24} />
            </a>
            <a href="media/Resume-Rishikesh-Giridhar.pdf" target="_blank" rel="noopener noreferrer">
              <FileText size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;