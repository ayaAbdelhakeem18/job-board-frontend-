import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    const list=[
    {name:"About",link:"/"},
    {name:"Support",link:"/"},
    {name:"Terms",link:"/"},
    {name:"Privacy",link:"/"},
]
  return (
    <footer id="footer" className="background-color-white">
<div className="container">
<div className="vertical-space-100"></div>
<div className="row">

<div className="col-lg-4 col-md-6 vertical-space-2">
<h5>About Us</h5>
<p className="paregraf">Tristique velit phasellus sed auctor leo eros luctus nibh fermentu ad impediet rhonus dolor habitant purus velit aliquet donecurna ut in turpis faucibus</p>
<a href="#">
<i className="fa fa-facebook social-icon facebook"></i></a>
<a href="#">
<i className="fa fa-twitter social-icon twitter"></i></a>
<a href="#">
<i className="fa fa-pinterest-p social-icon pinterest-p"></i></a>
<a href="#">
<i className="fa fa-map-marker social-icon map-marker"></i></a>
</div>

<div className="col-lg-2 col-md-6 vertical-space-2">
<h5>Company</h5>
<div className="text">
    {list.map((e,i)=><Link key={i} to={e.link}>{e.name}</Link>)}
</div>
</div>
<div className="col-lg-2 col-md-6 vertical-space-2">
<h5>Supports</h5>
<div className="text">
    {list.map((e,i)=><Link key={i} to={e.link}>{e.name}</Link>)}
</div>

</div>
<div className="col-lg-4 col-md-6 vertical-space-2">
<h5>Subscribe Us</h5>
<p>Get latest update and newsletter</p>
<div className="vertical-space-30"></div>
<form>
<input type="email" className="email " placeholder="Email Address " required=""/>
<span className="fa fa-envelope email-icone "></span>
<input type="submit" className="Subscribe" value="Subscribe"/>
</form>
</div>
</div>
<div className="vertical-space-60"></div>
</div>
</footer>
  )
}

export default Footer
