import { combineReducers } from "redux";

import orgReducer from "./orgReducer";

export default combineReducers({ orgs: orgReducer });
