import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/main.css';


const Portfolio = () => {
    const [isMobileView, setIsMobileView] = useState(false);
    const [showFullText, setShowFullText] = useState(false);

    // Function to toggle full text display
    const toggleShowText = () => {
        setShowFullText(!showFullText);
    };

    // Check screen width on component mount and resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 750);
        };

        // Initial check
        handleResize();

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        // Clean up listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className="portfolio d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-20">
                        <div className="portfolio-div">
                            <div className="portfolio-div-h text-center">
                                <h1>Our Portfolio</h1>
                                <hr />
                                <h2>One stop for <em>Software Development</em> & <span className="he1">Educational</span> Support</h2>
                            </div>
                            <div className="portfolio-div-p">
                                <p>
                                    <span className="portfolio-vitvara"><em><b>Vitvara</b></em></span> is Bangalore based startup company established in 2011. Vitvara was nurtured
                                    by a group of entrepreneurs with a sole mission of establishing a dedicated Research
                                    & Development Cell to fertilize the innovations of budding engineers. We are
                                    specialized for Software and educational services. We developed 1000 plus
                                    engineering projects in various fields viz. web design, software
                                    applications, android applications, electronics, IoT, AI, robotics, mechanical,
                                    mechatronics, software, and many more...
                                </p>

                                {/* Conditionally render "Show More" button for mobile view */}
                                {isMobileView && !showFullText && (
                                    <button className="btn btn-link" onClick={toggleShowText}>
                                        Read More...
                                    </button>
                                )}

                                {/* Render additional content if showFullText is true or screen width > 750px */}
                                {(showFullText || !isMobileView) && (
                                    <>
                                        <p>
                                            The branch in Mangalore is a very significant step for us. Through
                                            this newly located branch, we will address the Software & Educational products
                                            and services to a whole new set of potential customers within the footfall of
                                            the branch. The new branch at Mangalore aims to deliver a complete solution to software
                                            and educational services. It will be a one-stop shop for all educational and
                                            Industry related softwares like websites, web-application windows application,
                                            android applications
                                        </p>

                                        <p>
                                            Also online and store shopping of more than 1000+ items at the best
                                            price with high-quality products like
                                            electronics, electrical, and mechanical needs of the customer and hope to augment our
                                            customer experience through this branch
                                        </p>

                                        {/* Render "Show Less" button for mobile view */}
                                        {isMobileView && showFullText && (
                                            <button className="btn btn-link" onClick={toggleShowText}>
                                                Show Less
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
