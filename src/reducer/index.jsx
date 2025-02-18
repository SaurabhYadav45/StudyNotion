import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice"
import courseReducer from "../slices/courseSlice"
import profileReducer from "../slices/profileSlice"
import viewCourseReducer from "../slices/viewCourseSlice"

const rootReducer = combineReducers({
    auth : authReducer,
    cart: cartReducer,
    course: courseReducer,
    profile: profileReducer,
    viewCourse: viewCourseReducer,
})

export default rootReducer