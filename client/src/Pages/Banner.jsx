import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import b1 from "../assets/b1.jpg";
import b2 from "../assets/b2.jpg";
import b3 from "../assets/b3.jpg";

const Banner = ({ setPage }) => {
  return (
    <div className="relative">

      <Carousel
        autoPlay
        infiniteLoop
        interval={4000}
        showThumbs={false}
        showStatus={false}
        swipeable
        showIndicators={true}
      >

        {[b1, b2, b3].map((img, i) => (
          <div key={i} className="relative">

            {/* 🖼 Image */}
            <img
              src={img}
              alt="banner"
              className="w-full h-[350px] sm:h-[350px] md:h-[450px] lg:h-[550px] object-cover"
            />

            {/* 🔥 Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/90"></div>

            {/* 💎 Glass Content */}
            <div className="absolute inset-0 flex items-center justify-center px-4">

              <div className="backdrop-blur-xl bg-white/5 border border-white/10 
              rounded-2xl p-6 md:p-10 text-center text-white max-w-2xl">

                <h1 className="text-2xl md:text-4xl font-bold mb-3 
                bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Contact Management System
                </h1>

                <p className="text-gray-300 text-sm md:text-base mb-5">
                  Manage your contacts efficiently with a modern, clean and powerful dashboard UI.
                </p>

                {/* ⚡ Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">

                  <button
                    onClick={() => setPage("All Contact")}
                    className="px-6 py-3 rounded-lg font-semibold 
                    bg-gradient-to-r from-cyan-500 to-blue-500
                    hover:scale-105 active:scale-95 transition shadow-lg"
                  >
                    View Contacts
                  </button>

                  <button
                    onClick={() => setPage("Add Contact")}
                    className="px-6 py-3 rounded-lg font-semibold 
                    bg-white/10 hover:bg-white/20 border border-white/10 transition"
                  >
                    Add Contact
                  </button>

                </div>

              </div>
            </div>

          </div>
        ))}

      </Carousel>
    </div>
  );
};

export default Banner;