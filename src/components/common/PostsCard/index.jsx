import React, { useMemo, useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, getAllUsers, deletePost,getConnections } from '../../../api/FirestoreAPI'
import LikeButton from '../LikeButton'
import { BsPencil, BsTrash } from 'react-icons/bs'
import './index.scss'

const PostsCard = ({ posts, id, getEditData }) => {

  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({})
  const [allUsers, setAllUesrs] = useState([]);
  const [isConnected, setIsConnected] = useState(false);



  useMemo(() => {
    getCurrentUser(setCurrentUser)
    getAllUsers(setAllUesrs)
  }, [])

  
  useEffect(() => {

    getConnections(currentUser.userID, posts.userID, setIsConnected)

}, [currentUser.userID, posts.userID])
console.log(isConnected)
  //console.log("post card", posts)
  //console.log(allUsers)
  //console.log(currentUser)
  return (
    isConnected || currentUser.userID === posts.userID ?  
    <div className='posts-card' key={id}>

      <div className='post-image-wrapper'>

        {currentUser.userID === posts.userID ? <div className='action-container'>

          <BsPencil size={20} className='action-icon' onClick={() => getEditData(posts)} />
          <BsTrash size={20} className='action-icon' onClick={() => deletePost(posts.id)} />

        </div> : null}
        <img
          src={allUsers.filter((item) => item.id === posts.userID).map((item) => item.imageLink)[0]}
          alt='profile-image'
          className='profile-image'
        />
        <div >
          <p className='name' onClick={
            () => navigate('/profile', {
              state: { id: posts?.userID, email: posts.userEmail }
            })}>
            {allUsers.filter((user) => user.userID === posts.userID)[0]?.name}
          </p>
          <p className='headline'>{allUsers.filter((user) => user.userID === posts.userID)[0]?.headline}</p>
          <p className='timestamp'>{posts.timeStamp}</p>
        </div>


      </div>

{posts.postImage ? <img src={posts.postImage} alt='post-image' />:null}
      <p className='status'>{posts.status}</p>

      <LikeButton currentUser={currentUser} userId={currentUser?.userID} postId={posts.id} />
    
    </div>
    :null
  )
}

export default PostsCard