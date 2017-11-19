import React from 'react';
import { connect } from 'react-redux'
import {Panel,Col,Row,Well,Button,Label,ButtonGroup,Modal} from 'react-bootstrap';
import {bindActionCreators} from 'redux';

import {deleteCart,updateCart,getCart} from '../../actions/cartActions';

class CartPage extends React.Component{
    componentDidMount(){
        this.props.getCart();
    }
    onDelete=(_id)=>{
        // const index=this.props.cart.findIndex((cart)=>{
        //     return cart._id===_id
        // });
        // let cartAfterDelete=[...this.props.cart.slice(0,index),...this.props.cart(index+1)];

        const currentBook=this.props.cart;
        const index=currentBook.findIndex((cart)=>{return cart._id===_id});
        let cartAfterDelete=[...currentBook.slice(0,index),...currentBook.slice(index+1)];

        this.props.deleteCart(cartAfterDelete);
    }

    onIncrement=(_id)=>{
        this.props.updateCart(_id,1,this.props.cart);
    }

    onDecrement=(_id,quantity)=>{
        if (quantity>1) {
            this.props.updateCart(_id,-1,this.props.cart);   
        }
    }

    constructor(){
        super();
        this.state={
            showModal:false
        }
    }

    open=()=>{
        this.setState({showModal:true});
    }

    close=()=>this.setState({showModal:false})

    render(){
        if (this.props.cart[0]) {
            return this.renderCart();
        }
        else{
            return this.renderEmptyCart();
        }
    }

    renderEmptyCart(){
        return <div></div>
    }

    renderCart(){
        const cartItem=this.props.cart.map((bookCart)=>{
            return (
                <Panel key={bookCart._id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6><b>Title:</b>{bookCart.title}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>{bookCart.price} Euro</h6>
                        </Col><Col xs={12} sm={3}>
                            <h6>Quantity:<Label bsStyle='success'>{bookCart.quantity}</Label></h6>
                        </Col>
                        <Col xs={6} sm={3}>
                            <ButtonGroup>
                                <Button bsStyle='default' bsSize='small' onClick={()=>{this.onDecrement(bookCart._id,bookCart.quantity)}}>-</Button>
                                <Button bsStyle='default' bsSize='small' onClick={()=>{this.onIncrement(bookCart._id)}}>+</Button>
                                <Button bsStyle='danger' bsSize='small' onClick={()=>{this.onDelete(bookCart._id)}}>Delete</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Panel>
            )
        },this);

        return(
            <Panel header="Cart" bsStyle="primary">
                {cartItem}
                <hr/>
                <Row>
                    <Col xs={12}>
                        <h6><b>Total:</b> {this.props.totalAmount} Euro</h6>
                        <Button bsStyle="success" bsSize="small" onClick={this.open}>PROCEED TO CHECKOUT</Button>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                  <Modal.Title>Thank you</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h3>Your order has been saved</h3>
                  <p>Check email to confirm your order</p>
                </Modal.Body>
                <Modal.Footer>
                <Col xs={6}>
                    <h6><b>Total amount:</b> {this.props.totalAmount} Euro</h6>
                </Col>
                  <Button bsStyle="primary" onClick={this.close}>Close</Button>
                </Modal.Footer>
              </Modal>
            </Panel>
        )
    }
}

function mapStateToProps(state){
    return{
        cart:state.cart.cart,
        totalAmount:state.cart.totalAmount
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        deleteCart:deleteCart,
        updateCart:updateCart,
        getCart:getCart
    },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(CartPage);