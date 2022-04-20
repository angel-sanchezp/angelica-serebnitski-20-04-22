

const initialState = {
    city: [],
    favLoc: []

}

export function soldaysReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CITY':
            return { ...state, city: [...action.data] }
            case 'DELETE_FAVLOC':
                return { ...state, favLoc: [...action.data] }
            case 'SET_FAVLOC':
                return { ...state, favLoc: [...action.data] }
        default:
    }
    return state;
}
