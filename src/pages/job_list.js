import React, { useEffect, useState } from 'react';
import Intro from '../components/intro';
import Search from '../components/search';
import { Link } from 'react-router-dom';
import FeaturedJobs from '../components/featuredJobs';
import axios from 'axios';
import Job_listing_component from '../components/job_listing_component';

function Job_list(props) {

    const category = [
        { name: "Education &amp; Training", num: 32 },
        { name: "Sales and Marketing", num: 72 },
        { name: "Computer Programing", num: 42 },
        { name: "Customer Support", num: 18 },
        { name: "Design & Multimedia", num: 48 },
        { name: "Web Development", num: 64 },
        { name: "Medical/Pharma", num: 90 },
        { name: "Engineer/Architects", num: 64 },
    ];
    const type = ["parttime", 'fulltime', "freelance"];

    return (
        <div>
            <Intro content={false}/>
            <Search />
            <section id="resent-job-post" className="background-color-white-drak">
                <div className="vertical-space-85"></div>
                <div className="container text-center">
                    <h4 className="text-left">Filter Jobs Result</h4>
                    <div className="vertical-space-30"></div>
                    <div className="row">

                        <div className="col-lg-4 col-md-12">

                            <div className="Job-Category-box" style={{height:"unset"}}>
                                <p className="title">Job Category</p>
                                <ul>
                                    {category.map((e, i) => <li key={i} className="list-item1 "><Link to={`/${e.name}`} className="font-color-black">{e.name} ({e.num})</Link></li>
                                    )}
                                </ul>
                            </div>
                            <div className="Job-Nature-box">
                                <p className="title">Job Nature</p>
                                <ul>
                                    {type.map((e, i) => <li key={i} className="list-item1 "><a href="#" className="font-color-black">{e}</a></li>)}
                                </ul>
                            </div>

                            <div className="Salary-Range-box">
                                <p className="title">Salary Range</p>
                                <p>
                                    <input type="text" id="amount1" className="salery-range" /> <i className="fa fa-minus minus"></i>
                                    <input type="text" id="amount2" className="salery-range" />
                                </p>
                                <div id="slider-range" className="ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"><div className="ui-slider-range ui-corner-all ui-widget-header" style={{ left: "19.3878%", width: "25.5102%" }}></div><span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default" style={{ left: "19.3878%" }}></span><span tabindex="0" className="ui-slider-handle ui-corner-all ui-state-default" style={{ left: "44.898%" }}></span></div>
                                <p className="small-title">Experience Level</p>
                                <form action="#" className="search-box_search_form">
                                    <select className="dropdown_item_select search-box_search_input">
                                        <option>Select experience level</option>
                                        <option>Select experience level1</option>
                                        <option>Select experience level2</option>
                                    </select>
                                    <div>
                                    <p className="small-title">Location</p>
                                    <div className='d-flex justify-content-between align-items-center'>
                                    <input className="search-box_search_input Location" placeholder="Location" required="required" type="search" />
                                    <span className="fa fa-map-marker location-icone"></span>
                                    </div>
                                    </div>
                                </form>
                            </div>

                            <div className="Industry-box">
                                <p className="title">Industry</p>
                                <ul>
                                    {type.map((e, i) => <li key={i} className="list-item1 "><a href="#" className="font-color-black">{e}</a></li>)}
                                </ul>
                            </div>

                        </div>

                        <div className="col-lg-8 col-md-12 job-list">
                            <Job_listing_component jobs={props.jobs}/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Job_list;
