import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faGraduationCap, faCogs, faUsers } from '@fortawesome/free-solid-svg-icons';

const FeaturesGrid = () => {
  const features = [
    {
      icon: faCode,
      title: "Software Development",
      description: "Custom web applications, mobile apps, and enterprise solutions tailored to your needs."
    },
    {
      icon: faGraduationCap,
      title: "Educational Support",
      description: "ATL lab setups, curriculum development, and educational technology solutions."
    },
    {
      icon: faCogs,
      title: "Technical Training",
      description: "Workshops on latest technologies including IoT, AI, robotics, and web development."
    },
    {
      icon: faUsers,
      title: "Consulting Services",
      description: "Business process optimization and digital transformation consulting."
    }
  ];

  return (
    <section className="features">
      <div className="container">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Comprehensive solutions for your business and educational needs</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;