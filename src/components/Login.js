import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
  /*
    @description users from store are used to fill out options. upon selection.
      set authedUser is dispatched.
  */
  handleUserLogin = (event) => {
    const selection = event.target.value !== 'none' ? event.target.value : null
    const { dispatch } = this.props
    dispatch(setAuthedUser(selection))
    if(this.props.location.pathname === '/Login'){
      return this.props.history.push('/')
    }
    
  }
  render() {
    const checkNull = (user) => {
      if(user !== null){
        return user
      } else {
        return 'none'
      }
    }
    return (
      <div className="login-pad">
        <div className="container half-trim">
          {this.props.authedUser !== null ? <h1 className="display-4 pb-4 text-center">Hello {this.props.authedUser}</h1> : <h1 className="display-4 pb-4 text-center">Login to access page</h1>}
          <select 
            onChange={this.handleUserLogin} 
            value={checkNull(this.props.authedUser)}
            className="custom-select">
          {this.props.usersId.map((user) => (
            <option
              value={user} 
              key={user}
              defaultValue={user === this.props.authedUser}
              >{checkNull(user)}</option>
            )
          )}
          </select>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    usersId: Object.keys(users).concat(null)
  }
}

export default withRouter(connect(mapStateToProps)(Login))