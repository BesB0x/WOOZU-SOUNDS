import { useEffect, useState } from 'react'
import { useParams,useLocation } from 'react-router-dom'
import axios from 'axios'

// Error imports
import Error from '../common/Error'

// Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { authenticated } from '../helpers/auth'



const Comments = () => {

  //! Comment State

  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState({
    text: '' ,
  })
  const [ submit,setSubmit ] = useState(true)

  // ! Error State

  const [postError, setPostError] = useState('')
  const [commentError, setCommentError] = useState('')

  
  const { stageId } = useParams()
  

  // ! On Mount and onSubmit

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await axios.get(`/api/stages/${stageId}/comments`)
        setComments(data)
      } catch (error) {
        setCommentError(error.response.data.message)
      }
    }
    getComments()
    
  }, [submit])
  

  // ! Executions

  const handleChange = (e) => {
    setNewComment({ ...newComment, text: e.target.value })
    setPostError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await authenticated.post(`/api/stages/${stageId}/comments`, newComment)
      setSubmit(!submit)
    } catch (error) {
      console.log(error.response)
      setPostError(' •–• text required •–• ')
    }
  }

  return (
    <>
      <h1> Comments </h1>
      <Container>
        <Col as='form' onSubmit={handleSubmit} >
          <Row>
            <label>Post A Comment</label>
            <input type='text' name='comment' placeholder='Comment' onChange={handleChange} value= {newComment.text}/>
            <button>Post</button>
            { postError && <Error error={postError} />}
          </Row>
        </Col>
      </Container>
      {comments.length > 0 ?
        comments.map((comment,i) => {
          const { text, likes, owner: { username } } = comment
          return (
            <div key={i}>
              <h4> {username} </h4>
              <p> {text} </p>
              <p> {likes.length} </p>
            </div>
          )
        })
        :
        <>
          {commentError ?
            <Error error={commentError} />
            :
            <p> No Comments Yet! </p>}
        </>
      }

    </>
  )

}

export default Comments