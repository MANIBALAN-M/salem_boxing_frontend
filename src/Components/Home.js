import React from 'react';
import Hero from './Hero';
import About from './About';
import WhyChooseUs from './WhyChooseUs';
import UpcomingMatches from './UpcomingMatches';
import Achievements from './Achievements';
import Programs from './Programs';
import Schedule from './Schedule';
import BmiCalculator from './BmiCalculator';
import Trainers from './Trainers';
import Pricing from './Pricing';
import Gallery from './Gallery';
import CallToAction from './CallToAction';
import JoinUs from './JoinUs';
import Contact from './Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <div id="why-us">
        <WhyChooseUs />
      </div>
      <UpcomingMatches />
      <Achievements />
      <Programs />
      <Schedule />
      <BmiCalculator />
      <Trainers />
      <Pricing />
      <Gallery />
      <CallToAction />
      <JoinUs />
      <Contact />
    </>
  );
};

export default Home;
