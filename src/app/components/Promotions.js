// components/Promotions.js
"use client"; // Ensure it's a client-side component

import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Image from "next/image";
import Slider from "react-slick"; // Import Slider from react-slick

import "slick-carousel/slick/slick.css"; // Import slick styles
import "slick-carousel/slick/slick-theme.css"; // Import slick theme

export default function Promotions({ promotions = [] }) {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);

  // Ensure the promotions array is not empty or undefined
  if (!promotions.length) {
    return null; // Return nothing if promotions array is empty
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show two slides at a time
    slidesToScroll: 2, // Scroll two slides per swipe
    autoplay: true,
    autoplaySpeed: 2000, // Change every 2 seconds
    arrows: true, // Show arrows
    responsive: [
      {
        breakpoint: 768, // Below 768px screen width
        settings: {
          slidesToShow: 1, // Show one slide
          slidesToScroll: 1, // Scroll one slide
        },
      },
    ],
  };

  return (
    <div className="w-full mt-6"> {/* Full width container with some margin on top */}
      <Slider {...settings}>
        {promotions.map((promo, index) => (
          <div key={index} className="px-2"> {/* Horizontal padding for spacing */}
            <Card className=" bg-green-900 relative w-200 h-48 rounded-2xl overflow-hidden flex transform hover:scale-105 transition-transform duration-300">
              {/* Left Half: Image */}
              <div className=" bg-green-900 w-1/2 h-full relative">
                <Image
                  src={promo.imageSrc}
                  alt={promo.title}
                  layout="fill"
                  objectFit="fill" // Ensure the image fits within the container without being cut off
                  quality={100}
                  priority={true}
                  className="rounded-l-lg"
                />
              </div>
              {/* Right Half: Text and Button */}
              <div className="w-1/2 h-full flex flex-col justify-center p-3 bg-green-900 text-white">
                <h3 className="text-lg font-bold mb-1">{promo.title}</h3>
                <p className="text-sm mb-2">{promo.description}</p>
                <button className="rounded-xl mt-5 px-3 py-1 transition-all duration-150 bg-white text-black hover:bg-gray-100 rounded-md">
                  {promo.buttonText}
                </button>
              </div>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}
