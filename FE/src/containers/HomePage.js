import React from 'react';
import '../App.css';
import { logout } from './../services/authService';
function HomePage() {
  return (
    <div className="App">
      Home
      <button
      onClick={()=>{
        logout()
        window.location("/"); // redirect to landing page.
      }}
      > 
      logout
      </button>
    </div>
  );
}

export default HomePage;
