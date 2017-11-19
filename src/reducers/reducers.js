"use strict"
// Combine all the reducers
import {combineReducers} from 'redux';
import {cartReducer} from './cartReducers';
import {bookReducer} from './bookReducers';

export default combineReducers({
    books:bookReducer,
    cart:cartReducer
})