import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import ProtectedRoute from '../components/protectedRoute';
import '../App.css';

function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute path="/home" component={HomePage} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
}

export default App;
