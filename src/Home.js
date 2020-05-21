import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import Deneme from './Deneme'

function Home() {
  return (
    <Fragment>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Rapic.io
        </p>
      </header>
      <main className="container">
      <Route exact path={'/deneme'} component={Deneme} />
      </main>
    </Fragment>
  );
}

export default Home;
