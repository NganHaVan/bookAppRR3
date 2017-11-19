import axios from 'axios';

export function getBooks(){
    // RETURN A FUNCTION
    return (dispatch)=>{
        axios.get('/api/books')
            .then((res)=>{dispatch({type:'GET_BOOK',load:res.data})})
            .catch((err)=>{dispatch({type:'GET_POST_REJECTED',load:err})})
    }

    // RETURN AN ACTION
    // return{
    //     type:'GET_BOOK'
    // }
}

// show books
export function postBooks(book){
    // RETURN A FUNCTION
    return (dispatch)=>{
    axios.post('/api/books',book)
        .then((response)=>{
            dispatch({type:'POST_BOOK',load:response.data})
        })
        .catch((err)=>{
            dispatch({type:'POST_BOOK_REJECTED',load:'The book cannot be posted'})
        })
    }
    
    // RETURN AN ACTION:
    // return{
    //     type:'POST_BOOK',
    //     load:book
    // }
}

// delete a book
export function deleteBook(id){
    return (dispatch)=>{
        axios.delete('/api/books/'+id)
            .then((res)=>{dispatch({type:'DELETE_BOOK',load:id})})
            .catch((err)=>{dispatch({type:'DELETE_BOOK_REJECTED',load:err})})
    }
    
    // return{
    //     type:'DELETE_BOOK',
    //     load:id
    // }
}

// Update a book
export function updateBook(book){
    return{
        type:'UPDATE_BOOK',
        load:book
    }
}

// Reset button
export function resetButton(){
    return{
        type:'RESET_BUTTON'
    }
}