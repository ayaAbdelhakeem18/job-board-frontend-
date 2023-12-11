import  React,{ createContext,useEffect,useState } from 'react'
import Edit_profile from './edit_profile';
import Comp_profile_form from './comp_profile_form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Complete_info({setInformation,userType,done}) {

  const navigate=useNavigate();

    const onSave= async(info)=>{
      setInformation(info);
  }
   return (
    <div>
      {done==='yes'?navigate('/'):
      <>
       {userType==="employer"?
       <Comp_profile_form create={true} onSave={onSave}/>
       :
       <Edit_profile create={true} onSave={onSave}/>
       }
      </>
      }
    </div>
  )
}

export default Complete_info;
