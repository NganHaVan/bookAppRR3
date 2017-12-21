import axios from 'axios';

import React from 'react';
import { createStore } from "redux";
import { Provider } from 'react-redux'
import { renderToString } from "react-dom/server";
import { match, RouterContext,StaticRouter } from "react-router";

import reducers from './src/reducers/reducers';
import routes from './src/routes';

function handleRender(req,res){
    axios.get('http://localhost:3001/books')
        .then((response)=>{
            // var myHtml=JSON.stringify(response.data);
            // res.render('index',{myHtml});

            // Create a redux store in the server
            const store = createStore(reducers,{"books":{"books":response.data}});
            // Get initial state from the store
            const initialState=JSON.stringify(store.getState().replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--'));
            console.log(initialState);
            const Routes={
                routes:routes,
                location:req.url
            }
            match(Routes, function(error,redirect,props){
                const reactMarkup=renderToString(
                <Provider store={store}> 
                    <StaticRouter>
                        <RouterContext {...props}/>
                    </StaticRouter>
                </Provider>
                );
                res.locals.reactMarkup=reactMarkup;
            if (error) {
            res.status(500).send("Error in fullfilling the request");
            }
            else if(redirect){
            res.status(302,redirect.pathname+redirect.search);
            // res.status(302).alert('Error');
            }
            else if(props){
            res.render('index',{reactMarkup});
            res.render('index',{initialState});
            } else{
            res.status(404).send('Not found!');
            }
            });
            })
            .catch((err)=>{
            console.log('Initial Server-side rendering error: ',err);
            })
}
module.exports=handleRender;