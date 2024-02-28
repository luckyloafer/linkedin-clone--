import React,{useEffect, useState} from 'react'

import { getConnections } from '../../../api/FirestoreAPI'

const ConnectedUsers = ({currentUser,user, getCurrentUser}) => {

  const [isConnected, setIsConnected]  = useState(false);

  useEffect(() => {

    getConnections(currentUser.userID, user.userID, setIsConnected)

}, [currentUser.userID, user.userID])


  return (
    !isConnected?
    <div className='grid-child' > 

    <img src={user.imageLink}/>
    <p className='name'>{user.name}</p>
    <p className='headline'>{user.headline}</p>

    <button onClick={()=> getCurrentUser(user.id)}>Connect</button>
    </div>
    :
    null

  )
}

export default ConnectedUsers