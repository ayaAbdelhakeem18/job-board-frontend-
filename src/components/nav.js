import React, { useEffect, useState } from "react";
import { Link, NavLink,useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

function Nav(props) {

    const [auth,setAuth]=useState(props.login);
    // const [userType,setUserType]=useState(props.userType);
    const navigate=useNavigate();

    const navlist=[
        {name:"Home",link:"/"},
        {name:"About",link:"/about"},
        {name:"Browse Jobs",link:"/joblist"},
        {name:"Post a Job",link:"/postJob"},
    ];



    useEffect(()=>{
     setAuth(props.login);
    },[props])
    console.log("user type",props.userType)

    const logout=async()=>{

      const remove=async()=>{
        localStorage.removeItem('info');
        localStorage.removeItem('user');
        props.setAuthStatus();
        props.setUserInfo(null);
        props.setinfo(null);
        props.setinfo(null);
        props.setUserType(null);
      }

      await remove();
      navigate('/');
    }
  return (
    <div className="header">
    <div className="header_container background-color-orange-light">
      <div className="container">
        <div className="row">
        <div className="col">
              <div className="header_content d-flex flex-row align-items-center justify-content-start">
                <div className="logo_container">
                  <Link to="/">
                    <img src={logo} className="logo-text" alt="logo" />
                  </Link>
                </div>
    {auth?
      <nav className="main_nav_contaner ml-auto">
      <ul className="main_nav">
       {navlist.map((e,i)=>props.userType==="candidate"?e.name==="Post a Job"?null:<li key={i}><Link to={e.link}>{e.name}<span className="caret"></span></Link></li>:e.name==="Browse Jobs"?null:<li key={i}><Link to={e.link}>{e.name}<span className="caret"></span></Link></li>)}
       </ul>

       
      <div className="dropdown icon drop-styling">
                  <span className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown"  data-bs-toggle="dropdown" aria-expanded="false"><i className="fa  fa-user" /></span>
                  <div className='dropdown-menu drop' aria-labelledby="dropdownMenuButton" style={{minWidth:"40px",textAlign:"center",}}>
                  <Link to={props.userType==="company"?"companyProfile":"/profile"}  className="dropdown-item" >Profile</Link>  
                  <a className="dropdown-item" href="#" onClick={()=>logout()}>Logout</a>
                  </div>
      </div>

      <div className="dropdown icon drop-styling mobile-list">
                  <span className="dropdown-toggle" data-toggle="dropdown" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><i className="large material-icons font-color-white menu_mm menu-vertical">menu</i></span>
                  <div className='dropdown-menu drop' aria-labelledby="dropdownMenuButton" style={{minWidth:"40px",textAlign:"center"}}>
                  <ul className="mobile_nav">
                  {navlist.map((e,i)=>props.userType==="candidate"?e.name==="Post a Job"?null:<li key={i}><Link to={e.link}>{e.name}<span className="caret"></span></Link></li>:e.name==="Browse Jobs"?null:<li key={i}><Link to={e.link}>{e.name}<span className="caret"></span></Link></li>)}
                  </ul>
                  </div>
      </div>


    </nav>
    :
    <nav className="main_nav_contaner ml-auto non-auth-nav">
    <ul className="main_nav">
     {navlist.map((e,i)=><li key={i}><Link to={e.link}>{e.name}<span className="caret"></span></Link></li>)}
     </ul>

     <Link className="login" to={"/login"}>Log in</Link>

    <div className=" Post-Jobs">
      <Link to="/signup" className="">
        Join Us
      </Link>
    </div>

    <div className="dropdown icon drop-styling mobile-list">
                  <span className="dropdown-toggle" data-toggle="dropdown" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><i className="large material-icons font-color-white menu_mm menu-vertical">menu</i></span>
                  <div className='dropdown-menu drop' aria-labelledby="dropdownMenuButton" style={{minWidth:"40px",textAlign:"center"}}>
                  <ul className="mobile_nav">
                  {navlist.map((e,i)=><li key={i}><Link to={e.link}>{e.name}<span className="caret"></span></Link></li>)}
                  </ul>
                  </div>
      </div>
  
  </nav>
  }
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}

export default Nav;
