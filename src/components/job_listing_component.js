import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Job_listing_component(props) {

    const [data,setdata]=useState(props.jobs);

    useEffect(()=>setdata(props.jobs),[props.jobs]);

  return (
    <div>
       {data?
             data.map((e, i) => {
                const link=(e.employer_info.name).replace(/\s/g, "");
                const originalDateString = e.job.created_at; 
                const datePart = originalDateString.substring(0, 10);
                 return (
                     <div className="detail" key={i} style={{margin:"unset",width:"unset"}}>
                         <div className="media display-inline text-align-center">
                             <img width='80px' src={`http://127.0.0.1:8000/storage/${e.employer_info.logo}`} alt="" className="mr-3 " />
                             <div className="media-body text-left  text-align-center">
                                 <h6> <Link to={`/${link+e.job.id}`} className="font-color-black">{e.job.title}</Link></h6>
                                 <i className="large material-icons">account_balance</i>
                                 <span className="text">{e.employer_info.name}</span>
                                 <br />
                                 <i className="large material-icons">place</i>
                                 <span className="text font-size">{e.job.location}</span>
                                 <div className="float-right margin-top text-align-center">
                                     <span className="part-full-time">{e.job.type}</span>
                                     <p className="date-time">{datePart}</p>
                                 </div>
                             </div>
                         </div>
                     </div>
                 )
             })
        :<p>Loading</p> }
    </div>
  )
}

export default Job_listing_component
