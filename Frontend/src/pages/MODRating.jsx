import React from 'react';
import { HiStar } from 'react-icons/hi';

const MODRating = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.max(0, Math.min(totalStars, Math.floor(rating)));
  const emptyStars = totalStars - filledStars;

  return (
    <div className="flex items-center justify-center">
      {[...Array(filledStars)].map((_, index) => (
        <HiStar key={index} className="text-yellow-300 text-3xl" />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <HiStar key={index} className="text-gray-300 text-3xl" />
      ))}
    </div>
  );
};

export default MODRating;
