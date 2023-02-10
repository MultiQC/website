import React from "react";

import HeroBackgroundSrc from "../images/background.png";

const Hero = ({ children }) => {
  return (
    <div className="relative bg-gray-800 text-white pt-32 pb-16 md:pb-24">
      <div className="absolute inset-0" style={{ backgroundImage: `url(${HeroBackgroundSrc})` }}></div>
      {children}
    </div>
  );
};

export default Hero;
