import React from 'react';
import slider from "../assets/images/slider/slider1.jpg";
import img from "../assets/images/Best-Place-to-Find-Jobs.jpg";
import img1 from "../assets/images/Best-Place-to-Find-Jobs-icone1.png";
import img2 from "../assets/images/Best-Place-to-Find-Jobs-icone2.png";
import { Link } from 'react-router-dom';
import Marketing_sec from '../components/marketing_sec';

function About() {
  return (
<div>
<section id="intro">
<div className="carousel-item active">
<div className="carousel-background"><img src={slider} alt=""/></div>
<div className="carousel-container">
<div className="carousel-content text-left">
<div className="container">
<h2 className="font-color-white">About Jobtend</h2>
<p className="font-color-white margin">Lovistiq pue velit phasellus sed auctor leo eros luctus nibh fermentum, ad imperdiet rhoncus dolorhabitant purus velit aliquet dolorhabitant purus velit aliquet donecurna ut in turpis donecurna ut in turpis</p>
<Link to={"/joblist"} className="Explore-Jobs">Explore Jobs</Link>
</div>
</div>
</div>
</div>
</section>

<section id="Best-Place-to-Find-Jobs">
<img src={img} className="Best-Place-to-Find-Jobsimages" alt=""/>
<div className="Best-Place-to-Find-Jobs-image">
<div className="container ">
<div className="row">
<div className="col-lg-6 col-md-12">
<h3 className="title">Best Place to Find Jobs</h3>
<div className="vertical-space-20"></div>
<p>The honcs fusce aliqm non dictmst dapib alorem accman pellenl tesque in temor ultrices etiams fusce aliqm non dictmst dapib alorem</p>
<div className="vertical-space-30"></div>
<div className="Title-text-here-one-box">
<div className="media">
<div className="mr-3 rounded-circle imges orange align-self-center">
<img src={img1} alt="" className=""/>
</div>
<div className="media-body">
<h6>Mobile friendly</h6>
<p>The honcs fusce aliqm non dictmst dapib alorem accman pellenl tesque in temor</p>
</div>
</div>
</div>
<div className="vertical-space-20"></div>
<div className="Title-text-here-one-box">
<div className="media">
<div className="mr-3 rounded-circle imges blue align-self-center">
<img src={img2} alt="" className=""/>
</div>
<div className="media-body">
<h6>Cookie cotton candy</h6>
<p>The honcs fusce aliqm non dictmst dapib alorem accman pellenl tesque in temor</p>
</div>
</div>
</div>
</div>
<div className="col-lg-6 col-md-12">
</div>
</div>
</div>
</div>
</section>
<Marketing_sec/>
    </div>
  )
}

export default About;
