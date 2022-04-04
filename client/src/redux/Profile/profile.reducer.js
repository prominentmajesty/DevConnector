import profileTypes from "./profile.types";


 const INITIAL_STATE = {
     profile : null,
     profiles : [],
     repos : [],
     loading : true,
     error : null,
     createProfileFailure: false,
     createProfileSuccess : false
 }

 const profileReducer = (state = INITIAL_STATE, action) => {
    
    switch(action.type){
        case profileTypes.GET_ALL_PROFILES : 
            return {
                ...state,
                profiles : action.payload,
                loading : false
            }
        case profileTypes.GET_PROFILE : 
        case profileTypes.ADD_EXPERIENCE : 
        case profileTypes.ADD_EDUCATION :
            return {
                ...state,
                profile : action.payload,
                loading : false,
                error : null
            };

        case profileTypes.PROFILE_ERROR : 
            return {
                ...state,
                loading : true,
                error : action.payload
            }
        case profileTypes.CLEAR_PROFILE : 
        case profileTypes.DELETE_PROFILE : 
            return {
                ...state,
                profile : null,
                profiles : [],
                repos : [],
                loading : false,
                error : null
            }
        case  profileTypes.GET_REPOS : 
            return {
                ...state,
                repos : action.payload,
                loading : true
            }
        case profileTypes.CREATE_PROFILE_SUCCESS : 
            return {
                ...state,
                createProfileSuccess : action.payload
            }
        case profileTypes.CREATE_PROFILE_FAILURE : 
            return {
                ...state,
                createProfileFailure : action.payload
            }
        case profileTypes.RESETE_CREATE_PROFILE_SUCCESS : 
            return {
                ...state,
                createProfileSuccess : action.payload
            }
        case profileTypes.RESETE_CREATE_PROFILE_FAILURE : 
            return {
                ...state,
                createProfileFailure : action.payload
            }
        default : 
            return state
    }

 }

 export default profileReducer;