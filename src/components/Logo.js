import React from 'react';
import LogoImage from './Logo.png';

const Logo = ({ size = "normal", showText = true, className = "" }) => {
  const iconSize = size === "extra-large" ? "w-24 h-24" : size === "large" ? "w-12 h-12" : size === "small" ? "w-6 h-6" : "w-8 h-8";
  const textSize = size === "extra-large" ? "text-4xl" : size === "large" ? "text-3xl" : size === "small" ? "text-lg" : "text-xl";

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <img 
        src={LogoImage} 
        alt="TradeMate Logo" 
        className={`${iconSize} object-contain`}
      />
      {showText && (
        <span className={`font-bold text-primary ${textSize}`}>
          TradeMate
        </span>
      )}
    </div>
  );
};

export default Logo;
