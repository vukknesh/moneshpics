import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import imageReducer from "./imageReducer";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  image: imageReducer,
  loadingBar: loadingBarReducer
});
