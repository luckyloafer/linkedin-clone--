import React, { useState } from 'react'
import { editProfile } from '../../../api/FirestoreAPI';
import {AiOutlineClose} from 'react-icons/ai'
import './index.scss'

const ProfileEdit = ({ onEdit, currentUser }) => {

    const [editInputs, setEditInputs] = useState(currentUser);

    const getInput = (event) => {
        let { name, value } = event.target;
        let input = { [name]: value };
        setEditInputs({ ...editInputs, ...input })
    }

    const updateProfileData = async () => {
        console.log(currentUser?.userID);
        await editProfile(currentUser?.userID, editInputs)
        await onEdit();
    }

    return (
        <div className='profile-card'>
        
            <div className='edit-btn'>
                <AiOutlineClose className='close-icon' size={25} onClick={onEdit}/>
        
            </div>

            <div className='profile-edit-inputs'>

                <label>First Name</label>
                <input onChange={getInput} name='name' className='common-input' placeholder='Name' value={editInputs.name} />

                <label>Headline</label>
                <input onChange={getInput} name='headline' className='common-input' placeholder='Headline' value={editInputs.headline} />

                <label>Country</label>
                <input onChange={getInput} name='country' className='common-input' placeholder='Country' value={editInputs.country} />
                
                <label>City</label>
                <input onChange={getInput} name='city' className='common-input' placeholder='City' value={editInputs.city} />
                
                <label>Comapny</label>
                <input onChange={getInput} name='company' className='common-input' placeholder='Company' value={editInputs.company} />
                
                <label>Industry</label>
                <input onChange={getInput} name='industry' className='common-input' placeholder='Industry' value={editInputs.industry} />
           
                <label>College</label>
                <input onChange={getInput} name='college' className='common-input' placeholder='College' value={editInputs.college} />
                
                <label>Website</label>
                <input onChange={getInput} name='website' className='common-input' placeholder='Website' value={editInputs.website} />
                
                <label>About</label>
                <textarea onChange={getInput} name='aboutMe' className='common-textArea' placeholder='About' value={editInputs.aboutMe}/>
                {/* <input onChange={getInput} name='location' className='common-input' placeholder='Location' value={editInputs.location} /> */}
                
                <label>Skills</label>
                <input onChange={getInput} name='skills' className='common-input' placeholder='Skills' value={editInputs.skills} />
                
            </div>
            <div className='save-container'>
                <button onClick={updateProfileData} className='save-btn' >Save</button>
            </div>

        </div>

    )
}

export default ProfileEdit