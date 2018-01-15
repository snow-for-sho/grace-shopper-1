import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';

export default function Category (props) {

  const category = props.category || [];

  return (
    <li>
      <div>
      {
        // Should have image to display for grid link
        // <a href="#">
        //   <img src={category.imageUrl} alt="image" />
        // </a>
      }
      </div>
      <div>
        <NavLink to={`/categories/${category.id}`}>
          <img src={category.photo} width='100' height='100'/>
          <h2>{ category.title }</h2>
        </NavLink>
      </div>
    </li>
  );
}
