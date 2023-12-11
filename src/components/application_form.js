import React, { useEffect, useState } from 'react';
import '../styling/CandidateProfile.css';
import axios from 'axios';

function Application_form(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coverLetter, setCoverletter] = useState('');
  const [resume, setResume] = useState(null);
  const [haveResume, setHaveResume] = useState(props.info.resume?true:false);
  const [candidate_id, set_candidate_id] = useState();
  const [job_id, set_job_id] = useState(props.job_id);
  const [err, setErr] = useState();

  useEffect(()=>{
    const candidate_info=props.info;
    if(candidate_info){
      setName(candidate_info.firstname+" "+candidate_info.lastname);
      set_candidate_id(candidate_info.id);
      setResume(candidate_info.resume);
      candidate_info.resume?setHaveResume(true):setHaveResume(false);
    }
  },[props.info]);

  useEffect(()=>set_job_id(props.job_id),[props.job_id]);

  const handleResumeChange = (event) => {
   const file=event.target.files[0];
   setResume(file);
  };
   
   const onClose=()=>{
    props.setformopen();
  }


  const handleSubmit = async(event) => {
    event.preventDefault();
    if(resume){
      const formData = new FormData();
      formData.append('job_id', job_id);
      formData.append('candidate_id', candidate_id);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('resume', resume);
      formData.append('cover_letter', coverLetter);
      try{
      let response=await axios.post('http://127.0.0.1:8000/api/apply',formData);
      const application=response.data.application;
      const message=response.data.message;
      alert(message);
      onClose();
      }catch(error){
        console.log(error);
        error.response.data.error?setErr(Object.values(error.response.data.error)[0][0]):setErr("Somthing went wrong, Please try again later");
      }
    }else{
      setErr('Please upload your resume')
    }
  };
  return (
    <div className="overlay">
      <div className="edit-form-container positioning">
        <h3>Application Form</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="coverLetter">Cover Letter</label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              value={coverLetter}
              onChange={(e)=>setCoverletter(e.target.value)}
              placeholder='descripe to the employer why are you the best fit'
              required
            />
          </div>
{haveResume?<div className='mb-3'>*Submit with your already saved resume Or upload a new one<a href={`http://127.0.0.1:8000/storage/${resume}`} target="_blank" rel="noopener noreferrer" download="resume.pdf">View My Resume</a></div>:""}
          <div className="form-group">
            <label>Resume</label>
              <div>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                />
              </div>
          </div>
    {err?<div className='alert alert-danger'>{err}</div>:""}
          <div className="form-group">
            <button type="submit">Submit</button>
            <button type="button" className="btn btn-secondary ml-2" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Application_form;

