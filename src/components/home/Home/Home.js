import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/main.css'; // Your custom CSS file
import stockImage from '../../../assest/Image/stock.jpg';

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = [
        {
            title: "Business Process",
            subtitle: "Unlock business potential with Customized Softwares",
            description: "Make your business operations faster and smarter with Business Process customizable software",
            buttonLabel: "Message Us Now",
            buttonLink: "#custom-contact",
            phoneNumber: "8548866226"
        },
        {
            title: "Thantrajna Labs",
            subtitle: "Get the best Educational Support for Your Children",
            description: "Develop your tech skills with our hands-on workshop and training platform. For Both Atal Thinkering Labs and Also for Non ATL Schools",
            buttonLabel: "Our Services",
            buttonLink: "#custom-services",
            phoneNumber: "8548866226"
        },
        {
            title: "Internships and Professional Guidance",
            subtitle: "Perfect way to find the job of your dreams",
            description: "Please contact us. Our resources connect you to potential employers quickly and efficiently. Don't let the perfect job slip by - let JobFixer put you in the driver's seat.",
            buttonLabel: "Join Community",
            buttonLink: "#custom-video",
            phoneNumber: "8548866226"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % items.length);
        }, 5000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-section">
            <div className="cover-image">
                <img src={stockImage} alt="Cover" className="img-fluid" />
            </div>
            <div className="centered-content">
                <div className="content">
                    <div className="child-div1">
                        <div className="custom-item-show">
                            <h1>{items[currentIndex].title}</h1>
                            <h2>{items[currentIndex].subtitle}</h2>
                            <p>{items[currentIndex].description}</p>
                            <div className="custom-down-buttons">
                                <button className="btn btn-primary" onClick={() => window.location.href=items[currentIndex].buttonLink}>{items[currentIndex].buttonLabel}</button>
                                <br />
                                <br />
                                <div className="custom-call-button">
                                    <a href="#" className="custom-call-link"><i className="fa fa-phone"></i> {items[currentIndex].phoneNumber}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
