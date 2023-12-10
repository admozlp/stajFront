import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { store } from "./store";


export function configureStore(params) {
    return createStore(store, applyMiddleware(thunk))
}