"use strict"

import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,IndexRoute,browserHistory} from 'react-router';

import Main from './main';
import BookList from './Components/pages/bookList';
import About from './Components/pages/about';
import Contact from './Components/pages/contact';
import BookForm from './Components/pages/bookForm';
import CartPage from './Components/pages/cart';

const routes=(
        <Route path="/" component={Main}>
            <IndexRoute component={BookList} />
            <Route path="/admin" component={BookForm} />
            <Route path="/cart" component={CartPage} />
            <Route path='/about' component={About}/>
            <Route path='/contact' component={Contact}/>
        </Route>
);
export default routes;