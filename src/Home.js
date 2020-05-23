import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'


function Home() {

  return (
    <Fragment>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Rapic
        </p>

        <button>
          <Link to='/sign-in'>Sign In</Link>
        </button>
      </header>
      <main className="container">
      </main>
    </Fragment>
  );
}

export default Home;
