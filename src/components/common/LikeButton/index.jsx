import React, { useMemo, useState } from 'react'
import { AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai'
import { likePost, getLikesByUser, postComment, getComments } from '../../../api/FirestoreAPI'
import { getCurrentTimeStamp } from '../../../helpers/useMoment'
import './index.scss'

const LikeButton = ({ userId, postId, currentUser }) => {

    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([]);

    const handleLike = () => {
        likePost(userId, postId, liked)
    }

    const addComment = async () => {
        await postComment(postId, comment, getCurrentTimeStamp('LLL'), currentUser?.name)
        // .then(()=>{
        //     setComment('')
        // })
        setComment('')
    }

    const getComment = (event) => {
        setComment(event.target.value)
    }

    useMemo(() => {
        getLikesByUser(userId, postId, setLiked, setLikesCount)
        getComments(postId, setComments)
    }, [userId, postId])

    return (
        <div className='like-container' >
            <p>{likesCount} people liked </p>
            <div className='hr-line'>
                <hr />
            </div>
            <div className='like-comment'>
                <div className='likes-comment-inner' onClick={handleLike}>
                    {liked ? <AiFillLike color='#0a66c2' size={30} /> : <AiOutlineLike size={30} />}
                    <p className={liked ? 'blue' : 'black'}>Like</p>
                </div>

                <div className='likes-comment-inner' onClick={() => setShowCommentBox(!showCommentBox)} >
                    <AiOutlineComment size={30} color={showCommentBox ? "#0a66c2" : '#212121'} />
                    <p className={showCommentBox ? 'blue' : 'black'}>Comment</p>
                </div>
            </div>

            {showCommentBox ? <>
                <input onChange={getComment} placeholder='Add a Comment' className='comment-input' name='comment' value={comment} />
                <button className='add-comment-btn' onClick={addComment}>Add Comment</button>

                {comments.length > 0 ? comments.map((comment) => {
                    return (
                        <div className='all-comments'>
                            
                                <p className='name'>{comment.name}</p>
                                <p className='comment'>{comment.comment}</p>
                                <p className='timestamp'>{comment.timeStamp}</p>
                            
                        </div>
                    )
                })
                    : <></>}
            </>
                : <></>
            }



        </div>
    )
}

export default LikeButton