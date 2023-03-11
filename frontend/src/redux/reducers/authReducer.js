import ACTIONS from '../action/'

const initialState = {
    user: [],
    isLogged: false,
    
    loading: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
            return {
                ...state,
                isLogged: true,
                loading: true,
            }
        case ACTIONS.GET_USER:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                
            }
        default:
            return state
    }
}

export default authReducer