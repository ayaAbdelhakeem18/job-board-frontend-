import React from 'react';
import slider from "../assets/images/slider/slider1.jpg";
import video from "../assets/video/Pexels_Videos_2706.mp4";


function Intro({content}) {
    return (
        <section id="intro" style={content?{height:"120vh"}:{height:"30vh",overflow:"hidden"}}>
            <div className="carousel-item active">
                <div className="carousel-background"><img src={slider} alt="slider" /></div>
                <div className="carousel-container">

                {content?

                    <div className="carousel-content">
                        <h2 className="font-color-white">Find Jobs Now more Easy Way</h2>
                        <p className="font-color-white">Lorem ipsum tempus amet conubia adipiscing fermentum viverra gravida, mollis suspendisse pretium dictumst inceptos mattis euismod lorem nulla, magna duis nostra sodales luctus nulla praesent fermentum a elit mollis purus aenean curabitur eleifend </p>
                        <a href="#" data-toggle="modal" data-target="#myModal"><i className=" material-icons play">play_arrow</i></a>
                    </div>
                :""} 
                </div>

            </div>
            
            <div className="modal show" id="myModal" style={{display:"none",paddingRight:"17px"}}>
            <div className="container">
                <div className="vertical-space-85"></div>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button className="button button-rounded  close" data-dismiss="modal">×</button>
                            <video controls>
                                <source src={video} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
            </div>
            </div>

        </section>
    )
}

export default Intro;
