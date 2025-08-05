import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Loginpage extends Component {
  state = {
    username: '',
    password: '',
    errormessage: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userdetails = {username, password}
    const url = ' https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    this.setState({username: '', password: ''})
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    }
    this.setState({errormessage: data.error_msg})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderusername = () => {
    const {username} = this.state
    return (
      <>
        <label className="label" htmlFor="USERNAME">
          USERNAME
        </label>

        <input
          type="text"
          className="input-element"
          id="USERNAME"
          value={username}
          placeholder="Username"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderpassword = () => {
    const {password} = this.state
    return (
      <>
        <label className="label" htmlFor="PASSWORD">
          PASSWORD
        </label>

        <input
          type="password"
          className="input-element"
          id="PASSWORD"
          value={password}
          placeholder="Password"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {errormessage} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-con">
        <form className="form" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="img-logo"
          />
          <div className="label-con">
            {this.renderusername()}
            {this.renderpassword()}
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
          <p className="error-message">{errormessage}</p>
        </form>
      </div>
    )
  }
}
export default Loginpage
