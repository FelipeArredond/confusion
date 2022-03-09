import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, CardBody, CardText } from "reactstrap";
import { Link } from 'react-router-dom';
import {
    Button, Modal, ModalBody, ModalHeader, Label, Row, Col
} from "reactstrap";

import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";


    const required = (val) => val && val.length;
    const maxLength =  (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);


    
    


    function RenderDish({dish}){
        if (dish != null){
            return(
                <div className="col-13">
                    <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
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

    function RenderComent({comments,addComment,dishId}){
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
                    <CommentForm dishId={dishId} addComment={addComment}/>
                </div>
            );
        }
        else{
            return(<div></div>);
        }
    }

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
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        }
    
        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
        }
    
      
        render(){
            return(
                <React.Fragment>
                    <Button outline onClick={this.toggleModal}>Comment</Button>
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
                                            <Control.text model=".author" id="author" name="author"
                                                placeholder="Your Name"
                                                className="form-control"
                                                validators={{
                                                    required,minLength: minLength(3),maxLength: maxLength(15)
                                                }}/>
                                            <Errors
                                                className="text-danger"
                                                model=".author"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                            />  
                                        </Col>
                                    </Row>
                                    <Label htmlFor="comment" >Comment</Label>
                                    <Row className="form-group">
                                        
                                        <Col>
                                            <Control.textarea model=".comment" type="textarea" id="comment" name="comment"
                                                rows="7"
                                                className="form-control" />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Col>
                                            <Button type="submit" color="bg-primary">   
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

    const DishDetail = (props) => {
        if(props.isLoading){
            return (
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>    
                </div>
            );
        }else if(props.errMess){
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>    
            </div>
        }
        else if(props.dish != null){
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
                            <RenderComent comments={props.comments}
                                addComment={props.addComment}
                                dishId={props.dish.id}/>
                        </div>        
                    </div>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );    
        }
    }

export default DishDetail;