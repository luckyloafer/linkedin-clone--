import React ,{useMemo, useState}from 'react'
import Home from '../Pages/Home'
import { getCurrentUser } from '../api/FirestoreAPI'
import Topbar from '../components/common/Topbar'


const HomeLayout = () => {

  const [currentUser, setCurrentUser] = useState({})

  useMemo(()=>{
    getCurrentUser(setCurrentUser)
  },[])
  return (

    <div>
      <Topbar />
      <Home currentUser={currentUser}/>
    </div>
  )
}

export default HomeLayout