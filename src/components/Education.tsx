import React from 'react';

const Education: React.FC = () => {
  return (
    <section className="section" id="education">
      <div className="container">
        <h2>Academic History</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>Trinity International School</h3>
            <p>2007 - 2019</p>
          </div>
          <div className="timeline-item">
            <h3>Pace Jr Science College</h3>
            <p>2019 - 2021</p>
          </div>
          <div className="timeline-item">
            <h3>KJ Somaiya Institute of Technology</h3>
            <p>2021 - Present</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;