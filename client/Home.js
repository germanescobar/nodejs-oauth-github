import React from 'react'
import axios from 'axios'
import auth from './auth'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { status: "" }
  }

  async componentDidMount() {
    const response = await axios.get('/api/something', {
      headers: { 'Authorization': auth.token }
    })
    const data = response.data

    this.setState({ status: data.status })
  }

  render() {
    return <h1>Hello from Home (Private Route)!</h1>
  }
}
