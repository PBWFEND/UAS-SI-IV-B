import React from 'react';
import Hero from '../components/home/Hero';
import Category from '../components/home/Category';
import PopularSpot from '../components/home/PopularSpot';
import HiddenGems from '../components/home/HiddenGems';
import Tips from '../components/home/Tips';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Category />
      <PopularSpot />
      <HiddenGems />
      <Tips />
    </div>
  );
};

export default Home;