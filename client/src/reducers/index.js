import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";

const rootReducer = combineReducers({
  user: userReducer,
  serach: searchReducer,
});

export default rootReducer;
