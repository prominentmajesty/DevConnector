import userTypes from "./user.types";

const INITIAL_STATE = {
    currentUser : null,
    token : null,
    isAuthenticated : false,
    loading :  false
}; 

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){

        case userTypes.USER_LOADED_SUCCESS : 
            return {
                ...state,
                currentUser : action.payload,
                isAuthenticated :  true,
                loading : true
            }

        case userTypes.REGISTER_SUCCESS : 
        case userTypes.LOGIN_SUCCESS : 
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token : localStorage.getItem('token'),
                isAuthenticated : true,
                loading : true
            } 

        case userTypes.REGISTER_FAILED : 
        case userTypes.LOGIN_FAILED : 
        case userTypes.USER_LOADED_ERROR : 
        case userTypes.LOGOUT :
            localStorage.removeItem('token');
            return {
                ...state,
                currentUser : null,
                token : null,
                isAuthenticated : false,
                loading : false
            }
        default : 
            return state
    }
} 

export default userReducer;