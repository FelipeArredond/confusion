import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, CardBody, CardText } from "reactstrap";
import { Link } from 'react-router-dom';
import {
    Button, Modal, ModalBody, ModalHeader, Label, Row, Col
} from "reactstrap";

import { Control, LocalForm, Errors } from 'react-redux-form';


    const required = (val) => val && val.length;
    const maxLength =  (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);


    class CommentForm extends Component{
        constructor(props){
            super(props);
            this.state ={
                isModalOpen: false
            }
            this.handleSubmit = this.handleSubmit.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
        }
    
        handleSubmit(values) {
            console.log('Current state is: ' + JSON.stringify(values));
            alert('Current state is: ' + JSON.stringify(values));
        }
    
        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
        }
    
      
        render(){
            return(
                <React.Fragment>
                    <Button onClick={this.toggleModal}>Comment</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Label htmlFor="firstname" >Rating</Label>
                                    <Row className="form-group">
                                        <Col>
                                            <Control.text model=".rating" type="number" id="rating" name="rating" min="1" max="5"
                                                className="form-control"/>
                                        </Col>
                                    </Row>
                                    <Label htmlFor="lastname" >Your Name</Label>
                                    <Row className="form-group">
                                        <Col>
                                            <Control.text model=".name" id="name" name="name"
                                                placeholder="Your Name"
                                                className="form-control"
                                                validators={{
                                                    required,minLength: minLength(3),maxLength: maxLength(15)
                                                }}/>
                                            <Errors
                                                className="text-danger"
                                                model=".name"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                            />  
                                        </Col>
                                    </Row>
                                    <Label htmlFor="message" >Comment</Label>
                                    <Row className="form-group">
                                        
                                        <Col>
                                            <Control.textarea model=".message" type="textarea" id="message" name="message"
                                                rows="7"
                                                className="form-control" />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Col>
                                            <Button type="submit" color="primary">  
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                </LocalForm>
                        </ModalBody>        
                    </Modal>
                </React.Fragment>
            ) 
        }
    };
    


    function RenderDish({dish}){
        if (dish != null){
            return(
                <div className="col-13">
                    <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
            );
        }
        else{
            return(
                <div></div>
            )
        }
    }

    function RenderComent({comments}){
        if(comments != null){
            const commentListItem = comments.map((comment) =>{
                return(
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>--{comment.author}, {comment.date}</p>
                    </li>
                );
            });
            return(
                <div className="col-12 ">
                    <h4>
                        Comments
                    </h4>
                    <ul className="list-unstyled">
                        {commentListItem}
                    </ul>
                    <CommentForm />
                </div>
            );
        }
        else{
            return(<div></div>);
        }
    }



    const DishDetail = (props) => {

        console.log('DishDetail component render invoked')
        if(props.dish != null){
            const newLocal = <Breadcrumb>
                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>;
            return(
                <div className="container">
                    <div className="row">
                        {newLocal}
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>

                        <hr />
                    </div>
                </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish}/>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComent comments={props.comments}/>
                        </div>        
                    </div>
                </div>
            );
        }
    }

export default DishDetail;