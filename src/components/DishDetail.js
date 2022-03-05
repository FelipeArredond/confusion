import React from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';


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
                            <RenderComent comments={props.dish.comments}/>
                        </div>        
                    </div>
                </div>
            );
        }
        else{
            return (<div></div>);
        }
    }

export default DishDetail;