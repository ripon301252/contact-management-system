import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import b1 from "../assets/b1.jpg";
import b2 from "../assets/b2.jpg";
import b3 from "../assets/b3.jpg";

const Banner = () => {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        showThumbs={false}
        showStatus={false}
        swipeable
        showIndicators={true}
      >
        <div>
          <img
            src={b1}
            alt="banner1"
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] object-cover"
          />
        </div>

        <div>
          <img
            src={b2}
            alt="banner2"
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] object-cover"
          />
        </div>

        <div>
          <img
            src={b3}
            alt="banner3"
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] object-cover"
          />
        </div>
      </Carousel>

      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black-500/50 to-transparent"></div>
    </div>
  );
};

export default Banner;