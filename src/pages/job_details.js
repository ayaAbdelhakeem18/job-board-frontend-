import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Application_form from '../components/application_form';


function Job_details(props) {
    const [data,setdata]=useState(props.jobInfo);
    const [formopen,setformopen]=useState(false);
    const [msg,setmsg]=useState();

    const navigate=useNavigate();
    const setformopenfunc=()=>setformopen(!formopen);

    useEffect(()=>setdata(props.jobInfo),[props.jobInfo]);

    const nav=()=>{
        setmsg('please complete your profile info to be able to submit an apllication');
        setTimeout(()=>navigate('/register'),5000);
    }

    const application_form=()=>{
   if(props.userType==='candidate'){
    props.info?setformopenfunc():nav();
   }else{
    setmsg('please sign up as candidate to be able to submit applications')
   }
    console.log(msg);
    }

    const link=(data.employer_info.name).replace(/\s/g, "");
    const formattedRequirements = data.job.requirements.split('\n').filter(sentence => sentence.trim() !== '');
    return (
        <>
        {data?
            <section id="job-Details" style={{marginTop: "100px"}}>
            <div className="container background-color-full-white job-Details">
                <div className="Exclusive-Product">
                    <h3>{data.job.title}</h3>
                    <a href="#" className="Apply-Now" onClick={()=>application_form()}>Apply Now</a>
                    <h6 className="font-color-orange "><Link to={'/'+link} className='d-flex align-items-center' style={{margin:'unset',display:"unset",float:"unset"}}><img width={'50px'} src={`http://127.0.0.1:8000/storage/${data.employer_info.logo}`} className='mr-2' alt="" />{data.employer_info.name}</Link></h6>
                    <Link to="/joblist">View more similar jobs</Link>
                    <div>{msg?<div className='alert alert-danger'>{msg}</div>:""}</div>
                    <i className="material-icons">place</i>
                    <span className="text">{data.job.location}</span>
                    <div >
                    <h4>Salary Range</h4>
                    <p>{data.job.salary}</p>
                </div>
                    <h4>Description</h4>
                    <p>{data.job.description}</p>
                </div>
                <div className="Job-Description">
                    <h4>Requirements</h4>
                    <ul>
                     {formattedRequirements.map((sentence, index) => (
                     <li key={index} style={{marginBottom:"10px"}}>{sentence.trim()}</li>
                     ))}
                    </ul>
                </div>
                <div className="vertical-space-20"></div>

                {formopen?<Application_form setformopen={setformopenfunc} info={props.info} job_id={data.job.id}/>:""} 

            </div>
        </section>
            :""}
        </>
    )
}

export default Job_details
