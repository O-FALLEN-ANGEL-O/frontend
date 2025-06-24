import React from 'react';
import './Services.css'; // Import custom CSS file for additional styling

function Services() {
    return (
        <section className="Services">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="head1">
                            <h1>We <em>Provide </em>The Best<br />Service With Our Tools<br />OUR SERVICES</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="box1">
                            <h3>Content Ideas for your next project</h3>
                            <img src="/vitvara(new)/assect/src/service-icon-01.png" alt="photo" className="mini-logo" /><br />
                            <hr />
                            <br />
                            <p>Feel free to contact us for school and college projects</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="box1">
                            <h3>Discover & Explore our Educational services</h3>
                            <img src="/vitvara(new)/assect/src/service-icon-02.png" alt="photo" className="mini-logo" /><br />
                            <hr />
                            <br />
                            <p>Feel free to contact us for Workshops and Trainings on Latest Technology</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="box1">
                            <h3>Optimizing your Business</h3>
                            <img src="/vitvara(new)/assect/src/service-icon-03.png" alt="photo" className="mini-logo" /><br />
                            <hr />
                            <br />
                            <p>With Data Analyzer, you can drive smart decisions to improve operations and boost productivity.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
