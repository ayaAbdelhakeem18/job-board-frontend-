import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "../styling/auth.css";

const Signup= (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmed_password, set_confirmed_Password] = useState('');
  const [accountType, setAccountType] = useState('candidate');
  const [err, seterr] = useState(null);
  const navigate=useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(password!=confirmed_password){
     seterr("Password and confirmed password do not match")
    }else{

      let userObj={ email,password,password_confirmation:confirmed_password,type: accountType,id:""};

      try {
        const response =await axios.post('http://127.0.0.1:8000/api/signUp',userObj);
        let user=response.data.user;
          props.setAuthStatus();
          props.setUserType(accountType);
          props.setUserInfo(user);
      
          const set = async () => {
            localStorage.setItem("user", JSON.stringify(user));
          };

          async function nav() {
            await set();
              navigate("/register");
          }
          nav();
        }catch (error) {
          console.log(error)
          error.response.data.errors?seterr(Object.values(error.response.data.errors)[0][0]):seterr(error.message+", Please try again later");
        }
    }

  };

  return (
    <div className="register-form-container">
      {props.authStatus==true?navigate("/"):<>
      <h3>Register</h3>
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
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmed_password}
            onChange={(e) => set_confirmed_Password(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Account Type:</label>
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="candidate">Candidate</option>
            <option value="employer">Employer</option>
          </select>
        </div>
       {err?<div className='alert alert-danger'>{err}</div>:null}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      </>}
      </div>
  );
};

export default Signup;

