import { Component } from 'react'
import { withRouter } from 'react-router-dom'

class SignOut extends Component {
  componentDidMount () {
    console.log('signed out')
    // add api call here
  }

  render () {
    return ''
  }
}

export default withRouter(SignOut)
