import React from 'react';
import {Nav,NavItem, Navbar, Badge} from 'react-bootstrap';
import {Link} from 'react-router';


class Header extends React.Component{
    render(){
        return(
            <Navbar  fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to='/'><a>Dashboard</a></Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                  <NavItem eventKey={1} href="#"><Link to='/about'>About</Link></NavItem>
                  <NavItem eventKey={2} href="#"><Link to='/contact'>Contact Us</Link></NavItem>
              </Nav>
              <Nav pullRight>
                  <NavItem eventKey={1} href='/admin'><Link to='/admin'>Admin</Link></NavItem>
                  <NavItem eventKey={2} href='/cart'><Link to='/cart'>Cart
                  {(this.props.cartItemNumber>0)?(<Badge className='badge'>{this.props.cartItemNumber}</Badge>):('')}
                  </Link></NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
    }
}
export default Header;
