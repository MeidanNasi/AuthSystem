import React from 'react';
import '../App.css';
import Authentication from '../components/auth'
import { Route } from 'react-router-dom'


function LandingPage() {
  return (
    <div className="App">

      <div className="App-header">
        <p>
          Auth-System-Demo
        </p>
      </div>

      <div>
        <Route path="/" component={Authentication} />
      </div>
      
    </div>
  );
}

export default LandingPage;
