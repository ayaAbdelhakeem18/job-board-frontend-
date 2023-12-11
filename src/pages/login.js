import React, { useState } from 'react';
import "../styling/auth.css";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


function Login(props) {
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [err,setError]=useState(null);
  const navigate=useNavigate();


  
  const handleSubmit = async(e) => {
    e.preventDefault();

    let user={ email: email, password:password};

    try{
      const response =await axios.post('http://127.0.0.1:8000/api/login',user);
       console.log(response);
      const userdata=response.data.user;
      const info=response.data.info;
       props.setAuthStatus();
       props.setUserType(userdata.type);
       props.setUserInfo(userdata);
      localStorage.setItem("user", JSON.stringify(userdata));

      if(info){
      props.setInformation(info);
      const set=async()=>{localStorage.setItem("info", JSON.stringify(info));}
      async function nav() {await set();navigate("/");} 
      nav();
      }else{
        navigate("/register")
      }
       
    }catch(error){
     console.log(error);
     error.response.data.error?setError(Object.values(error.response.data.error)):setError(error.message+", Please try again later");

    }

};

  return (
    <div className="register-form-container">
    {props.authStatus==true?navigate("/"):<>
    <h3>Login</h3>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {err?<div className='alert alert-danger'>{err}</div>:""}
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
    </>}
  </div>
  )
}

export default Login
