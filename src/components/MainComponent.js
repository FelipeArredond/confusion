import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import About from './AboutComponent';
import RenderLeader from './RenderLeaderComponent';
import { DISHES } from '../shared/dishes';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import DishDetail from './DishDetail'
import {Switch, Route, Redirect} from 'react-router-dom';


class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        comments: COMMENTS,
        leaders: LEADERS,
        promotions: PROMOTIONS
    };
  }

  render() {
    const HomePage = () => {
      return(
          <Home 
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }

    const DishWithId = ({match}) =>{
            return(
              <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
              comments={this.state.comments.filter((comments) => comments.dishId)=== parseInt(match.params.dishId,10)}
              />
            );
    }
    
    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Route exact path="/contactus">
            <Contact/>
          </Route> 
          <Route path="/aboutus">
            <About leaders={this.state.leaders}/> 
          </Route>
          <Redirect to="/home" />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default Main;