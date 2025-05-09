import React, { useState } from 'react';
import { Certificate } from '../data/certificates';

interface CertificateNeuronProps {
  certificate: Certificate;
  x: number;
  y: number;
  index: number;
}

const CertificateNeuron: React.FC<CertificateNeuronProps> = ({ certificate, x, y, index }) => {
  const [isHovered, setIsHovered] = useState(false);

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
      <div className={`neuron-pulse ${isHovered ? 'hovered' : ''}`}></div>
      <div className={`neuron-info ${isHovered ? 'visible' : ''}`}>
        <p className="neuron-title">{certificate.title}</p>
        {certificate.issuer && <p className="neuron-issuer">{certificate.issuer}</p>}
        {certificate.date && <p className="neuron-date">{certificate.date}</p>}
      </div>
    </div>
  );
};

export default CertificateNeuron;