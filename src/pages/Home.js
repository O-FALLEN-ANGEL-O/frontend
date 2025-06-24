import React from 'react';
import Hero from '../components/Hero';
import FeaturesGrid from '../components/FeaturesGrid';
import StatsSection from '../components/StatsSection';

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <FeaturesGrid />
      <StatsSection />
    </div>
  );
};

export default Home;