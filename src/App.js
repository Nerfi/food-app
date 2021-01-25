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
         <Route path="/dashboard" component={Dashboard}/>
         <Route exact  path="/" component={Home} />
         </Switch>
         </UserAuth>
      </Router>


    </div>
  );
}

export default App;
