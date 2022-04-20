

const initialState = {
    city: [],
    favLoc:[]

}

export function  soldaysReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CITY':
            return { ...state, city: [...action.data] }
        default:
    }
    return state;
}

