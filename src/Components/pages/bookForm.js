import React from 'react';
import {Grid,Well,Panel,FormControl,Button,FormGroup,ControlLabel,InputGroup,DropdownButton,Image,Col,Row,MenuItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';

import {postBooks,deleteBook,resetButton} from '../../actions/bookActions';

import axios from 'axios';

class BookForm extends React.Component{
    constructor(){
        super();
        // img is the folder path
        this.state={
            images:[{}],
            img:''
        }
    }
    componentWillMount(){
        axios.get('/api/images')
            .then((res)=>{
                this.setState({images:res.data})
            })
            .catch((err)=>{
                this.setState({images:'Error loading images from server'})
            })
    }
    handleSubmit=()=>{
        const book=[{
            title:findDOMNode(this.refs.title).value,
            description:findDOMNode(this.refs.desc).value,
            price:findDOMNode(this.refs.price).value,
            images:findDOMNode(this.refs.imgName).value,
            currency:'EURO'
        }]
        this.props.postBooks(book);
    }
    resetForm=()=>{
        // Reset button (RESET_BUTTON in Book Actions)
        this.props.resetButton();

        findDOMNode(this.refs.title).value='';
        findDOMNode(this.refs.desc).value='';
        findDOMNode(this.refs.price).value='';
        this.setState({img:''})
    }
    onDeleteBook=()=>{
        let bookTitle=findDOMNode(this.refs.bookSelect).value;
        const index=this.props.books.findIndex((book)=>{return book.title===bookTitle});
        const bookId=this.props.books[index]._id;
        // console.log(bookId);

        this.props.deleteBook(bookId);
    }
    handleImgSelected=(imgName)=>{
        this.setState({img:'/image/'+imgName});
    }
    render(){

        const bookList=this.props.books.map((booksArr)=>{
            return (
                <option key={booksArr._id}>{booksArr.title}</option>
            )
        })

        const imgList=this.state.images.map((imgArr,index)=>{
            return (
                <MenuItem key={index} eventKey={imgArr.name} onClick={this.handleImgSelected.bind(this,imgArr.name)}>{imgArr.name}</MenuItem>
            )
        },this)

        return(
            <Grid>
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <InputGroup>
                            <FormControl type="text" ref='imgName' value={this.state.img}/>
                            <DropdownButton
                                componentClass={InputGroup.Button}
                                id="input-dropdown-addon"
                                title="Select an image"
                                bsStyle="primary"
                            >
                                {imgList}
                            </DropdownButton>
                            </InputGroup>
                            <Image src={this.state.img} responsive/>
                        </Panel>
                    </Col>

                    <Col xs={12} sm={6}>
                        <Panel>
                            <FormGroup controlId="title" validationState={this.props.validation}>
                                <ControlLabel>Title:</ControlLabel>
                                <FormControl 
                                    type="text"
                                    placeholder="Enter title"
                                    ref="title"
                                />
                                <FormControl.Feedback/>
                            </FormGroup>

                            <FormGroup controlId="desc" validationState={this.props.validation}>
                                <ControlLabel>Description:</ControlLabel>
                                <FormControl 
                                    type="text"
                                    placeholder="Enter description"
                                    ref="desc"
                                    componentClass="textarea"
                                />
                                <FormControl.Feedback/>
                            </FormGroup>

                            <FormGroup controlId="price" validationState={this.props.validation}>
                                <ControlLabel>Price:</ControlLabel>
                                <FormControl 
                                    type="text"
                                    placeholder="Enter price"
                                    ref="price"
                                />
                                <FormControl.Feedback/>
                            </FormGroup>

                            <Button onClick={(!this.props.msg)?(this.handleSubmit):(this.resetForm)} bsStyle={(!this.props.style)?("primary"):(this.props.style)}>{(!this.props.msg)?("Add book"):(this.props.msg)}</Button>
                        </Panel>

                        <Panel style={{marginTop:'20px'}}>
                            <FormGroup controlId="formControlsSelect">
                            <ControlLabel>Select book to delete</ControlLabel>
                            <FormControl componentClass="select" placeholder="select" ref="bookSelect">
                                <option value="select">select</option>
                                {bookList}
                            </FormControl>
                            </FormGroup>
                            <Button bsStyle="danger" bsSize="small" onClick={this.onDeleteBook}>Delete</Button>
                        </Panel>
                    </Col>
                </Row>
                
            </Well>
            </Grid>
        )
    }
 }

    // mapDispatchToProps=(dispatch)=>{
    //     return({postBooks},dispatch)
    // }

//  Access book Array
    function mapStateToProps(state){
        return {
            books:state.books.books,
            msg:state.books.msg,
            style:state.books.style,
            validation:state.books.validation
        }
    }

    function mapDispatchToProps(dispatch){
        return bindActionCreators({
            postBooks:postBooks,
            deleteBook:deleteBook,
            resetButton
        },dispatch);
    }

 export default connect(mapStateToProps,mapDispatchToProps)(BookForm);