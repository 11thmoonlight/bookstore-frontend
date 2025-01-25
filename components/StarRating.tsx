import React from "react";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const renderStars = () => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoStar key={`full-${i}`} className="text-amber-600" />);
    }

    if (hasHalfStar) {
      stars.push(<IoStarHalf key="half" className="text-amber-600" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <IoStarOutline key={`empty-${i}`} className="text-amber-600" />
      );
    }

    return stars;
  };

  return <div className="flex">{renderStars()}</div>;
};

export default StarRating;
