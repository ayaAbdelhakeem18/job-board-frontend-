import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styling/CandidateProfile.css"
import axios from 'axios';

const Edit_profile = ({ formclick, onSave, create,defaultInfo }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [overview, setOverview] = useState('');
  const [skills, setSkills] = useState('');
  const [resume, setResume] = useState(null);
  const [user_id, set_user_id] = useState("");
  const [candidate_id, set_candidate_id] = useState("");
  const [err, seterr] = useState("");

  const navigate=useNavigate();

  useEffect(() => {

    const userString=localStorage.getItem("user");
   
    if (userString) {
      const user = JSON.parse(userString);
      setEmail(user.email);
      set_user_id(user.id);
    };
    
    if(defaultInfo){
      setFirstName(defaultInfo.firstname);
      setLastName(defaultInfo.lastname);
      setLocation(defaultInfo.location);
      setTitle(defaultInfo.title);
      setOverview(defaultInfo.overview);
      setSkills(defaultInfo.skills);
      setResume(defaultInfo.resume);
      set_candidate_id(defaultInfo.id);
    }
  }, []);
 
  const handleSave = async() => {
    if(firstName&&lastName&&title!=''){
      let info={ id:candidate_id, firstname:firstName, lastname:lastName, title, location, overview, skills, resume,user_id };
      if(!create){
        
        const formData = new FormData();
        formData.append('id', candidate_id);
        formData.append('firstname', firstName);
        formData.append('lastname', lastName);
        formData.append('title', title); 
        formData.append('location', location); 
        formData.append('overview', overview);
        formData.append('skills', skills);
        formData.append('resume', resume);
        formData.append('user_id', user_id);

        try{
          let response=await axios.post("http://127.0.0.1:8000/api/candidate_edit",formData);
          console.log(response);
          let res=response.data.candidate;
          localStorage.setItem("info",JSON.stringify(res));
          onSave(res);
          formclick();
        }catch(error){
          console.log(error);
          error.response.data.errors?seterr(Object.values(error.response.data.errors)[0][0]):seterr(error.message+", Please try again later");
        }
      }else{
        //creation case

        const formData = new FormData();
        formData.append('id', candidate_id);
        formData.append('firstname', firstName);
        formData.append('lastname', lastName);
        formData.append('title', title); 
        formData.append('location', location); 
        formData.append('overview', overview);
        formData.append('skills', skills);
        formData.append('resume', resume);
        formData.append('user_id', user_id);
        try{
          const response=await axios.post("http://127.0.0.1:8000/api/candidate_registeration",formData)
          console.log(response);
          let res=response.data.candidate;
          localStorage.setItem("info",JSON.stringify(res));
          onSave(res);
          navigate("/profile")
          }catch(error){ 
           console.log(error)
           error.response.data.errors?seterr(Object.values(error.response.data.errors)[0][0]):seterr(error.message+", Please try again later");
          }  
      }
    }else{
      seterr("please complete your profile data")
    } 
  };

  const onClose=()=>{
   formclick();
  }
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
    console.log(file);
  };
  console.log(defaultInfo)
  return (
    <>
        {create?"":<div className='overlay'></div>}  
    <div className={create?"edit-form-container":"edit-form-container positioning"}>
      <h3>Profile Information</h3>
      <form>
        <div className="form-group">
          <label>First Name:</label>
          <input required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input required type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Title:</label>
          <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input required type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Overview:</label>
          <textarea value={overview} onChange={(e) => setOverview(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Skills:</label>
          <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Resume:</label>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} />
        </div>

        {err?<div className='alert alert-danger mt-2 mb-2'>{err}</div>:""}

        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
        {create?"":<button type="button" className="btn btn-secondary ml-2" onClick={onClose}>
          Cancel
        </button> }

      </form>
    </div>
    </>
  );
};

export default Edit_profile;

