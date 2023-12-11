import React,{useState,useEffect} from 'react';
import '../styling/CandidateProfile.css'; 
import { Link, useNavigate } from 'react-router-dom';
import Edit_profile from './edit_profile';
import axios from 'axios';

const CandidateProfile = (props) => {
  const [info, setinfo] = useState({firstname:"",lastname:"",title:"",location:"",overview:"",skills:"",resume:null});
  const [editForm,setEditform]=useState(false);
  const [activityData,setActivityData]=useState();
  const navigate=useNavigate();

    useEffect(() => {
      const getdata=async(id)=>{
        try{
          let response= await axios.get(`http://127.0.0.1:8000/api/candi_activity/${id}`);
          setActivityData(response.data.data)
        }catch(error){
         console.log(error);
        }
    }
      if(props.info){
        setinfo(props.info);
        let id =props.info.id;
        getdata(id);
      }
  }, [props.info]);


  const formclick=()=>{
   setEditform(!editForm)
  }

const onSave=(i)=>{
 setinfo({
  firstname:i.firstname,lastname:i.lastname,title:i.title,location:i.location,overview:i.overview,skills:i.skills,resume:i.resume
})
props.setInformation(i);
}
  return (
    <div className="profile-container">
      {props.authStatus==true?props.userType==="candidate"?
      props.info?
      activityData? 
      <>
      <div className="profile-header">
        <h2>{info.firstname +" "+ info.lastname}</h2>
        <p>{info.title}</p>
      </div>

      <div className="profile-info">
        <h3>Contact Information</h3>
        <p><span>Location: </span>{info.location}</p>
        <p><span>Overview: </span>{info.overview}</p>
        <p><span>Skills: </span>{info.skills}</p>
        <p><span>Resume: </span>{info.resume?<a href={`http://127.0.0.1:8000/storage/${info.resume}`} target="_blank" rel="noopener noreferrer" download="resume.pdf">View Resume</a>:""}</p>

        <button className="edit-button" onClick={()=>formclick()}>Edit Profile</button>
        {editForm?<Edit_profile onSave={onSave} formclick={formclick} defaultInfo={info}/>:""}
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>

        {activityData.map((e,i)=>{
           const originalDateString = e.created_at; 
           const date = originalDateString.substring(0, 10);
        return(
        <div key={i} className="activity-item d-flex justify-content-between"><p>Submitted application for {e.employer_name} on {date}</p> <span>{e.status}</span></div>
        )})}
      </div></>:<p>Loading</p>:<div className='alert alert-danger'>Your profile wasn't created yet please complete your info from <Link to={'/register'}>here</Link></div>
      :navigate("/companyProfile"):<div className='alert alert-primary'>Please login to access your profile</div>}
    </div>
  );
};

export default CandidateProfile;
