import React from 'react';
import Navbar from '../navbar/Navbar';
import Hero from '../hero/Hero';
import Footer from '../footer/Footer';
import './home.css';
import Home_Dest from '../home_dest/Home_Dest';
import Home_Tmate from '../home_tmate/Home_Tmate';

const Home = () => {
  return (
    <div className='home-container'>
      <Navbar />
      <Hero />
      <Home_Dest />
      <Home_Tmate />
      <Footer />
    </div>
  );
}

export default Home;
