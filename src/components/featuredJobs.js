import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function FeaturedJobs(props) {

    const [data,setdata]=useState([]);

    useEffect(()=>{
        const getdata=async()=>{
            try{
            const response=await axios.get('http://127.0.0.1:8000/api/featured_jobs');
            const data=Object.values(response.data);
            setdata(data)
            }catch(error){
            console.log(error)
        }
        }
      getdata()
    },[]);
console.log(data)
    return (
        
        <section id="v2-resent-job-post">
            <div className="vertical-space-85"></div>
            <div className="container text-center">
                <h3 className="text-center">Featured Jobs</h3>
                <div className="vertical-space-30"></div>
                <p className="max-width">Lorem ipsum tempus amet conubia adipiscing fermentum viverra gravida, mollis suspendisse pretium dictumst inceptos mattis euismod
                </p>
                <div className="vertical-space-60"></div>
                {
                    data.map((e, i) => {
                        const link=(e.employer_info.name).replace(/\s/g, "");
                        const originalDateString = e.job.created_at; 
                        const datePart = originalDateString.substring(0, 10);
                        return (
                            <div className="detail" key={i}>
                                <div className="media display-inline text-align-center">
                                    <img width='100px' src={`http://127.0.0.1:8000/storage/${e.employer_info.logo}`} alt="" className="mr-3 " />
                                    <div className="media-body text-left  text-align-center">
                                        <h6> <Link to={`/${link+e.job.id}`} className="font-color-black">{e.job.title}</Link></h6>
                                        <i className="large material-icons">account_balance</i>
                                        <span className="text">{e.employer_info.name}</span>
                                        <br />
                                        <i className="large material-icons">place</i>
                                        <span className="text font-size">{e.job.location}</span>
                                        <div className="float-right margin-top text-align-center">
                                            <Link className="part-full-time" to={"/"}>{e.job.type}</Link>
                                            <p className="date-time">{datePart}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                <div className="vertical-space-20"></div>

                <div className="vertical-space-25"></div>

                <div className="job-list">

                    {/* <ul className="pagination justify-content-end margin-auto">
                        <li className="page-item"><a className="page-link pdding-none" href="javascript:void(0);"><i className=" material-icons keyboard_arrow_left_right">keyboard_arrow_left</i></a></li>
                        <li className="page-item"><a className="page-link active" href="javascript:void(0);">1</a></li>
                        <li className="page-item"><a className="page-link" href="javascript:void(0);">2</a></li>
                        <li className="page-item"><a className="page-link" href="javascript:void(0);">3</a></li>
                        <li className="page-item"><a className="page-link" href="javascript:void(0);">4</a></li>
                        <li className="page-item"><a className="page-link pdding-none" href="javascript:void(0);"> <i className=" material-icons keyboard_arrow_left_right">keyboard_arrow_right</i></a></li>
                    </ul> */}

                </div>

            </div>
            <div className="vertical-space-60"></div>
        </section>
      
    )
}

export default FeaturedJobs
