import React, { useEffect, useState } from 'react';
import "../styling/CandidateProfile.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Comp_profile_form({ create, formClick, onSave, defaultInfo }) {

  const [name, setName] = useState("");
  const [location, setAddress] = useState("");
  const [Logo, setLogo] = useState(null);
  const [description, setDescription] = useState("");
  const [user_id, set_user_id] = useState("");
  const [employer_id, set_employer_id] = useState("");
  const [err, seterr] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      const user = JSON.parse(userString);
      set_user_id(user.id);
    };

    if (defaultInfo) {
      setName(defaultInfo.name);
      setAddress(defaultInfo.location);
      setLogo(defaultInfo.Logo);
      setDescription(defaultInfo.description);
      set_employer_id(defaultInfo.id);
    }
  }, [])


  console.log("id",employer_id)

  const handleSave = async () => {
    if (name && Logo && location != '') {

      let info = { id: employer_id, name, location, logo: Logo, description, user_id };

      if (!create) {
        const formData = new FormData();
        formData.append('id', employer_id);
        formData.append('name', name);
        formData.append('location', location);
        formData.append('logo', Logo); 
        formData.append('description', description);

        try {
          const response = await axios.post("http://127.0.0.1:8000/api/employer_edit", formData);
          
          console.log(response);
          let res = response.data.employer;
          localStorage.setItem("info", JSON.stringify(res));
          onSave(res);
          formClick();
        } catch (error) {
          console.log(error);
          error.response.data.errors ? seterr(Object.values(error.response.data.errors)[0][0]) : seterr(error.message + ", Please try again later");
        }
      } else {
        //creation case
        try {
          const formData = new FormData();
          formData.append('name', name);
          formData.append('location', location);
          formData.append('logo', Logo); 
          formData.append('description', description);
          formData.append('user_id', user_id);

          const response = await axios.post("http://127.0.0.1:8000/api/employer_registeration", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          console.log(response);
          let res=response.data.employer;
          localStorage.setItem("info",JSON.stringify(res));
          onSave(res);
          navigate("/companyProfile")
        } catch (error) {
          console.log(error)
          error.response.data.errors ? seterr(Object.values(error.response.data.errors)[0][0]) : seterr(error.message + ", Please try again later");
        }
      }
    } else {
      seterr("please complete your profile data")
    }
  }
  const onClose = () => {
    formClick();
  }

  const handlLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file)
  };

  return (
    <>
      {create ? "" : <div className='overlay'></div>}
      <div className={create ? "edit-form-container" : "edit-form-container positioning"}>
        <h3>Profile Information</h3>
        <form encType="multipart/form-data">
          <div className="form-group">
            <label>Company Name:</label>
            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Company Address</label>
            <textarea value={location} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Logo</label>
            <input type="file" name='file' accept='.jpg, .jpeg, .png, .svg, .webp' onChange={handlLogoChange} />
          </div>


          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          {err ? <div className='alert alert-danger mt-2 mb-2'>  {err}</div> : ""}

          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          {create ? "" : <button type="button" className="btn btn-secondary ml-2" onClick={onClose}>
            Cancel
          </button>}

        </form>
      </div>
    </>
  )
}

export default Comp_profile_form;
