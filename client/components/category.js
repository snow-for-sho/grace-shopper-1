import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Category (props) {

  const category = props.category || [];

  return (
    <div>
      <div>
      {
        // Should have image to display for grid link
        // <a href="#">
        //   <img src={category.imageUrl} alt="image" />
        // </a>
      }
      </div>
      <div 
        className="card card-raised card-background" 
        style={{ backgroundImage: `url(${category.photo})`, height: '400px', width: '400px' }}
        >
        <div className="card-content">
          <Link to={`/categories/${category.id}`}>
            <h3 className="card-title">{ category.title }</h3>
          </Link>
          <Link className="btn btn-primary btn-raised" to={`/categories/${category.id}`}>
            View All
          </Link>
        </div>
      </div>
    </div>
  );
}
