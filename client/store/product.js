const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';

export function setCurrentProduct (product) {
    return {type: SET_CURRENT_PRODUCT, product}
}

export default function product (state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_PRODUCT:
            return action.product;
        default: return state;
    }
}