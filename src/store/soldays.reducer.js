

const initialState = {
    city: [],
    favLoc: [],
    isFav:false

}

export function soldaysReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CITY':
            return { ...state, city: [...action.city] }
        case 'SET_ISFAV':
            return { ...state, isFav: action.isFav } 
        case 'SET_FAVLOC':
            return { ...state, favLoc: [...action.data] } 
        case 'SAVE_FAVLOC':
            return{ ...state, favLoc: [...state.favLoc, action.data] }
        case 'DELETE_FAVLOC':
            return { ...state, favLoc: state.favLoc.filter(loc => loc.Key !== action.data) }; case 'SET_FAVLOC':
        default:
    }
    return state;
}

