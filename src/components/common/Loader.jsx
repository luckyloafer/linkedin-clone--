import React from 'react'
import { Space ,Spin} from 'antd'
import './common.scss'

const Loader = () => {
  return (
    <div className='loader'>
      Loading Please wait
    <Space size="middle">
    <Spin size='large' />
    </Space>
        
    </div>
  )
}

export default Loader