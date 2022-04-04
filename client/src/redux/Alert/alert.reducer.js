import alertTypes from "./alert.types";

const INITIAL_STATE = {
    errorMessage : null,
    successMessage : null
};

const alertReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case alertTypes.SET_ALERT : 
        return {
            ...state,
        }
    default : 
        return state
    }
}

export default alertReducer;