import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

export default function Review (props) {

  const review = props.review || [];
  return (
    <li>
      <div>
        <NavLink to={`/reviews/${review.id}`}>
          <h2>Headline: { review.headline }</h2>
        </NavLink>
        <h4>{ review.reviewText }</h4>
        <h4>Stars: { review.numberOfStars }</h4>
        <h4>Recommend? { review.recommendation }</h4>
      </div>
    </li>
  );
}
