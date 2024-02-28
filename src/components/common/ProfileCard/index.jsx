import React, { useState, useMemo, useEffect } from 'react'
import PostsCard from '../PostsCard'
import { getStatus, getSingleStatus, getSingleUser, editProfile } from '../../../api/FirestoreAPI'
import { useLocation } from 'react-router-dom'
// import ProfileEdit from '../ProfileEdit'
import { HiOutlinePencil } from 'react-icons/hi'
import FileUploadModal from '../FileUploadModal'
import { uploadImage as uploadImageAPI } from '../../../api/ImageUpload'
import './index.scss'

const ProfileCard = ({ currentUser, onEdit }) => {

  let location = useLocation();

  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({})
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false)
  //const [imageLink, setImageLink] = useState('')

  const getImage = (event) => {
    setCurrentImage(event.target.files[0])
  }

  const uploadImage = () => {
    uploadImageAPI(currentImage, currentUser.userID,setModalOpen,setProgress,setCurrentImage)
    //setCurrentImage({})
  }

  useMemo(() => {

    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }

    // if(!location){
    //   getStatus(setAllStatus)
    // }
    // getStatus(setAllStatus)
  }, [])

  //   console.log(currentUser)
  //   useEffect(()=>{
  // editProfile(currentUser?.userID, imageLink)

  //   },[imageLink])

  //console.log(allStatuses)
  return (
    <>
      <FileUploadModal 
      getImage={getImage} 
      uploadImage={uploadImage} 
      modalOpen={modalOpen} 
      setModalOpen={setModalOpen} 
        currentImage={currentImage}
        progress={progress}
      />
      <div className='profile-card'>

        <div className='edit-btn'>
          <HiOutlinePencil className='edit-icon' onClick={onEdit} />

        </div>
        <div className='profile-info'>
          <div>

            <img className='profile-image'

              //onClick={()=>setModalOpen(true)}
              onClick={Object.values(currentProfile).length === 0
                ? ()=>setModalOpen(true)
                : null}

              src={Object.values(currentProfile).length === 0
                ? currentUser.imageLink
                : currentProfile?.imageLink
              }
              alt='profileImg'


            />
            <h3 className='username'>

              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name
              }
            </h3>
            {/* <p className='userEmail'>{currentUser.email}</p> */}
            <p className='heading'>

              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline
              }
            </p>
            <p className='location'>
              {Object.values(currentProfile).length === 0
                ? `${currentUser.city}, ${currentUser.country} `
                : `${currentUser.city}, ${currentUser.country} `
              }
            </p>

            <a className='website' target='_blank' href={Object.values(currentProfile).length === 0
              ? `${currentUser.website}`
              : currentProfile?.website
            }>
              {/* {Object.values(currentProfile).length === 0
                ? `${currentUser.website}`
                : currentProfile?.website
              } */}
              Website
            </a>

          </div>
          <div className='right-info'>
            <p className='college'>
              {Object.values(currentProfile).length === 0
                ? currentUser.college
                : currentProfile?.college
              }
            </p>
            <p className='company'>
              {Object.values(currentProfile).length === 0
                ? currentUser.company
                : currentProfile?.company
              }
            </p>
          </div>
        </div>

        <p className='about-me'>
          {Object.values(currentProfile).length === 0
            ? `${currentUser.aboutMe} `
            : currentProfile?.aboutMe
          }
        </p>

        <p className='skills'>

          <span className='skill-label'>Skills</span>:&nbsp;
          {Object.values(currentProfile).length === 0
            ? `${currentUser.skills} `
            : currentProfile?.skills
          }
        </p>

      </div>
      <div className='profile-status-main'>
        {allStatuses?.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} />
            </div>

          )
        })}
      </div>
    </>

  )
}

export default ProfileCard