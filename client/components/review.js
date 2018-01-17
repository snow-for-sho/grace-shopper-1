import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import ReactStars from 'react-stars'

export default function Review (props) {

  const review = props.review || [];
  return (
      <div>
        <NavLink to={`/reviews/${review.id}`}>
          <h5>Headline: { review.headline }</h5>
        </NavLink>
        <p>{ review.reviewText }</p>
        <h6>{renderStarRating( review.numberOfStars) }</h6>
        <h6>Recommend? { review.recommendation }</h6>
      </div>
  );
}

const renderStarRating = rating => (
  <ReactStars
  count={5}
  size={17}
  edit={false}
  color2={'#ffd700'}
  value={rating}/>
)
