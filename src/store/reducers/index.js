import { combineReducers } from "redux";
import invitationReducer from "./invitationReducer";

const rootReducer = combineReducers({
  invitationReducer: invitationReducer,
});

export default rootReducer;
