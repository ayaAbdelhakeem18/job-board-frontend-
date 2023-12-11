import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styling/CompanyProfile.css';
import Comp_profile_form from './comp_profile_form';
import axios from 'axios';

const CompanyProfile = (props) => {
  const [info, setInfo] = useState({
    logo: null,
    name: "",
    location: "",
    description: "",
  });
  const [activityData,setActivityData]=useState();
  const [editForm, setEditForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getdata=async(id)=>{
      try{
        let response= await axios.get(`http://127.0.0.1:8000/api/employer_activity/${id}`);
        setActivityData(response.data.data)
      }catch(error){
       console.log(error);
      }
  }
    if (props.info) {
      setInfo(props.info);
      let id =props.info.id;
        getdata(id);
    }
  }, [props.info]);

  const formClick = () => {
    setEditForm(!editForm);
  };
 
  const onSave = (i) => {
    setInfo({
      Logo: i.Logo,
      name: i.name,
      location: i.location,
      description: i.description,
    });
    props.setInformation(i);
  };

  return (
    <div className="profile-container">

      {activityData?
      !(props.view)?
      props.authStatus==true?props.userType==="candidate"?navigate("/profile"):
      props.info?
      <>
      <div className="profile-header">
        {info.logo? <img src={`http://127.0.0.1:8000/storage/${info.logo}`} alt="Company Logo" />:""}
        <h2>{info.name}</h2>
      </div>

      <div className="profile-info">
        <h3>Company Information</h3>
        <p><span>Location: </span>{info.location}</p>
        <p><span>Description: </span>{info.description}</p>

        <button className="edit-button" onClick={formClick}>Edit Profile</button>
        {editForm && <Comp_profile_form onSave={onSave} formClick={formClick} defaultInfo={info} />}
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>

        {activityData.map((e,i)=>{
           const originalDateString = e.created_at; 
           const date = originalDateString.substring(0, 10);
           const link=(info.name).replace(/\s/g, "");
        return(
        <div key={i} className="activity-item d-flex justify-content-between"><p>Posted a job opening for <Link to={`/${link+e.id}`}>{e.title}</Link> on {date}</p></div>
        )})}

      </div>
      </>:<div className='alert alert-danger'>Your profile wasn't created yet please complete your info from <Link to={'/register'}>here</Link></div>
      :<div className='alert alert-primary'>Please login to access your profile</div>
      :
      <>
      <div className="profile-header">
        {props.company.logo?<img src={`http://127.0.0.1:8000/storage/${props.company.logo}`} alt="Company Logo" />:""}
        <h2>{props.company.name}</h2>
      </div>

      <div className="profile-info">
        <h3>Company Information</h3>
        <p><span>Location: </span>{props.company.location}</p>
        <p><span>Description: </span>{props.company.description}</p>

        <div className="recent-activity">
        <h3>Recent Activity</h3>

        {activityData.map((e,i)=>{
           const originalDateString = e.created_at; 
           const date = originalDateString.substring(0, 10);
           const link=(info.name).replace(/\s/g, "");
        return(
        <div key={i} className="activity-item d-flex justify-content-between"><p>Posted a job opening for <Link to={`/${link+e.id}`}>{e.title}</Link> on {date}</p></div>
        )})}

        
      </div>
      </div>
      </>:<p>Loading</p>
      }
      
    </div>
  );
};

export default CompanyProfile;
