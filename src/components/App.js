import React, { Component, Fragment } from 'react'
import '../App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './Login'
import Leaderboard from './Leaderboard'
import { handleInitialData } from '../actions/shared'
import NavBar from './NavBar'
import DisplayPolls from './DisplayPolls'
import PollPage from './PollPage'
import AddPoll from './AddPoll'
import NotFoundPage from './NotFoundPage'
// import LoadingBar from 'react-redux-loading'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
        <NavBar />
        <div>
          <Route path='/login' exact render={() => (<Login message={'access all pages'}/>)}/>
          <Route path='/leaderboard' exact render={() => (
            this.props.loggedIn ? <Leaderboard /> : <Login message={'view Leaderboard'}/>
          )}/>
          <Route path='/' exact render={() => (
            this.props.loggedIn ? <DisplayPolls /> : <Login message={'view questions'}/>
          )}/>
          
          <Route path='/add' exact render={() => (
            this.props.loggedIn ? <AddPoll /> : <Login message={'add question'}/>
          )}/>
          
          <Route path='/questions/:id' render={() => (
            this.props.loggedIn ? <PollPage /> : <NotFoundPage />
          )}/>
        </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }){
  return {
    loggedIn: authedUser !== null ? true : false
  }
}

export default connect(mapStateToProps)(App)

// <Route path='/questions/:id' component={PollPage}/>
