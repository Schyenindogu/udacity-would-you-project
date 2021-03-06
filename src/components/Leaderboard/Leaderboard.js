import React from 'react'
import { connect } from 'react-redux'
import LeadUserDisplay from './LeadUserDisplay'

const Leaderboard = ({usersId}) => {
  return (
    <div className="container display-component">
      <h1 className="display-4 mb-4 text-center">Welcome to the leaderboard!</h1>
      <div>
        {usersId.map((user, index) => {
          const id = user.id
          const userAnswers = Object.keys(user.userData.answers).length
          const userData = user.userData
          return (
            <div key={index}>
              <LeadUserDisplay key={id} userAnswers={userAnswers} userData={userData} className=""/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function mapStateToProps ({ users }){
  /*
    @description object of user ids are extracted from store. ids are used
      to return an array of objects that have the sum of the users questions asked and 
      quetions answered, the user id and the user's data. the objects are then sorted
      by the score.
  */
  const usersIds = Object.keys(users)
  const sortTotals = usersIds.map((userId) => {
  	const userData = users[userId]
  	const answerLength = Object.keys(userData.answers).length
  	const total = answerLength + userData.questions.length
  	return { 'userScore': total, 'user': userId, 'userData': userData }
  })
  return {
    usersId: sortTotals.sort((a,b) => {
      return b.userScore - a.userScore
    })
  }
}

export default connect(mapStateToProps)(Leaderboard)