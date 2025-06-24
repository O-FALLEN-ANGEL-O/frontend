import React from 'react';
import './Location.css'; // Import custom CSS file for additional styling

function Location() {
    return (
        <section className="location py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="main-div-location-left">
                            <iframe
                                title="Google Maps"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.1657210407893!2d74.8348233738089!3d12.897063216510638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35bd3738d373f%3A0x8773d9b865343f6e!2sVitvara%20Technologies!5e0!3m2!1sen!2sin!4v1707817600907!5m2!1sen!2sin"
                                width="100%" height="450" style={{ border: '0' }} allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="main-div-internship-right">
                            <h2>Contact Us</h2>
                            <form action="https://api.web3forms.com/submit" method="POST">
                                <input type="hidden" name="access_key" value="a4295a10-0fe7-478b-bddd-7e2a6bbc2824" />
                                <div className="mb-3">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" id="name" name="name" className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" name="email" className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message">Message:</label>
                                    <textarea id="message" name="message" className="form-control" rows="4" required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Location;
