"use strict"
// let defaultBooks=[{
//     _id:1,
//     title:'First Book',
//     description:'This is first book description',
//     price:33,
//     currency:'Euro'
// },
// {
//     _id:2,
//     title:'Second Book',
//     description:'This is second book description',
//     price:24.50,
//     currency:'Euro'
// }];
// Book reducer
export function bookReducer(state={books:[]} , action){
    switch (action.type) {
        case 'GET_BOOK':
            return {...state,books:[...action.load]};
        case 'POST_BOOK':
            // return state= action.load;
            return {...state,books:[...state.books,...action.load],msg:'Saved! Click to continue', style:'success', validation:'success'};
        case 'POST_BOOK_REJECTED':
            return {...state,msg:'Please try again', style:'danger',validation:'error'};
        case 'DELETE_BOOK':
            const indexToDelete=[...state.books].findIndex((book)=>{return book._id==action.load;})
            return {books:[...state.books.slice(0,indexToDelete),...state.books.slice(indexToDelete+1)]};
        case 'UPDATE_BOOK':
            const indexToUpdate=[...state.books].findIndex((book)=>{return book._id===action.load._id});
            const newBook={
                ...state.books[indexToUpdate],description:action.load.description
            };
            // console.log(newBook);
            return {books:[...state.books.slice(0,indexToUpdate),newBook,...state.books.slice(indexToUpdate+1)]};
        case 'RESET_BUTTON':
        return {...state,msg:null,style:'primary',validation:null};

    }
    return state
}

