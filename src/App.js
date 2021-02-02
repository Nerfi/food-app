import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/UI/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleMeal from './components/SingleMeal';
import NavbarFood from './components/UI/Navbar';
import RandomMeal from './components/RandomMeal';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Dashboard from './components/userProfile/Dashboard';
//importing the context
import {UserAuth} from './AuthContext/UserContext';
import UpdateUserData from './components/UI/UpdateUserData';
import ForgotPassword from './components/userProfile/ForgotPassword';

function App() {
  return (

    <div className="App">


      <Router>
      <UserAuth>
         <NavbarFood/>
         <Switch>

         <Route path="/meal/:id" component={SingleMeal}/>
         <Route path="/random" component={RandomMeal}/>
         <Route path="/login" component={Login}/>
         <Route path="/signup" component={Signup}/>
         <Route path="/forgot-password" component={ForgotPassword}/>
         <Route path="/dashboard" component={Dashboard}/>
         <Route path="/updateUserData" component={UpdateUserData}/>
         <Route exact  path="/" component={Home} />
         </Switch>
         </UserAuth>
      </Router>


    </div>
  );
}

export default App;






import React, { useContext } from "react";

import { Redirect, Route } from "react-router-dom";

import { AuthenticationContext } from "../../context/AuthenticationContext";

const ProtectedRoute = ({ component: Component, path, exact }) => {
  const { user } = useContext(AuthenticationContext);

  return user ? <Route path={path} exact={exact} component={Component} /> : <Redirect to="/login" />;
};

export default ProtectedRoute;


<ProtectedRoute path={ROUTES.DOCUMENTATION} component={Documentation} />
<Route path={ROUTES.DASHBOARD} component={Dashboard} />
