import React from 'react'
import { Link } from 'react-router-dom'

const PollLink = ({poll}) => {
  const { id, optionOne, optionTwo } = poll
  const teaseOne = optionOne.text.substring(0, 10)
  const teaseTwo = optionTwo.text.substring(0, 10)
  return (
    <div className="card card-body card-preview">
      <h5 className="">Would you rather...</h5>
      <p>{teaseOne}......</p>
      <p>{teaseTwo}......</p>
      <Link 
        to={`/questions/${id}`}
        className="btn btn-primary btn-lg"
      >
        View full Poll
      </Link>
    </div>
  )
}

export default PollLink