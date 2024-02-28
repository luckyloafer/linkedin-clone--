import React from 'react'
import '../Sass/HomeComponent.scss'
import PostStatus from './common/PostUpdate'

const HomeComponent = ({currentUser}) => {
  return (
    <div className='home-component'>
    <PostStatus currentUser={currentUser}/>
    </div>
  )
}

export default HomeComponent