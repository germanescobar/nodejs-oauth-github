import React from 'react'
import { Redirect } from 'react-router-dom'
import auth from './auth'
import axios from 'axios'
import queryString from 'query-string'

export default class GithubCallback extends React.Component {
  constructor(props) {
    super(props)
    console.log("Constructor!")
    this.state = { redirect: false }
  }

  async componentDidMount() {
    // recibir el código del query string
    const query = queryString.parse(location.search)

    console.log("Code: ", query.code);
    // llamar al servidor nuestro para que obtenga el token
    const response = await axios.post('/auth/github/token', { code: query.code })
    const token = response.data.token

    // actualizar la autenticación
    if (token) {
      auth.isAuthenticated = true
      auth.token = token
      this.setState({ redirect: true })
    }
  }

  render() {
    return this.state.redirect ? <Redirect to="/" /> : <h1>Autenticando ...</h1>
  }
}
