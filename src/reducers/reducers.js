import { combineReducers } from "redux";
import subsReducer from "./subsReducer";
import userReducer from "./userReducer";

const reducer = combineReducers({
    user:userReducer,
    subscription:subsReducer
})

export default reducer