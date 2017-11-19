import axios from 'axios';

export function getCart(){
    return (dispatch)=>{
        axios.get('/api/cart')
            .then((res)=>{dispatch({type:'GET_CART',load:res.data})})
            .catch((err)=>{dispatch({type:'GET_CART_REJECTED',load:err})})
    }
}

export function addToCart(cart){
    return (dispatch)=>{
        axios.post('/api/cart',cart)
            .then((res)=>{dispatch({type:'ADD_TO_CART',load:res.data})})
            .catch((err)=>{dispatch({type:'ADD_TO_CART_REJECTED',load:err})})
    }
    
    // return{
    //     type:'ADD_TO_CART',
    //     load:book
    // }
}

export function deleteCart(cart){
    return (dispatch)=>{
        axios.post('/api/cart',cart)
            .then((res)=>{dispatch({type:'DELETE_CART_ITEM',load:res.data})})
            .catch((err)=>{dispatch({type:'DELETE_CART_ITEM_REJECTED',load:err})})
    }
    // return{
    //     type:'DELETE_CART_ITEM',
    //     load:book
    // }
}

export function updateCart(_id,unit,cartArr){
    const currentCart=cartArr;
    const indexToUpdate=currentCart.findIndex((cart)=>cart._id===_id);
    const newCart={...currentCart[indexToUpdate], quantity:currentCart[indexToUpdate].quantity+unit};
    console.log(newCart);
    let cartUpdate=[...currentCart.slice(0,indexToUpdate),newCart,...currentCart.slice(indexToUpdate+1)];
    return (dispatch)=>{
        axios.post('/api/cart',cartUpdate)
            .then((res)=>{dispatch({type:'UPDATE_CART',load:res.data})})
            .catch((err)=>{dispatch({type:'UPDATE_CART_REJECTED',load:err})})
    }
    
    // return{
    //     type:'UPDATE_CART',
    //     load:cartUpdate
    // }
}