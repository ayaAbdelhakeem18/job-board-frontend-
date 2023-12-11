import React from 'react'
import { Link } from 'react-router-dom';
import img1 from "../assets/images/icon/service-icone-1.png";
import img2 from "../assets/images/icon/service-icone-2.png";
import img3 from "../assets/images/icon/service-icone-3.png";
import img4 from "../assets/images/icon/service-icone-4.png";
import img5 from "../assets/images/icon/service-icone-5.png";
import img6 from "../assets/images/icon/service-icone-6.png";
import img7 from "../assets/images/icon/service-icone-7.png";
import img8 from "../assets/images/icon/service-icone-8.png";


function Job_category() {
    const category=[
    {img:img1,name:"Education &amp; Training",num:32},
    {img:img2,name:"Sales and Marketing",num:72},
    {img:img3,name:"Computer Programing",num:42},
    {img:img4,name:"Customer Support",num:18},
    {img:img5,name:"Design & Multimedia",num:48},
    {img:img6,name:"Web Development",num:64},
    {img:img7,name:"Medical/Pharma",num:90},
    {img:img8,name:"Engineer/Architects",num:64},
];
  return (
<section id="top-Job-Category">
<div className="container">
<h3 className="text-center">Choose Job Category</h3>
<div className="vertical-space-30"></div>

<p className="max-width">Lorem ipsum tempus amet conubia adipiscing fermentum viverra gravida, mollis suspendisse pretium dictumst inceptos mattis euismod
</p>
<div className="vertical-space-60"> </div>
<div className="row">

{category.map((e,i)=>{
    return(
        <div key={i} className={"col-lg-3 col-md-6 max-width-50"} >
        <div className="box background-color-white-light">
        <div className="circle">
        <img src={e.img} alt={e.name}/>
        </div>
        <h6 className="font-color-black">{e.name}</h6>
        <Link to={`/${e.name}`} className="button job_post" data-hover="View Jobs" data-active="I'M ACTIVE"><span>{`${e.num} Job Posts`}</span></Link>
        </div>
        </div>  
    )
})}

</div>

<div className="vertical-space-40"></div>
<Link to="/categories" className="Brows-All-Category">Brows All Category</Link>
</div>
<div className="vertical-space-85"></div>
</section>
  )
}

export default Job_category
