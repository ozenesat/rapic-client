import React from 'react'
import Footer from './components/Footer'
import Header from './components/Header'

export default function (props) {

  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  )
}
