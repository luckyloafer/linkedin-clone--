import React, { useState, useMemo,useEffect } from 'react'
import ModalComponent from '../Modal'
import { postStatus, getStatus, updatePost, deletePost,getConnections } from '../../../api/FirestoreAPI'
import PostsCard from '../PostsCard'
import { uploadPostImage } from '../../../api/ImageUpload'
import { getCurrentTimeStamp } from '../../../helpers/useMoment'
import { getUniqueID } from '../../../helpers/getUniqueId'
import './index.scss'

const PostStatus = ({ currentUser }) => {

    console.log(currentUser)
    let userEmail = localStorage.getItem('userEmail')
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [allStatuses, setAllStatus] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [currentPost, setCurrentPost] = useState({});
    //const [currentImage, setCurrentImage] = useState({});
    const [postImage, setPostImage] =  useState("");
console.log(postImage)
    const sendStatus = async () => {
        let object = {
            status: status,
            timeStamp: getCurrentTimeStamp('LLL'),
            // userEmail:userEmail,
            userID: currentUser.userID,
            //userID:currentUser.id,
            userEmail: currentUser.email,
            userName: currentUser.name,
            postID: getUniqueID(),
            postImage:postImage
        }
        await postStatus(object)
        await setModalOpen(false)
        setIsEdit(false)
        await setStatus('');
    }

    const getEditData = (posts) => {

        setCurrentPost(posts)
        setModalOpen(true)
        setStatus(posts?.status)
        setIsEdit(true)

    }

    const updateStatus = () => {

        console.log(status)
        updatePost(currentPost.id, status, postImage)
        setModalOpen(false)
    }

    useMemo(() => {
        getStatus(setAllStatus)
    }, [])

    console.log(currentUser)

    return (
        <div className='post-status-main'>

            <div className='user-details'>
                <img src={currentUser.imageLink} alt='imageLink' />
                <p className='name'>{currentUser.name}</p>
                <p className='headline'>{currentUser.headline}</p>
            </div>
            <div className='post-status'>
            <img className='post-image' src={currentUser.imageLink} alt='imageLink' />

                <button className='open-post-modal' onClick={() => {
                    setIsEdit(false)
                    setModalOpen(true)
                }}
                >
                    Start a Post
                </button>
            </div>
            <ModalComponent
                status={status}
                setStatus={setStatus}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                sendStatus={sendStatus}
                isEdit={isEdit}
                updateStatus={updateStatus}
                //setCurrentImage={setCurrentImage}
                uploadPostImage={uploadPostImage}
                setPostImage={setPostImage}
                postImage={postImage}
                currentPost={currentPost}
                setCurrentPost={setCurrentPost}
            />

            <div>
                {allStatuses.map((posts) => {
                    return (
                        <div key={posts.id}>
                            <PostsCard posts={posts} getEditData={getEditData} />
                        </div>

                    )
                })}
            </div>

        </div>
    )
}

export default PostStatus