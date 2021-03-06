import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const initialState = {};
const middleware = thunk;
let store = null;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    // dev code
    store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(middleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
} else {
    // production code
    store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(middleware))
    );
}

export default store;
