import React, { useMemo, useState } from 'react'
import { onLogout } from '../../../api/AuthAPI'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../../api/FirestoreAPI'
import Button from '../Button'

const ProfilePopup = () => {

  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  })

  return (
    <div className='popup-card'>
      <p className='name'>{currentUser.name}</p>
      <p className='headline'>{currentUser.headline}</p>


      <Button title='View Profile'

        onClick={() => {
          navigate('/profile', {
            state: {
              id: currentUser?.userID
            }
          })
        }}
      />

      <Button title='Log out'

        onClick={onLogout}
      />

      {/* <li className='popup-option' onClick={onLogout}>
        Logout
      </li> */}
      {/* <ul className='popup-options'>
            <li className='popup-option' onClick={onLogout}>Logout</li>
        </ul> */}
    </div>
  )
}

export default ProfilePopup