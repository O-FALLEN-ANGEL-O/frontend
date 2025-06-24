import React from 'react';
import './About.css';
import box1img from '../../../assest/Image/service-icon-01.png';
import box2img from '../../../assest/Image/service-icon-02.png';
import box3img from '../../../assest/Image/service-icon-03.png';
import leftimg from '../../../assest/Image/about-left-image.jpg';


function About() {
    return (
        <>
            <div className="formline">
                <h1>For <span className="career">Career</span> & Internship <span className="register"> Register <br />Here</span></h1>
                <button type="button" className="form_button">Apply</button>
            </div>
            <br />
            <section id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={leftimg} alt="photo" className="left-image" />
                        </div>
                        <div className="col-md-6">
                            <h1>Grow Your Business With Our <br /> Business Process & Data Analysis</h1>
                            <p className="div4-para">Leverage big data for powerful insights. Unlock the potential
                                of data with<br /> DataFlow.Easily analyze and visualize data from multiple
                                sources with DataFlow. Get <br />the most out of your data with powerful analytics tools.</p>

                            <div className="div4-boxes">
                                <div className="b1">
                                    <img src= {box1img} alt="photo" className="about-png" />
                                    <h1>120+</h1>
                                    <span>Business Projects</span>
                                    <hr />
                                    <p>With Business Process, Enhance your business operations and increase productivity.</p>
                                </div>
                                <div className="b1">
                                    <img src= {box2img} alt="photo" className="about-png" />
                                    <h1>200+</h1>
                                    <span>Educational Supports</span>
                                    <hr />
                                    <p>Schools and Educational Support Programs</p>
                                </div>
                                <div className="b1">
                                    <img src={box3img} alt="photo" className="about-png" />
                                    <h1>200+</h1>
                                    <span>Satisfied Clients</span>
                                    <hr />
                                    <p>revolutionised the business operations.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;
