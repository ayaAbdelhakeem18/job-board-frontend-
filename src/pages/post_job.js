import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Post_job(props) {
  const [employer_id, set_employer_id] = useState();
  const [employer_name, set_employer_name] = useState();
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState(1);
  const [jobNature, setJobNature] = useState('full time');
  const [salaryRange, setSalaryRange] = useState('5,000 - 10,000');
  const [category_list, setCategoryList] = useState();
  const [err, seterr] = useState();

  useEffect(()=>{
    if(props.info){
        set_employer_id(props.info.id);
        set_employer_name(props.info.name);
    }
  },[props.info])

  useEffect(()=>{
    const getdata=async()=>{
     try{
      let response=await axios.get('http://127.0.0.1:8000/api/category_list');
      setCategoryList(response.data);
     }catch(error){
      console.log(error);
     }
    }
    getdata()
  },[])
  const navigate=useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('employer_id', employer_id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('requirements', requirements);
    formData.append('location', location);
    formData.append('category_id', category);
    formData.append('type', jobNature);
    formData.append('salary', salaryRange);
    
    try{
    const response=await axios.post('http://127.0.0.1:8000/api/post_job',formData) ;
    console.log(response);
    let id=response.data.id;
    let message=response.data.message;
    let link=`/${employer_name+id}`;
    navigate(link);
    navigate(0);
    alert(message);
    }catch(error){
    error.response.data.error?seterr(Object.values(error.response.data.error)[0]):seterr(error.message+", Please try again later");
     console.log(error)
     console.log(Object.values(error.response.data.error)[0])
    }
  };
  console.log(category_list)
  return (
    <>{!category_list?'Loading':
    <section id="post_job">
    {props.authStatus === true ? (
      props.userType === 'employer' ? (
        <>
          <div className="vertical-space-100"></div>
          <div className="container">
            <div className="list-box">
              <a href="#" className="font-color-black margin-right">
                Job{' '}
              </a>{' '}
              &gt;{' '}
              <a href="#" className="font-color-orange margin-left">
                {' '}
                Post job
              </a>
            </div>
            <div className="vertical-space-60"></div>
            <div className="job-post-box">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputJobtitle">Job title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputJobtitle"
                    placeholder="Enter your job title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputShortDescription">
                    Description
                  </label>
                  <textarea
                    className="form-control small"
                    id="exampleInputShortDescription"
                    placeholder="Write job description"
                    rows="3"
                    required
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputLongDescription">
                    Requirements
                  </label>
                  <textarea
                    className="form-control large"
                    id="exampleInputLongDescription"
                    placeholder="Write requirements"
                    rows="3"
                    required
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group ">
                      <label>Location</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your job location"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <div className="form-group ">
                      <label>Job Category</label>
                      <select
                        className="form-control"
                        id="sel1"
                        name="sellist1"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                      {category_list.map((e,i)=><option key={i} value={e.id}>{e.title}</option>)}
      
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <div className="form-group mybtn" id="Job-Nature">
                      <label>Job Nature</label>
                      <select
                        className="form-control"
                        id="sel1"
                        name="sellist1"
                        required
                        value={jobNature}
                        onChange={(e) => setJobNature(e.target.value)}
                      >
                        <option value="full time">Full Time</option>
                        <option value="part time">Part Time</option>
                        <option value="freelance">Freelance</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <div className="form-group">
                      <label htmlFor="sel1">Salary Range:</label>
                      <select
                        className="form-control"
                        id="sel1"
                        name="sellist1"
                        required
                        value={salaryRange}
                        onChange={(e) => setSalaryRange(e.target.value)}
                      >
                        <option value="5,000 - 10,000">
                          5,000 - 10,000
                        </option>
                        <option value="3,000 - 5,000">3,000 - 5,000</option>
                        <option value="2,000 - 1,000">2,000 - 1,000</option>
                        <option value="7,000 - 10,000">
                          7,000 - 10,000
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="mr-3"
                      id="exampleCheck1"
                      required
                      style={{ width: 'unset', margin: 'unset' }}
                    />
                    <a>Agree with term and conditions</a>
                  </div>
                </div>
                {err?<div className='alert alert-danger'>{err}</div>:""}

                <button type="submit" className="btn Post-Job-Offer">
                  Post Job Offer
                </button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div className="alert alert-primary text-center" style={{ marginTop: '10rem' }}>
          Please signup as an employer to be able to post a job
        </div>
      )
    ) : <div className='alert alert-primary text-center' style={{marginTop:"10rem"}}>Please login first to be able to Post a job</div>}
</section>
    }
  </>
  )
}

export default Post_job
