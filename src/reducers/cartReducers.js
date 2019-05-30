"use strict"

// CART REDUCERS
export const cartReducer = (state = {cart:[]}, action) => {
    switch (action.type) {
        case 'GET_CART':
            return {...state,
                        cart:action.load,
                        totalAmount:totals(action.load).amount,
                        totalQty:totals(action.load).qty        
            }
        case 'ADD_TO_CART':
            return {...state,
                       cart:action.load,
                       totalAmount:totals(action.load).amount,
                       totalQty:totals(action.load).qty
                    }
            break;
        case 'DELETE_CART_ITEM':
            return {...state,
                       cart:action.load,
                       totalAmount:totals(action.load).amount,
                       totalQty:totals(action.load).qty
                    }
            break;
        case 'UPDATE_CART':
            return {...state,
                        cart:action.load,
                        totalAmount:totals(action.load).amount,
                        totalQty:totals(action.load).qty
                    };
            break;
    }
        return state;
}

// Calculate Totals
export function totals(payloadArr){
    const totalAmount=payloadArr.map((cartArr)=>{ 
                        return cartArr.price*cartArr.quantity
                            })
    .reduce((a,b)=>{return a+b},0);

    const totalQty=payloadArr.map((qty)=>{return qty.quantity}).reduce((a,b)=>{return a+b},0);

    return {
        amount:totalAmount.toFixed(2),
        qty:totalQty    
            }
}