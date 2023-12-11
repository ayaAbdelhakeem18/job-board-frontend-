import React from 'react';
import label from "../assets/images/job-post.png"

function Application(props) {
  console.log(props.authStatus)
  return (

<section id="post_job">
{props.authStatus==true?props.userType==="candidate"?<>
<div class="vertical-space-100"></div>
<div class="container">
<div class="list-box">
<a href="#" class="font-color-black margin-right">Job </a> &gt; <a href="#" class="font-color-orange margin-left"> Apply to job</a>
</div>
<div class="vertical-space-60"></div>

<div class="job-post-box">
<form>

<div class="row">
<div class="col-lg-6 col-md-6">
<div class="form-group">
<label for="exampleInputCompany">Name</label>
<input type="text" class="form-control" id="exampleInputCompany" placeholder="Your Full name" required/>
</div>
</div>

<div class="col-lg-6 col-md-6">
<div class="form-group">
<label for="exampleInputLoction">Email</label>
<input type="email" class="form-control" id="exampleInputLoction" placeholder="Email" required/>
</div>
</div>
</div>

<div class="form-group">
<label for="exampleInputShortDescription">Cover letter</label>
<textarea class="form-control small" id="exampleInputShortDescription" placeholder="Write your cover letter" rows="3" required=""></textarea>
</div>

<div class="row">
<div class="col-lg-6 col-md-6">
<div class="form-group ">
<label>Upload your Resume</label>
<div class="box text-center">
<input type="file"  id="file-5" class="inputfile inputfile-4" />
<label for="file-5">
<i>
<img src={label} class="imtges" alt=""/>
</i>
<span>Drop your file here, or <i class="font-color-orange">Browse</i></span>
</label>

</div>
</div>
</div>
</div>

<button type="submit" class="btn Post-Job-Offer btn-block">Submit Appllication</button>
</form>
</div>
</div>
</>:<div className='alert alert-primary text-center' style={{marginTop:"10rem"}}>Please signup as candidate to be able to submit an application</div>:
<div className='alert alert-primary text-center' style={{marginTop:"10rem"}}>Please login first to be able to submit an application</div>}
</section>
  )
}

export default Application;
