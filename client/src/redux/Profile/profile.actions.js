import axios from "axios";
import profileTypes from "./profile.types";


export const getProfile = () => async dispatch => {
    try{
        const res = await axios.get('/api/profile/me');

        dispatch({
            type : profileTypes.GET_PROFILE,
            payload : res.data
        });
    }catch(err){
        console.log(err.response)
        dispatch({
            type : profileTypes.PROFILE_ERROR,
            payload : err.response
        });
    };
};

//Get All Profiles
export const getAllProfile = () => async dispatch => {
    dispatch({
        type : CLEAR_PROFILE
    });
    try{
        const res = await axios.get('/api/profile');

        dispatch({
            type : profileTypes.GET_ALL_PROFILES,
            payload : res.data
        });
    }catch(err){
        console.log(err.response)
        dispatch({
            type : profileTypes.PROFILE_ERROR,
            payload : err.response
        });
    };
};

//Get Profile By ID
export const getProfileByID = (userId) => async dispatch => {
    dispatch({
        type : CLEAR_PROFILE
    });
    try{
        const res = await axios.get(`api/profile/${userId}`);

        dispatch({
            type : profileTypes.GET_PROFILE,
            payload : res.data
        });
    }catch(err){
        console.log(err.response)
        dispatch({
            type : profileTypes.PROFILE_ERROR,
            payload : err.response
        });
    };
};

//Get Github Repo
export const getGithubRepos = (username) => async dispatch => {

    try{
        const res = await axios.get(`api/profile/github/${username}`);

        dispatch({
            type : profileTypes.GET_REPOS,
            payload : res.data
        });
    }catch(err){
        console.log(err.response)
        dispatch({
            type : profileTypes.PROFILE_ERROR,
            payload : err.response
        });
    };
};

// Create or Update Profile

export const createProfile = (FormData) => async dispatch => {
    try{
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        const res = await axios.post('api/profile', FormData, config);

        dispatch({
            type : profileTypes.GET_PROFILE,
            payload : res.data
        });
        dispatch({
            type : profileTypes.CREATE_PROFILE_SUCCESS,
            payload : true
        })
    }catch(err){
        console.log(err);
        dispatch({
            type : profileTypes.CREATE_PROFILE_FAILURE,
            payload : true
        });
    };
};

export const resetCreateProfileSuccess_ = () => async dispatch =>{
    dispatch({
        type : profileTypes.RESETE_CREATE_PROFILE_SUCCESS,
        payload : false
    });
};      

export const resetCreateProfileFailur_ = () => async dispatch => {
    dispatch({
        type : profileTypes.RESETE_CREATE_PROFILE_FAILURE,
        payload : false
    });
};

export const addExperience = (FormData) => async dispatch => {
    try{
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        const res = await axios.put('api/profile/experience', FormData, config);

        dispatch({
            type : profileTypes.GET_PROFILE,
            payload : res.data
        });
        dispatch({
            type : profileTypes.CREATE_PROFILE_SUCCESS,
            payload : true
        })
    }catch(err){
        console.log(err);
        dispatch({
            type : profileTypes.CREATE_PROFILE_FAILURE,
            payload : true
        });
    };
}

export const addEducation = (FormData) => async dispatch => {
    try{
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        const res = await axios.put('api/profile/education', FormData, config);

        dispatch({
            type : profileTypes.GET_PROFILE,
            payload : res.data
        });
        dispatch({
            type : profileTypes.CREATE_PROFILE_SUCCESS,
            payload : true
        })
    }catch(err){
        console.log(err);
        dispatch({
            type : profileTypes.CREATE_PROFILE_FAILURE,
            payload : true
        });
    };
}

export const deleteEducation = (id) => async await =>{
    try{
        const res = await axios.delete(`api/profile/education/${id}`);

        dispatch({
            type : profileTypes.DELETE_EDUCATION,
            payload : res.data
        })

    }catch(err){
        console.log(err);
        dispatch({
            type : profileTypes.PROFILE_ERROR
        })
    }
}

export const deleteExperience= (id) => async await =>{
    try{
        const res = await axios.delete(`api/profile/experience/${id}`);

        dispatch({
            type : profileTypes.DELETE_EXPERIENCE,
            payload : res.data
        })

    }catch(err){
        console.log(err);
        dispatch({
            type : profileTypes.PROFILE_ERROR
        })
    }
}

export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are You Sure? This Can not be undone')){
        try{
            const res = await axios.delete(`api/profile`);
    
            dispatch({
                type : profileTypes.CLEAR_PROFILE,
            })
            dispatch({
                type : profileTypes.DELETE_PROFILE
            })
    
        }catch(err){
            console.log(err);
            dispatch({
                type : profileTypes.PROFILE_ERROR
            })
        }
    }
}