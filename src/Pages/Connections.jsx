import React,{useEffect,useState} from 'react'
import ConnectionsComponent from '../components/ConnectionsComponents';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../firebaseConfig'
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

const Connections = ({currentUser}) => {

   const navigate = useNavigate();

   const [loading,setLoading] = useState(true);

  useEffect(()=>{

    onAuthStateChanged(auth, res=>{
      if(!res?.accessToken){
        navigate('/')
     }
     else{
      setLoading(false);
     }
    })

  },[])
  return <>
    {loading ? <Loader/>:<ConnectionsComponent currentUser={currentUser}/>}
  </>
}

export default Connections