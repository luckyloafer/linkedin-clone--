import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import './index.scss'

const SearchUsers = ({ setIsSearch, setSearchInput }) => {
  return (
    <div className='search-users'>
      <input placeholder='Search Users...' onChange={(e) => setSearchInput(e.target.value)} />
      <AiOutlineCloseCircle
        className='close-icon'
        size={20}
        onClick={() => {
          setIsSearch(false)
          setSearchInput("")
        }} />
    </div>

  )
}

export default SearchUsers