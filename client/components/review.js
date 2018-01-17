import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import ReactStars from 'react-stars'

export default function Review (props) {

  const review = props.review || [];
  return (
      <div>
<<<<<<< HEAD
        <NavLink to={`/reviews/${review.id}`}>
          <h5>Headline: { review.headline }</h5>
        </NavLink>
        <p>{ review.reviewText }</p>
        <h6>Stars: { review.numberOfStars }</h6>
        <h6>Recommend? { review.recommendation }</h6>
=======
        <h4>Headline: { review.headline }</h4>
        {renderStarRating(review.numberOfStars)}
        <h5>{ review.reviewText }</h5>
        <h5>Recommend? { review.recommendation?'Yes':'No' }</h5>
>>>>>>> master
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
