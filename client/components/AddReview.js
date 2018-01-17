import React from 'react';
import ReactStars from 'react-stars';
import {addToCart, postReview, setStarRating,fetchProducts } from '../store';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

function AddReview (props) {
    const prodId = props.productId;
    return (
        <form onSubmit={props.addReview}>
            <input type="hidden" name="prodId" value={prodId} />
            <table>
            
                <tbody>
                    <tr><td colSpan='4' align="center">Leave a review</td></tr>
                    <tr> 
                        <td><ReactStars
                                count={5}
                                size={17}
                                color2={'#ffd700'} 
                                half={false}
                                value={props.numberOfStars}
                                onChange={newRating => props.setStarRating( newRating)}
                        /></td>
                        
                        <td><input type="text" name="review" size="120" placeholder="Write your review here"/></td>
                        <td><input type="checkbox" name="recommend" defaultChecked/>Recommend to a friend</td>
                        <td><button type="submit">Add Review </button></td>
                    </tr>
                </tbody>
            </table>
    </form>
    )
}

const mapState = state => {
    return {
    numberOfStars: state.review.numberOfStars
}}

const mapDispatch = (dispatch, ownProps) => ({
    addReview: (reviewInfo) => dispatch(postReview (reviewInfo, ownProps.history)),
    setStarRating: (rating) => dispatch(setStarRating(rating))
})

const merge = (state, actions, ownProps) => {
    return {
      ...state,
      ...actions,
      ...ownProps,
      addReview: (e) => {
        e.preventDefault();
        const reviewInfo = {
          reviewText: e.target.review.value,
          numberOfStars: +state.numberOfStars,
          recommendation: e.target.recommend.value,
          productId: +e.target.prodId.value
        };
        actions.addReview(reviewInfo);
      }
    }
  }

  export default withRouter (connect (mapState, mapDispatch, merge)(AddReview));