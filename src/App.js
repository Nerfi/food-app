import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/UI/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleMeal from './components/SingleMeal';
import NavbarFood from './components/UI/Navbar';

function App() {
  return (

    <div className="App">

      <NavbarFood/>

      <Router>
         <Switch>
         <Route path="/meal/:id" component={SingleMeal}/>
         <Route exact  path="/" component={Home} />

         </Switch>

      </Router>

    </div>
  );
}

export default App;
