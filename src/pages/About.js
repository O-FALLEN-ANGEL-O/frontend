import React from 'react';

const About = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>About Vitvara Technologies</h1>
          <p>Innovating since 2011</p>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Vitvara is a Bangalore-based startup company established in 2011. We were nurtured by a group of 
              entrepreneurs with a sole mission of establishing a dedicated Research & Development Cell to fertilize 
              the innovations of budding engineers.
            </p>
            <p>
              We specialize in software and educational services, having developed 1000+ engineering projects in 
              various fields including web design, software applications, mobile apps, electronics, IoT, AI, 
              robotics, mechanical, and mechatronics.
            </p>
            <p>
              Our branch in Mangalore represents a significant step forward, allowing us to serve a broader 
              community with our comprehensive software and educational solutions.
            </p>
          </div>
          
          <div className="about-image">
            <img 
              src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Team collaboration" 
            />
          </div>
        </div>
        
        <div className="mission-vision">
          <div className="mission">
            <h3>Our Mission</h3>
            <p>To provide innovative technology solutions that empower businesses and educational institutions to achieve their goals.</p>
          </div>
          <div className="vision">
            <h3>Our Vision</h3>
            <p>To be the leading technology partner for digital transformation and educational excellence in India.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;