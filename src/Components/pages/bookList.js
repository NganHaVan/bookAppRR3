import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid,Row,Col,Button} from 'react-bootstrap';

import {getBooks} from '../../actions/bookActions';

import BookItem from './bookItem';
import BookForm from './bookForm';
import CartPage from './cart';
import ShowCarousel from './carousel';

class BookList extends React.Component{
    componentDidMount(){
        this.props.getBooks();
    }
    render(){
        // console.log('State accessed!', this.props.books);
        // console.log('State accessed!', this.props.stateBook);
        
            const bookList=this.props.books.map((book)=>{
                return(
                    <Col xs={12} sm={6} md={4} key={book._id}>
                        <BookItem _id={book._id}
                                  title={book.title}
                                  description={book.description}
                                  price={book.price}
                                  images={book.images}
                                  currency={book.currency}
                        />
                    </Col>
                );
            })   
        
        return(
            <div>
                <Grid>

                    <Row>
                        <ShowCarousel/>
                    </Row>

                    <Row>
                        <CartPage/>
                    </Row>

                    <Row style={{marginTop:'15px'}}>
                        
                            <BookForm/>
                    </Row>
                    <Row>
                        {bookList}
                    </Row>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        books:state.books.books,
        stateBook:state.books
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getBooks:getBooks
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);