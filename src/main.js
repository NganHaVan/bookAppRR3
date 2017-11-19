import React from 'react';
import Footer from './Components/menu/footer';
import Header from './Components/menu/nav';

import { connect } from 'react-redux'


class Main extends React.Component{
    render(){
        return(
            <div>
                <Header cartItemNumber={this.props.quantity}/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        quantity:state.cart.totalQty
    }
}

export default connect(mapStateToProps)(Main);