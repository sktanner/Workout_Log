import './App.css';
import React, { Component, useEffect, useState } from 'react'
import Sitebar from './Home/Navbar'
import Auth from './auth/Auth';

function App() {
  const [sessionToken, setSessionToken] = useState('')

  useEffect(() => {
    if (localStorage.getItem('token')) {
      sessionToken(localStorage.getItem('token'))
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken)
    sessionToken(newToken)
    console.log(sessionToken)
  }

  return (
    <div>
      <Sitebar />
      <Auth updateToken={updateToken} />
    </div>
  );
}

export default App;