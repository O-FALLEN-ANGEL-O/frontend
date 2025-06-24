import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLaptopCode, 
  faMobile, 
  faCloud, 
  faRobot, 
  faGraduationCap, 
  faChalkboardTeacher 
} from '@fortawesome/free-solid-svg-icons';

const Services = () => {
  const services = [
    {
      icon: faLaptopCode,
      title: "Web Development",
      description: "Custom websites and web applications using modern technologies",
      features: ["Responsive Design", "E-commerce Solutions", "CMS Development", "API Integration"]
    },
    {
      icon: faMobile,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications",
      features: ["iOS Development", "Android Development", "React Native", "Flutter"]
    },
    {
      icon: faCloud,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment services",
      features: ["AWS Services", "Azure Solutions", "DevOps", "Microservices"]
    },
    {
      icon: faRobot,
      title: "IoT & AI Solutions",
      description: "Internet of Things and Artificial Intelligence implementations",
      features: ["Smart Devices", "Machine Learning", "Data Analytics", "Automation"]
    },
    {
      icon: faGraduationCap,
      title: "Educational Support",
      description: "Comprehensive educational technology solutions",
      features: ["ATL Lab Setup", "Curriculum Development", "Learning Management", "Digital Content"]
    },
    {
      icon: faChalkboardTeacher,
      title: "Training & Workshops",
      description: "Professional development and skill enhancement programs",
      features: ["Technical Training", "Corporate Workshops", "Certification Programs", "Mentorship"]
    }
  ];

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Our Services</h1>
          <p>Comprehensive technology solutions for your business needs</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={service.icon} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button className="btn btn-outline">Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;