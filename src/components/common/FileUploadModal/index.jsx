import React, { useState } from 'react';
import { Button, Modal, Progress, Space } from 'antd';
import './index.scss'

const FileUploadModal = ({ modalOpen, setModalOpen, getImage, uploadImage, currentImage, progress }) => {
    return (
        <div>
            <Modal
                title="Add a profile image"
                centered
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
                footer={[

                    <Button disabled={currentImage.name ? false : true} key="submit" type="primary" onClick={uploadImage} >
                        Upload Profile Picture
                    </Button>,

                ]}
            >
                <div className='image-upload-main'>
                    <p>{currentImage.name}</p>
                    <label className='upload-btn' for="image-upload">Add an Image</label>

                    {progress===0? (<></>):<div className='progress-bar'>
                        <Progress type='circle' percent={progress} />
                    </div>}


                    <input hidden id="image-upload" type='file' onChange={getImage} />

                </div>

            </Modal>
        </div>
    )
}

export default FileUploadModal