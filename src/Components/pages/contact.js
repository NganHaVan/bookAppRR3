import React from 'react';
import {Grid,Col,Row,Button,Media,FormGroup,FormControl,ControlLabel} from 'react-bootstrap';

class Contact extends React.Component{
    render(){
        return(
            <Grid>
                <Row>
                    <Col xs={12} md={6}>
                        <Media>
                            <Media.Left align="top">
                                <br/>
                                <img width={40} height={40} src="https://www.inspiringgood.org/wp-content/uploads/2017/04/Report.png" alt="contact" />
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>Contact Details:</Media.Heading>
                                <p>If you'd like our help to create content that makes your business shine out from all the rest, you can contact us by:</p>
                    
                                <p>Filling the form</p>
                                <p>Phoning us on +22222222 </p>
                                <p>Emailing us at example@email.com</p>
                            </Media.Body>
                        </Media>
                    </Col>

                    <Col xs={12} md={6}>
                        <form>
                            <FormGroup controlId="name">
                                <ControlLabel>Name:</ControlLabel>
                                <FormControl 
                                    type="text"
                                    placeholder="Enter your full name"
                                />
                            </FormGroup>
                            <FormGroup controlId="name">
                                <ControlLabel>Email Address:</ControlLabel>
                                <FormControl 
                                    type="email"
                                    placeholder="Enter your email"
                                />
                            </FormGroup>
                            <FormGroup controlId="name">
                                <ControlLabel>Message:</ControlLabel>
                                <FormControl 
                                    componentClass="textarea"
                                    placeholder="Enter your message"
                                />
                            </FormGroup>

                            <Button bsStyle='primary' bsSize='small'>Submit</Button>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Contact;