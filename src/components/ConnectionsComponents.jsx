import React, { useEffect, useState } from 'react'
import { getAllUsers, addConnection, getConnections } from '../api/FirestoreAPI'
import ConnectedUsers from './common/ConnectedUsers'

import '../Sass/ConnectionsComponent.scss'

const ConnectionsComponent = ({ currentUser }) => {

    const [users, setUsers] = useState([]);


    const getCurrentUser = (id) => {

        console.log(id)
        addConnection(currentUser.userID, id)
    }

    useEffect(() => {

        getAllUsers(setUsers)
    }, [])




    return (
        <div className='connections-main'>
            {users.map((user) => {
                return user.id === currentUser.userID ?
                    <></>
                     :
                    <ConnectedUsers currentUser={currentUser} user={user} getCurrentUser={getCurrentUser} />
            })}
        </div>
    )
}

export default ConnectionsComponent