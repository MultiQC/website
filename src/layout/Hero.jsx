import React from "react";

import HeroBackgroundSrc from "../images/background.png";

const Hero = ({ children }) => {
  return (
    <div className="relative bg-gray-800 pb-16 pt-28 text-white md:pb-20">
      <div className="absolute inset-0" style={{ backgroundImage: `url(${HeroBackgroundSrc})` }}></div>
      {children}
    </div>
  );
};

export default Hero;
