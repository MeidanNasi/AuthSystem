import React from 'react';
import '../App.css';
import { logout } from './../services/authService';
function HomePage() {
  return (
    <div className="App">
      Home
      <button className="button"
      onClick={()=>{
        logout()
        //redirect to first page.
      }}
      > 
      logout
      </button>
    </div>
  );
}

export default HomePage;
