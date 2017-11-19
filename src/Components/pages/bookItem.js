import React from 'react';
import {Row,Col,Button,Well, Image} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {addToCart,updateCart} from "../../actions/cartActions";

class BookItem extends React.Component{
    constructor(){
        super();
        this.state={
            isClicked:false
        }
    }
    onReadmore=()=>{
        this.setState({isClicked:true});
    }
    handleCart=()=>{
        const book=[...this.props.cart,{
            _id:this.props._id,
            title:this.props.title,
            description:this.props.description,
            price:this.props.price,
            currency:this.props.currency,
            quantity:1
        }]
        // Check if the cart is empty
        if (this.props.cart.length>0) {
            // The cart is not empty
            let _id=this.props._id;
            let cartIndex=this.props.cart.findIndex((cart)=>cart._id===_id);
            // If returns -1(no match) then add to cart
            if (cartIndex===-1) {
                this.props.addCart(book);
            }
            else{
                // If match, update the quantity(UPDATE_CART action)
                this.props.updateCart(_id,1,this.props.cart);
            }
        } else {
            this.props.addCart(book);   
        }
    }
    render(){
        return(
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <Image src={this.props.images} responsive/>
                    </Col>
                    <Col xs={6} sm={6}>
                    <p><b>Title:</b> {this.props.title}</p>
                    <p><b>Description:</b> {(this.props.description.length>20 && this.state.isClicked===false)?(this.props.description.substring(0,20)):(this.props.description)}</p>
                        <button className='link' onClick={this.onReadmore.bind(this)}>
                            {(this.state.isClicked===false && this.props.description.length>20 && this.props.description!==null)?('...read more'):('')}
                        </button>
                    <p><b>Price:</b> {this.props.price} Euro</p>
                    <Button onClick={this.handleCart} bsStyle='primary'>Buy Now</Button>
                    </Col>
                </Row>
            </Well>
        )
    }
}

function mapStateToProps(state){
    return{
        cart:state.cart.cart
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        addCart:addToCart,
        updateCart:updateCart
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BookItem);