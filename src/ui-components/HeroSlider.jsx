import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HeroSlider = () => {
  return (
    <Carousel autoPlay infiniteLoop showThumbs={false}>
      <div>
        <img src="/src/app-assets/images/slide1.jpg" alt="Slide 1" />
        <p className="legend">Find your dream home with HomeNest</p>
      </div>
      <div>
        <img src="/src/app-assets/images/slide2.jpg" alt="Slide 2" />
        <p className="legend">Post your property easily</p>
      </div>
      <div>
        <img src="/src/app-assets/images/slide3.jpg" alt="Slide 3" />
        <p className="legend">Search, filter, and discover</p>
      </div>
    </Carousel>
  );
};

export default HeroSlider;
