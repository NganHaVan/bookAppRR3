import React from 'react';
import {Carousel} from 'react-bootstrap';

class ShowCarousel extends React.Component{
    render(){
        return(
            <Carousel>
            <Carousel.Item>
              <img width={900} height={300} alt="900x500" src="https://www.expedia.ca/travelblog/wp-content/uploads/2014/07/Books_for_Wanderers_Featured.jpg" />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img width={900} height={300} alt="900x500" src="https://blog.studocu.com/wp-content/uploads/2017/08/best-books-book-youll-ever-read.jpg" />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img width={900} height={300} alt="900x500" src="https://static.pexels.com/photos/46274/pexels-photo-46274.jpeg" />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        );
    }
}

export default ShowCarousel;