// src/ui-components/HeroSlider.jsx
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
      title: "Find Your Dream Home",
      description: "Explore thousands of verified properties across the country",
      cta: "Browse Properties",
      link: "/all-properties"
    },
    {
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200",
      title: "List Your Property Today",
      description: "Reach millions of potential buyers and renters instantly",
      cta: "Add Property",
      link: "/add-property"
    },
    {
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      title: "Trusted by Thousands",
      description: "Join our growing community of satisfied property owners",
      cta: "Get Started",
      link: "/register"
    }
  ];

  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        transitionTime={700}
        swipeable
        emulateTouch
        className="hero-slider"
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[500px] md:h-[600px] lg:h-[700px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${slide.image}')`,
              }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 z-10">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-center slide-in-left drop-shadow-2xl">
                {slide.title}
              </h1>
              <p className="text-lg md:text-2xl mb-8 text-center max-w-3xl fade-in drop-shadow-lg">
                {slide.description}
              </p>
              <Link
                to={slide.link}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-lg font-semibold hover:scale-110 transition-transform shadow-2xl btn-animate"
              >
                {slide.cta} →
              </Link>
            </div>

            <div className="absolute bottom-10 left-10 hidden md:block">
              <div className="w-20 h-20 bg-blue-500 rounded-full opacity-30 animate-pulse"></div>
            </div>
            <div className="absolute top-20 right-20 hidden lg:block">
              <div className="w-32 h-32 bg-purple-500 rounded-full opacity-20 animate-bounce"></div>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="fade-in">
            <h3 className="text-4xl font-bold mb-2">10K+</h3>
            <p className="text-sm md:text-base">Properties Listed</p>
          </div>
          <div className="fade-in">
            <h3 className="text-4xl font-bold mb-2">5K+</h3>
            <p className="text-sm md:text-base">Happy Customers</p>
          </div>
          <div className="fade-in">
            <h3 className="text-4xl font-bold mb-2">50+</h3>
            <p className="text-sm md:text-base">Cities Covered</p>
          </div>
          <div className="fade-in">
            <h3 className="text-4xl font-bold mb-2">98%</h3>
            <p className="text-sm md:text-base">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

 export default HeroSlider;