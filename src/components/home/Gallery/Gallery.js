import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Gallery.css'; // Import your CSS file for additional styling if needed

function Gallery() {
    return (
        <div className="image-slider-container">
            <Carousel interval={5000} indicators={false} controls={false}>
                <Carousel.Item>
                    <div className="d-flex justify-content-between">
                        <div className="card">
                            <img
                                src="https://via.placeholder.com/300x200" // Replace with your image URL
                                className="card-img-top"
                                alt="First slide"
                            />
                        </div>
                        <div className="card">
                            <img
                                src="https://via.placeholder.com/300x200" // Replace with your image URL
                                className="card-img-top"
                                alt="Second slide"
                            />
                        </div>
                        <div className="card">
                            <img
                                src="https://via.placeholder.com/300x200" // Replace with your image URL
                                className="card-img-top"
                                alt="Third slide"
                            />
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="d-flex justify-content-between">
                        <div className="card">
                            <img
                                src="https://via.placeholder.com/300x200" // Replace with your image URL
                                className="card-img-top"
                                alt="Fourth slide"
                            />
                        </div>
                        <div className="card">
                            <img
                                src="https://via.placeholder.com/300x200" // Replace with your image URL
                                className="card-img-top"
                                alt="Fifth slide"
                            />
                        </div>
                        <div className="card">
                            <img
                                src="https://via.placeholder.com/300x200" // Replace with your image URL
                                className="card-img-top"
                                alt="Sixth slide"
                            />
                        </div>
                    </div>
                </Carousel.Item>
                {/* Add more Carousel.Items for additional sets of images */}
            </Carousel>
        </div>
    );
}

export default Gallery;
