import React from 'react';
import {Grid,Row,Col,Button} from 'react-bootstrap';

class About extends React.Component{
    render(){
        return(
            <Grid>
                <h1>About us</h1>
                <Row>
                    <Col xs={12} md={6}>
                        <h3>Our business</h3>
                        <p>We understand that reading is the simplest way for human to derive and constructing meaning in order to gain a particular knowledge from a source. This tendency has been digitized when books evolve into digital media equivalent – E-Books.</p>
                        <p>It would be nice if we’re able to download free e-book and take it with us. That’s why we’ve again crawled deep into the Internet to compile this list of 20 places to download free e-books for your use.</p>
                        <Button bsStyle='primary'>Ask us</Button>
                    </Col>
                    <Col xs={12} md={6}>
                        <img src='http://integreatleadership.com/wp-content/uploads/2013/01/HiRes1.jpg' width={100} height={100}/>
                        <h3>How can we help?</h3>
                        <p>We provides free ebooks for your PDA, iPod or eBook Reader. You can randomly browse for a ebook through the most popular titles, recommendations or recent reviews for visitors. There are 21,282 eBooks available here and they’re all free!</p>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default About;