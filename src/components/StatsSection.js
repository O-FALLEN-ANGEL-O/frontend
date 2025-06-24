import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: "1000+", label: "Projects Completed" },
    { number: "200+", label: "Educational Institutions" },
    { number: "500+", label: "Students Trained" },
    { number: "50+", label: "Corporate Clients" }
  ];

  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;