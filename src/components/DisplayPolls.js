import React, { Component } from 'react'
import { connect } from 'react-redux'
import PollLink from './PollLink'

class DisplayPolls extends Component {
    state ={
        unanswered: true
    }
    toggleView = () => {
        /*
          @description local state determines whether array of answered or unanswered
            questions are displayed
        */
        this.setState((prevState) => ({
            unanswered: !prevState.unanswered
        }))
    }
    render() {
        const { answeredQuestions, unansweredQuestions } = this.props
        return (
            <div className="display-polls">
              <h2>Polls</h2>
              <button onClick={this.toggleView}>
                {this.state.unanswered === true ? 'View answered Questions': 'View unanswered Questions'}
              </button>
              {this.state.unanswered === true ?
                unansweredQuestions.map((poll) => (
                    <div key={poll.id} className="poll-layout">
                        <PollLink poll={poll}/>
                    </div>
                )) :
                answeredQuestions.map((poll) => (
                    <div key={poll.id} className="poll-layout">
                      <PollLink poll={poll}/>
                    </div>
                ))
              }
            </div>
        )
    }
}

function mapStateToProps ({ polls, authedUser }){
    /*
      @description polls are mapped to array by their id. That array is then mapped
        into array of each poll's data. That array is then filtered to return one
        array of questions answered by authedUser and another of questions unanswered
        by authedUser.
    */
    const pollsArray = Object.keys(polls)
      .sort((a,b) => polls[b].timestamp - polls[a].timestamp)
    const questionsToFilter = pollsArray.map((poll) => {
        const pollData = polls[poll]
        return pollData
    })
    const answeredQuestions = questionsToFilter.filter((poll) =>{
        return poll.optionOne.votes.includes(authedUser) || poll.optionTwo.votes.includes(authedUser)
    })
    const unansweredQuestions = questionsToFilter.filter((poll) =>{
        return !poll.optionOne.votes.includes(authedUser) && !poll.optionTwo.votes.includes(authedUser)
    })
    const testUser = polls['8xf0y6ziyjabvozdd253nd']
    return {
        pollsId: pollsArray,
        polls: questionsToFilter,
        testUser,
        answeredQuestions,
        unansweredQuestions,
    }
}

export default connect(mapStateToProps)(DisplayPolls)