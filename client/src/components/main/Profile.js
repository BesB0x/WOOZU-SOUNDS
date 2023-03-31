import { useCallback, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

// Custom imports
import { authenticated, includesUserId, isAuthenticated } from '../helpers/auth'
import ProfileImage from './ProfileImage'
import { Error } from '../common/Error'

const Profile = ({ getUser, user }) => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [userComments, setUserComments] = useState([])
  const [stages, setStages] = useState([])
  const [error, setError] = useState('')

  // ! On Mount
  useEffect(() => {
    !isAuthenticated() && navigate('/')
    const getComments = async () => {
      try {
        const { data } = await axios.get('/api/stages')
        setStages(data)
        const comments = data.sort((a, b) => a.name > b.name ? 1 : -1).map(stage => stage.comments)
        const userComments = comments.map(comments => comments.filter(comment => comment.owner._id === userId))
        setUserComments(userComments)
      } catch (err) {
        console.log(err)
        setError(err.response)
      }
    }
    getComments()
  }, [])

  return (
    <div className='profile-page'>
      <div className='profile-top'>
        <h1 className='profile-title'>Profile</h1>
        <div className='info'>
          <ProfileImage userId={userId} getUser={getUser} user={user} />
          <div className='info-username-email'>
            <h3>username: @{user.username}</h3>
            <h3>email: {user.email}</h3>
          </div>
        </div>
      </div>
      <div className='profile-bottom'>
        <div>
          <h2 className='profile-bottom-title'>Attendance</h2>
          {stages &&
            stages.sort((a, b) => a.name > b.name ? 1 : -1).map(stage => {
              const { attendance, _id } = stage
              if (includesUserId(attendance)) {
                return (
                  <div className='attendance-comments' key={_id}>
                    <h2 className='attendance-comments-title'>{stage.name}</h2>
                    <p className='attendance-comments-text attending'>Attending!</p>
                  </div>
                )
              } else {
                return (
                  <div className='attendance-comments' key={_id}>
                    <h2 className='attendance-comments-title'>{stage.name}</h2>
                    <p className='attendance-comments-text not-attending'>Not Attending</p>
                  </div>
                )
              }
            })
          }
        </div>
        <div>
          <h2 className='profile-bottom-title'>Comments</h2>
          {userComments &&
            userComments.map((stage, i) => {
              if (stage.length > 0) {
                return (
                  <div className='attendance-comments' key={i}>
                    <h2 className='attendance-comments-title'>{stages[i].name}</h2>
                    <ul>
                      {stage.map((comment, i) => {
                        return <li key={i} className='attendance-comments-text'>{comment.text}</li>
                      })}
                    </ul>
                  </div>
                )
              } else {
                return (
                  <div className='attendance-comments' key={i}>
                    <h2 className='attendance-comments-title'>{stages[i].name}</h2>
                    <p key={i} className='attendance-comments-text'>No Comment</p>
                  </div>
                )
              }
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Profile