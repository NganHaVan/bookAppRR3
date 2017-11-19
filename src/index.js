"use strict"

import {applyMiddleware,createStore} from 'redux';
import {createLogger} from 'redux-logger';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router,Route,IndexRoute,browserHistory} from 'react-router';
import thunk from 'redux-thunk';

import reducers from './reducers/reducers';
import {addToCart} from './actions/cartActions';
import {postBooks,deleteBook,updateBook} from './actions/bookActions';

import Main from './main';
import BookList from './Components/pages/bookList';
import About from './Components/pages/about';
import Contact from './Components/pages/contact';
import BookForm from './Components/pages/bookForm';
import CartPage from './Components/pages/cart';

const middleware=applyMiddleware(thunk,createLogger());
// Create the store
const store=createStore(reducers,middleware);

// REACT
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>     
            <Route path="/" component={Main}>
                <IndexRoute component={BookList} />
                <Route path="/admin" component={BookForm} />
                <Route path="/cart" component={CartPage} />
                <Route path='/about' component={About}/>
                <Route path='/contact' component={Contact}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("app")
);

// We don't need store.subscribe to get store state because we already wrote middleware
// store.subscribe(()=>{
//     console.log('Current state is: ',store.getState());
//     console.log('Current price: ',store.getState()[1].price)
// })

// Create and dispatch actions
// store.dispatch(postBooks(
//     [{
//         id:1,
//         title:'First Book',
//         description:'This is first book description',
//         price:33,
//         currency:'Euro'
//     },
//     {
//         id:2,
//         title:'Second Book',
//         description:'This is second book description',
//         price:24.50,
//         currency:'Euro'
//     }]
// ))

// store.dispatch({
//     type:'POST_BOOK',
//     load:[{
//         id:1,
//         title:'First Book',
//         description:'This is first book description',
//         price:33,
//         currency:'Euro'
//     },
//     {
//         id:2,
//         title:'Second Book',
//         description:'This is second book description',
//         price:24.50,
//         currency:'Euro'
//     }
// ]
// });

// Add a book: Turn it into array
// store.dispatch({
//     type:'POST_BOOK',
//     load:[{
//         id:3,
//         title:'Third Book',
//         description:'This is third book description',
//         price:50,
//         currency:'Euro'
//     }]
// });

// Delete a book
// store.dispatch(deleteBook({id:1}))
// store.dispatch({
//     type:'DELETE_BOOK',
//     load:{
//         id:1,
//         title:'First Book',
//         description:'This is first book description',
//         price:33,
//         currency:'Euro'
//     }
// });

// Update a book
// store.dispatch(updateBook({
//     id:2,
//     title:'Second Book',
//     description:'The second book\'s description has been changed',
//     price:24.50,
//     currency:'Euro'
//     }
// ))
// store.dispatch({
//     type:'UPDATE_BOOK',
//     load:{
//         id:2,
//         title:'Second Book',
//         description:'The second book description has been changed',
//         price:24.5,
//         currency:'Euro'
//     }
// });

// Add to cart
// store.dispatch(addToCart([{id:2}]));
