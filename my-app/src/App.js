import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {Department} from './Department';
import {Employee} from './Employee';
import {Navigation} from './Navigation';
import {Login} from './components/Login';
import {Register} from './components/Register';

import {BrowserRouter,Route,Switch} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">React</h3>
      <Navigation/>
      <Switch>
        {/* <Route path='/' component={Login} exact/> */}
        <Route path='/' component={Home} exact/>
        <Route path='/department' component={Department}/>
        <Route path='/employee' component={Employee}/>
        {/* <Route path='/register' component={Register}/> */}
      </Switch>

      {/* <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/department' component={Department}/>
        <Route path='/employee' component={Employee}/>
        
      </Switch>  */}
    </div>
    </BrowserRouter>
  );
}

export default App;
