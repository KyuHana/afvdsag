import React from 'react';
import Main from './Components/Main';
import Header from './Components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/search' component={Header} />
      </Switch>
    </Router>
    
  )
}

export default App
