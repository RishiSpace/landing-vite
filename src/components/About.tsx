import React from 'react';

const About: React.FC = () => {
  return (
    <section className="section" id="about">
      <div className="about-container">
        <div className="about-content">
          <h2>About Me</h2>
          <p className="about-text">
            Hello there! I am Rishikesh, a passionate engineering student with a deep interest in Artificial Intelligence, 
            Machine Learning, Networking, and Operating Systems. Driven by curiosity and a love for creative problem-solving, 
            I constantly explore how complex digital systems communicate, evolve, and function beneath the surface. 
            My academic journey blends hands-on technical learning with a mindset geared toward innovation, 
            allowing me to build intelligent systems and understand the inner workings of modern computing 
            from both hardware and software perspectives.
          </p>
        </div>
        <div className="about-image">
          <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" alt="Profile" className="profile-image" />
        </div>
      </div>
    </section>
  );
};

export default About;