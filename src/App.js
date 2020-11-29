import './App.css';
import DisplayFoods from './components/DisplayFood';
import Home from './components/UI/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
    <Home/>
    <DisplayFoods/>
    </div>
  );
}

export default App;
