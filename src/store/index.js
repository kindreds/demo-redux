import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'

import rootReducer from '../reducer'

const DEVTOOLS = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const composeEnhancers = DEVTOOLS || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
