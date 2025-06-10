import React, { useState, useEffect, useRef } from 'react';
import { Certificate } from '../data/certificates';

interface CertificateNeuronProps {
  certificate: Certificate;
  x: number;
  y: number;
  index: number;
  isLineHovered?: boolean;
}

const CertificateNeuron: React.FC<CertificateNeuronProps> = ({ certificate, x, y, index, isLineHovered }) => {
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
      className="neuron certificate-neuron"
      style={{ 
        left: x, 
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
          {certificate.title}
        </p>
        {certificate.issuer && <p className="neuron-issuer">{certificate.issuer}</p>}
        {certificate.date && <p className="neuron-date">{certificate.date}</p>}
      </div>
    </div>
  );
};

export default CertificateNeuron;