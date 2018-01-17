import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

export default function Review (props) {

  const review = props.review || [];
  console.log("single review log: ")
  return (
    <li>
      <div>
        <NavLink to={`/reviews/${review.id}`}>
          <h5>Headline: { review.headline }</h5>
        </NavLink>
        <p>{ review.reviewText }</p>
        <h6>Stars: { review.numberOfStars }</h6>
        <h6>Recommend? { review.recommendation }</h6>
      </div>
    </li>
  );
}
