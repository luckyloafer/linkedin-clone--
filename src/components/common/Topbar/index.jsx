import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import linkedinLogo from '../../../assets/linkedinLogo.png'
import { AiOutlineHome, AiOutlineUserSwitch, AiOutlineSearch, AiOutlineMessage, AiOutlineBell } from "react-icons/ai"
import { BsBriefcase } from 'react-icons/bs'
import usericon from '../../../assets/usericon.png'
import ProfilePopup from '../ProfilePopup'
import SearchUsers from '../SearchUsers'
import { getAllUsers } from '../../../api/FirestoreAPI'
import './index.scss'

const Topbar = () => {

  const navigate = useNavigate();

  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const goToRoute = (route) => {
    navigate(route);
  }

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const handleSearch = ()=>{

    if(searchInput !== ''){
      let searched =  users.filter((user)=>{
        return Object.values(user)
        .join('')
        .toLowerCase()
        .includes(searchInput.toLowerCase())
      })
  
      setFilteredUsers(searched)
    }

    else{

      setFilteredUsers(users)
    }
   
  }

  useEffect(()=>{

    let debounced = setTimeout(()=>{
       handleSearch()
    }, 1000)

    return ()=> clearTimeout(debounced)
  },[searchInput])

  useEffect(() => {
    getAllUsers(setUsers)
  }, [])


  return (
    <div className='topbar-main'>

      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}



      <img src={linkedinLogo} alt='LinkedinLogo' className='linkedin-logo' />

      {isSearch ? <SearchUsers setIsSearch={setIsSearch} setSearchInput={setSearchInput} /> :
        <div className='react-icons'>
          <AiOutlineSearch size={30} className='react-icon' onClick={() => setIsSearch(true)} />
          <AiOutlineHome size={30} className='react-icon' onClick={() => goToRoute("/home")} />
          <AiOutlineUserSwitch size={30} className='react-icon' onClick={() => goToRoute("/connections")} />
          {/* <BsBriefcase size={30} className='react-icon' />
          <AiOutlineMessage size={30} className='react-icon' />
          <AiOutlineBell size={30} className='react-icon' /> */}

        </div>}
      <img src={usericon} alt='usericon' className='user-logo' onClick={displayPopup} />

      {searchInput.length === 0 ?
        <></>
        : 
        <div className='search-results'>

          {filteredUsers.length===0 ?    
          
          (
            <div>No users found</div>
          )
          
          : (filteredUsers.map((user) => (

            <div className='search-inner'>
              <img src={user.imageLink} />
              <p className='name'>{user.name}</p>
            </div>

          )))}

        </div>

        }

    </div>
  )
}

export default Topbar