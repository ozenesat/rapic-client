import React from 'react'
import Footer from './components/Footer'
import Header from './components/Header'

export default function (props) {
  console.log('props', props)
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  )
}
