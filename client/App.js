import React from 'react'
import axios from 'axios'
import './styles/styles.scss'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { status: "" }
  }

  async componentDidMount() {
    const response = await axios.get("/api/something")
    const data = await response.data

    this.setState({ status: data.status })
  }

  render () {
    return (
      <h1>Hello! {this.state.status}</h1>
    )
  }
}
