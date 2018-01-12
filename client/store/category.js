const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';

export function setCurrentCategory (category) {
    return {type: SET_CURRENT_CATEGORY, category}
}

export default function category (state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_CATEGORY:
            return action.category;
        default: return state;
    }
}