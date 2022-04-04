import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import profileReducer from "./Profile/profile.reducer";

export default combineReducers({
    // alert : alertReducer,
    user : userReducer,
    profile : profileReducer
});