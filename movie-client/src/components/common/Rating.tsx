import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

import './Rating.css';

type Props = {
  values: number[],
  className?: string
};

const Rating = ( { values, className }: Props ) => {
  const averageRating = (values.reduce((a:number, b:number) => a+b, 0 )/ values.length)/2;
  const rating = parseFloat(averageRating.toFixed(1));
  const numFullStars = Math.floor( rating );
  const numHalfStars = Math.round( rating ) - numFullStars;
  const numEmptyStars = 5 - ( numFullStars + numHalfStars );
  return (
    <span className={`rating ${className}`}>
      {
        Array.from( { length: numFullStars } ).map(
          (item, idx) => (
            <FontAwesomeIcon icon={faStar} key={idx} />
          )
        )
      }
      {
        Array.from( { length: numHalfStars } ).map(
          (item, idx) => (
            <FontAwesomeIcon icon={faStarHalfAlt} key={idx} />
          )
        )
      }
      {
        Array.from( { length: numEmptyStars } ).map(
          (item, idx) => (
            <FontAwesomeIcon icon={faStarEmpty} key={idx} />
          )
        )
      }
      <span className="ms-2">
        {rating}
      </span>
    </span> 
  );
};

Rating.defaultProps = {
  value: 0
}

export default Rating;