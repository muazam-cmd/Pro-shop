import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer } from './reducers/productReducers'

const reducer = combineReducers({
    productList: productListReducer,
})
const initialState = {}
const Middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...Middleware)))

export default store