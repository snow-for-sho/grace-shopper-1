import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

export default function Review (props) {

  const review = props.review || [];

  return (
    <li>
      <div>
        <NavLink to={`/review/${review.id}`}>
          <h2>{ review.title }</h2>
        </NavLink>
      </div>
    </li>
  );
}
