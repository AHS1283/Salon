import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import FeaturesBar from "./components/FeaturesBar.jsx";

import Team from "./components/Team.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Booking from "./components/Booking.jsx";
import Footer from "./components/Footer.jsx";
import OurLocations from "./components/OurLocations.jsx";
import OurWork from "./components/OurWork.jsx";
import WorksGallery from "./components/WorksGallery.jsx";
import ServicesGallery from "./components/ServicesGallery.jsx";
import InstagramReels from "./components/InstagramReels.jsx";

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <FeaturesBar />
      <OurWork />
      <OurLocations />
      
      <InstagramReels />
      <Team />
      <Testimonials />
      <Booking />
    </>
  );
}

export default function App() {
  return (
    <div className="lumiere">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/our-work" element={<WorksGallery />} />
        <Route path="/services" element={<ServicesGallery />} />
      </Routes>

      <Footer />
    </div>
  );
}
