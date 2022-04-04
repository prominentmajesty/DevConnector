import axios from 'axios';
import userTypes from "./user.types";
import profileTypes from '../Profile/profile.types';
import setAuthToken from '../../utils/setAuthToken';

//Load User
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try{
        const res = await axios.get('api/auth');
        if(!res){
            dispatch({
                type : userTypes.USER_LOADED_ERROR,
            });
        }
        dispatch({
            type : userTypes.USER_LOADED_SUCCESS,
            payload : res.data
        });
    }catch(err){
        console.log(err.response);
        dispatch({
            type : userTypes.USER_LOADED_ERROR,
        });
    }
};

//Register User
export const register = ({name, email, password}) => async dispatch => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    };

    const body = JSON.stringify({name, email, password});

    try{
        const res = await axios.post('api/users', body, config);

        dispatch({
            type : userTypes.REGISTER_SUCCESS,
            payload : res.data
        })
    }catch(err){
        dispatch({
            type : userTypes.REGISTER_FAILED
        })
    }
};

//Login User
export const login = ({email, password}) => async dispatch => {
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    };

    const body = JSON.stringify({email, password});

    try{
        const res = await axios.post('api/auth', body, config);

        dispatch({
            type : userTypes.LOGIN_SUCCESS,
            payload : res.data
        })
        // window.location.href = '/';
    }catch(err){
        console.log(err.response.data.errors[0].msg);
        dispatch({
            type : userTypes.LOGIN_FAILED
        });
    }
};

export const logout =  () => dispatch => {
    dispatch({
        type : userTypes.LOGOUT
    });
    dispatch({
        type : profileTypes.CLEAR_PROFILE
    })
};