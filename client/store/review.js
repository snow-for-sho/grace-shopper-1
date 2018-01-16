import axios from 'axios';
const ADD_REVIEW = 'ADD_REVIEW';
const SET_STAR_RATING = 'SET_STAR_RATING';
import store, {addReviewToProduct, fetchProducts} from './index';

export function addReview (review) {
    return {type: ADD_REVIEW, review}
}

export const postReview = (reviewInfo, history) => dispatch => {
    console.log ("saving review: ", reviewInfo)
    if (store.getState().user.id) {
        axios.post(`/api/reviews/`,reviewInfo)
        .then (res => res.data) 
        .then (review => {
            //console.log("got review", review);
            dispatch(setStarRating(0))
            dispatch(addReviewToProduct(review))
            //dispatch(fetchProducts())
            history.push(`/products/${reviewInfo.productId}`)
        })
        .catch (console.log);
    }
}

export function setStarRating (rating) {
    return {type: SET_STAR_RATING, rating};
}
const initReview = {
    numberOfStars: 0,
    reviewText: '',
    recommendation: false
}
export default function order (state = {}, action) {
    switch (action.type) {
        case ADD_REVIEW:
            return action.review;
        case SET_STAR_RATING:
            return {...state, numberOfStars: action.rating}
        default: return state;
    }
}