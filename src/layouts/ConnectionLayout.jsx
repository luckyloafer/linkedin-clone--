import React ,{useMemo, useState}from 'react'
import Connections from '../Pages/Connections'
import { getCurrentUser } from '../api/FirestoreAPI'
import Topbar from '../components/common/Topbar'


const ConnectionLayout = () => {

  const [currentUser, setCurrentUser] = useState({})

  useMemo(()=>{
    getCurrentUser(setCurrentUser)
  },[])
  return (

    <div>
      <Topbar />
      <Connections currentUser={currentUser}/>
    </div>
  )
}

export default ConnectionLayout