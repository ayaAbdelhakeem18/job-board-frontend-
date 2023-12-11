import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Search() {
    const [input,setInput]=useState('');
    const [results,setResults]=useState([]);

    const fetchdata=async(value)=>{
        try{
            const response=await axios.get('http://127.0.0.1:8000/api/job_list');
            const data=Object.values(response.data);
            const results=data.filter((e)=>{
                return value=!' ' && e.job.title.toLowerCase().includes(value) || e.job.title.toLowerCase()===value|| e.employer_info.name.toLowerCase().includes(value)|| e.employer_info.name.toLowerCase()===value
            });
            setResults(results);
            console.log(value==true);
            console.log(value);
            }catch(error){
            console.log(error)
        }
    }

    const handleChange=(e)=>{
      setInput(e.target.value);
      fetchdata(e.target.value);
    //   console.log(results);
    }
    return (
        <div id="search-box">
            <div className="container search-box rounded">
                <form action="#" id="search-box_search_form_3" className="search-box_search_form d-flex flex-lg-row flex-column align-items-center justify-content-between ">
                    <div className="form-div d-flex flex-row align-items-center justify-content-start inline-block">
                        <span className="large material-icons search">search</span>

                        <input className="search-box_search_input" placeholder="Search Keyword" required="required" type="search" value={input} onChange={(e)=>handleChange(e)}/>
                        
                        {input?results!=[]?<div id='search-results'>
                        {results.map((e,i)=><div key={i} className='search-item'><Link to={`/${(e.employer_info.name).replace(/\s/g, "")+e.job.id}`}>{e.job.title + ' at '+ e.employer_info.name}</Link></div>)}</div>
                        :<div  className='search-item'>No results where found</div>:''}
                        
                        {/* <select className="dropdown_item_select search-box_search_input">
                                <option>Category</option>
                                <option>Category1</option>
                                <option>Category2</option>
                        </select>
                        <span className="large material-icons margin-top search">place</span>
                        <input className="search-box_search_input " placeholder="Location" required="required" type="search"/>
                        <button type="submit" className="search-box_search_button rounded">Search Jobs</button> */}
                    </div>
                </form>    
            </div>
        </div>
)
}

export default Search
