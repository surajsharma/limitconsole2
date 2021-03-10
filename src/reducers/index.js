import { combineReducers } from "redux";

import orgReducer from "./orgReducer";
import defaultsReducer from "./defaultsReducer";

export default combineReducers({ orgs: orgReducer, defaults: defaultsReducer });
