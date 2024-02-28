import React, { useState } from 'react';
import { Button, Modal, Progress } from 'antd';
import { AiOutlinePicture } from 'react-icons/ai'

import './index.scss'

const ModalComponent =
    ({ modalOpen,
        setModalOpen,
        setStatus,
        status,
        sendStatus,
        isEdit,
        updateStatus,
        setPostImage,
        uploadPostImage,
        postImage,
        currentPost ,
        setCurrentPost
}) => {

        const [progress, setProgress] = useState(0);

        return (
            <>

                <Modal
                    title="Create a Post"
                    centered
                    open={modalOpen}
                    onOk={() => {
                        setStatus('')
                        setModalOpen(false)
                        setPostImage("")
                        setCurrentPost({})
                    }}

                    onCancel={() => {
                        setStatus('')
                        setModalOpen(false)
                        setPostImage("")
                        setCurrentPost({})
                    }}

                    footer={[
                        <Button
                            key="submit"
                            type='primary'
                            disabled={status.length > 0 ? false : true}
                            onClick={isEdit ? updateStatus : sendStatus}
                        >
                            {isEdit ? 'Update' : 'Post'}
                        </Button>
                    ]}
                >
                    <div className='posts-body'>
                        <textarea
                            className='modal-input'
                            rows={3}
                            cols={3}
                            placeholder='What do you want to talk about'
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
                        />

                        {progress === 0 || progress === 100 ? null
                            :
                            <div className='pogress-bar'>
                                <Progress type="circle" percent={progress} />
                            </div>
                        }
                        {postImage?.length > 0 || currentPost?.postImage?.length ? <img src={postImage || currentPost?.postImage} className='preview-image' alt='postImage' /> : null}
                    </div>
                    <label for='pic-upload'><AiOutlinePicture size={35} className='picture-icon' /></label>
                    <input id='pic-upload' type='file' hidden onChange={(e) => uploadPostImage(e.target.files[0], setPostImage, setProgress)} />


                </Modal>
            </>
        );
    };
export default ModalComponent;