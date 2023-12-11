import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/nav';
import Home from './pages/home';
import Footer from './components/footer';
import Job_list from './pages/job_list';
import Job_details from './pages/job_details';
import Application from './pages/application';
import Post_job from './pages/post_job';
import About from './pages/about';
import Edit_profile from './pages/edit_profile';
import CandidateProfile from './pages/CandidateProfile';
import Signup from './pages/register';
import Complete_info from './pages/complete_info';
import { useEffect, useState } from 'react';
import Login from './pages/login';
import CompanyProfile from './pages/CompanyProfile';
import axios from 'axios';


function App() {
  const [authStatus,setAuthStatus]=useState(false);
  const [userType,setUserType]=useState();
  const [userInfo,setUserInfo]=useState();
  const [info,setinfo]=useState();
  const [jobs,setjobs]=useState();
  const [employers,setemployers]=useState();


  useEffect(() => {
    const userString=localStorage.getItem("user");
    const setInformation=localStorage.getItem("info");
    if (userString) {
      const user = JSON.parse(userString);
      setUserType(user.type);
      setAuthStatus(true);
      setUserInfo(user);

      if(setInformation!=undefined){
        const info = JSON.parse(setInformation);
        setinfo(info);
      }
      
    }

    const getdata=async()=>{
      try{
      const response=await axios.get('http://127.0.0.1:8000/api/job_list');
      const data=Object.values(response.data);
      setjobs(data)
      }catch(error){
      console.log(error)
  }
  }
    const employers=async()=>{
      try{
      const response=await axios.get('http://127.0.0.1:8000/api/get_employers');
      const data=response.data;
      setemployers(data);
      }catch(error){
      console.log(error)
  }
  }
  const info=async()=>{
      await getdata();
       employers();
  }
  info();
  },[]);

  console.log(info,'inf')

//Set states and rerender the App when Action is taken in the children components
  const setInformationFunc=(e)=>{
   setinfo(e);
  }
  const setAuthStatusFunc=()=>{
   setAuthStatus(!authStatus);
  }
  const setUserTypeFunc=(e)=>{
   setUserType(e);
  }
  const setUserInfoFunc=(e)=>{
   setUserInfo(e);
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <Nav login={authStatus} userType={userType} setUserInfo={setUserInfoFunc} setinfo={setInformationFunc} setUserType={setUserTypeFunc} setAuthStatus={setAuthStatusFunc}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/joblist' element={<Job_list jobs={jobs}/>} />
          <Route path='/jobdetails' element={<Job_details />} />
          <Route path='/application' element={<Application userType={userType}  authStatus={authStatus}/>} />
          <Route path='/postJob' element={<Post_job userType={userType}  authStatus={authStatus} info={info}/>} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<CandidateProfile userType={userType}  authStatus={authStatus} info={info} setInformation={setInformationFunc}/>} />
          <Route path='/companyProfile' element={<CompanyProfile userType={userType}  authStatus={authStatus} info={info} setInformation={setInformationFunc}/>} />
          <Route path='/signup' element={<Signup setAuthStatus={setAuthStatusFunc} setUserType={setUserTypeFunc} setUserInfo={setUserInfoFunc} authStatus={authStatus}/>} />
          <Route path='/login' element={<Login setInformation={setInformationFunc} setAuthStatus={setAuthStatusFunc} setUserType={setUserTypeFunc} setUserInfo={setUserInfoFunc} authStatus={authStatus}/>} />
          <Route path='/register' element={<Complete_info setInformation={setInformationFunc} userType={userType} done={info?'yes':'no'}/>} />

          {jobs?jobs.map((e,i)=>{
            const link=(e.employer_info.name).replace(/\s/g, "");
            return(
              <Route key={i} path={`/${link+e.job.id}`} element={<Job_details jobInfo={e} info={info} userType={userType}/>}/>
            )
          }):""}
          {employers?employers.map((e,i)=>{
            const link=(e.name).replace(/\s/g, "");
            return(
              <Route key={i} path={`/${link}`} element={<CompanyProfile company={e} view={true}/>}/>
            )
          }):""}

        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
