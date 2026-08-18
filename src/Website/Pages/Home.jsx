import React, { useEffect, useState } from 'react'
import Header from '../Comm_Compo/Header'
import Footer from '../Comm_Compo/Footer'
import axios from 'axios'

function Home() {
    const [data,setdata] = useState([])
    useEffect(()=>{
        fetchdata();
        fetchabout();
        fetchservice()
    },[])
    const fetchdata=async()=>{
        const res = await axios.get("http://localhost:3000/packages")
        console.log(res.data);
        setdata(res.data);
    }
    const[about,setabout] = useState([])

    const fetchabout = async()=>{
        const res = await axios.get("http://localhost:3000/about");
        console.log(res.data);
        setabout(res.data);
    }
    const [service,setservice] = useState([])
    const fetchservice = async()=>{
        const res = await axios.get("http://localhost:3000/services");
        setservice(res.data)
    }
    
    return (
        <div>
            <div>
                <Header desc = "Enjoy Your vacation with us!"/>
                {/* About Start */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style={{ minHeight: 400 }}>
                                <div className="position-relative h-100">
                                    <img className="img-fluid position-absolute w-100 h-100" src="img/about.jpg" alt="about" style={{ objectFit: 'cover' }} />
                                </div>
                            </div>
                            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                                <h6 className="section-title bg-white text-start text-primary pe-3">About Us</h6>
                                <h1 className="mb-4">Welcome to <span className="text-primary">Tourist</span></h1>
                                <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                                <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                                <div className="row gy-2 gx-4 mb-4">
                                    <div className="col-sm-6">
                                        <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2" />First Class Flights</p>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2" />Handpicked Hotels</p>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2" />5 Star Accommodations</p>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2" />Latest Model Vehicles</p>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2" />150 Premium City Tours</p>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2" />24/7 Service</p>
                                    </div>
                                </div>
                                <a className="btn btn-primary py-3 px-5 mt-2" href="#!">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* About End */}
                {/* Service Start */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="section-title bg-white text-center text-primary px-3">Services</h6>
                            <h1 className="mb-5">Our Services</h1>
                        </div>
                        <div className="row g-4">
                            {
                                service && service.map((item, index)=>{
                                    return(
                                        <div key={item.id || index} className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                                            <div className="service-item rounded pt-3 h-100 d-flex flex-column">
                                                <div className="p-4 d-flex flex-column h-100 text-center">
                                                    <div className="mb-3 d-flex justify-content-center align-items-center" style={{ height: '120px' }}>
                                                        <img src={item.icon} style={{ maxWidth: '120px', maxHeight: '120px', objectFit: 'contain' }} alt={item.title || "Service Icon"} />
                                                    </div>
                                                    <h5>{item.title}</h5>
                                                    <p className="m-0 flex-grow-1">{item.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {/* Service End */}
                {/* Destination Start */}
                <div className="container-xxl py-5 destination">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="section-title bg-white text-center text-primary px-3">Destination</h6>
                            <h1 className="mb-5">Popular Destination</h1>
                        </div>
                        <div className="row g-3">
                            <div className="col-lg-7 col-md-6">
                                <div className="row g-3">
                                    <div className="col-lg-12 col-md-12 wow zoomIn" data-wow-delay="0.1s">
                                        <a className="position-relative d-block overflow-hidden" href="#!">
                                            <img className="img-fluid" src="img/destination-1.jpg" alt="destination 1" />
                                            <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">30% OFF</div>
                                            <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Thailand</div>
                                        </a>
                                    </div>
                                    <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.3s">
                                        <a className="position-relative d-block overflow-hidden" href="#!">
                                            <img className="img-fluid" src="img/destination-2.jpg" alt="destination 2" />
                                            <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">25% OFF</div>
                                            <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Malaysia</div>
                                        </a>
                                    </div>
                                    <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.5s">
                                        <a className="position-relative d-block overflow-hidden" href="#!">
                                            <img className="img-fluid" src="img/destination-3.jpg" alt="destination 3" />
                                            <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">35% OFF</div>
                                            <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Australia</div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-6 wow zoomIn" data-wow-delay="0.7s" style={{ minHeight: 350 }}>
                                <a className="position-relative d-block h-100 overflow-hidden" href="#!">
                                    <img className="img-fluid position-absolute w-100 h-100" src="img/destination-4.jpg" alt="destination 4" style={{ objectFit: 'cover' }} />
                                    <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">20% OFF</div>
                                    <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">Indonesia</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Destination End */}
                {/* Package Start */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="section-title bg-white text-center text-primary px-3">Packages</h6>
                            <h1 className="mb-5">Awesome Packages</h1>
                        </div>
                        <div className="row g-4 justify-content-center">
                            {/* && is used if api is by chance not called then data of api will be stored in first data or else if called perfectly all the information of api will be stored in second data */}
                            {
                                data && data.map((item, index)=>{
                                    return(
                                        <div key={item.id || index} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                            <div className="package-item h-100 d-flex flex-column">
                                                <div className="overflow-hidden" style={{ height: '250px' }}>
                                                    <img className="img-fluid w-100 h-100" src={item.url} alt={item.country || "Package"} style={{ objectFit: 'cover' }} />
                                                </div>
                                                <div className="d-flex border-bottom">
                                                    <small className="flex-fill text-center border-end py-2"><i className="fa fa-map-marker-alt text-primary me-2" />{item.country}</small>
                                                    <small className="flex-fill text-center border-end py-2"><i className="fa fa-calendar-alt text-primary me-2" />{item.days} days</small>
                                                    <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2" />{item.person}</small>
                                                </div>
                                                <div className="text-center p-4 d-flex flex-column flex-grow-1">
                                                    <h3 className="mb-0">{item.price} $</h3>
                                                    <div className="mb-3">
                                                        <small className="fa fa-star text-primary" />
                                                        <small className="fa fa-star text-primary" />
                                                        <small className="fa fa-star text-primary" />
                                                        <small className="fa fa-star text-primary" />
                                                        <small className="fa fa-star text-primary" />
                                                    </div>
                                                    <p className="flex-grow-1">{item.desc}</p>
                                                    <div className="d-flex justify-content-center mb-2 mt-auto">
                                                        <a href="#!" className="btn btn-sm btn-primary px-3 border-end" style={{ borderRadius: '30px 0 0 30px' }}>Read More</a>
                                                        <a href="#!" className="btn btn-sm btn-primary px-3" style={{ borderRadius: '0 30px 30px 0' }}>Book Now</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {/* Package End */}
                {/* Process Start */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center pb-4 wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="section-title bg-white text-center text-primary px-3">Process</h6>
                            <h1 className="mb-5">3 Easy Steps</h1>
                        </div>
                        <div className="row gy-5 gx-4 justify-content-center">
                            <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                    <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow" style={{ width: 100, height: 100 }}>
                                        <i className="fa fa-globe fa-3x text-white" />
                                    </div>
                                    <h5 className="mt-4">Choose A Destination</h5>
                                    <hr className="w-25 mx-auto bg-primary mb-1" />
                                    <hr className="w-50 mx-auto bg-primary mt-0" />
                                    <p className="mb-0">Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam eos erat ipsum et lorem et sit sed stet lorem sit</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.3s">
                                <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                    <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow" style={{ width: 100, height: 100 }}>
                                        <i className="fa fa-dollar-sign fa-3x text-white" />
                                    </div>
                                    <h5 className="mt-4">Pay Online</h5>
                                    <hr className="w-25 mx-auto bg-primary mb-1" />
                                    <hr className="w-50 mx-auto bg-primary mt-0" />
                                    <p className="mb-0">Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam eos erat ipsum et lorem et sit sed stet lorem sit</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp" data-wow-delay="0.5s">
                                <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                    <div className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow" style={{ width: 100, height: 100 }}>
                                        <i className="fa fa-plane fa-3x text-white" />
                                    </div>
                                    <h5 className="mt-4">Fly Today</h5>
                                    <hr className="w-25 mx-auto bg-primary mb-1" />
                                    <hr className="w-50 mx-auto bg-primary mt-0" />
                                    <p className="mb-0">Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam eos erat ipsum et lorem et sit sed stet lorem sit</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Process Start */}
                {/* Team Start */}
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                            <h6 className="section-title bg-white text-center text-primary px-3">Travel Guide</h6>
                            <h1 className="mb-5">Meet Our Guide</h1>
                        </div>
                        <div className="row g-4">
                            {
                                about && about.map((item, index)=>{
                                    return(
                                        <div key={item.id || index} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                            <div className="team-item h-100 d-flex flex-column">
                                                <div className="overflow-hidden" style={{ height: '250px' }}>
                                                    <img className="img-fluid w-100 h-100" src={item.image} alt={item.Name || "Member"} style={{ objectFit: 'cover' }} />
                                                </div>
                                                <div className="position-relative d-flex justify-content-center" style={{ marginTop: '-19px' }}>
                                                    <a className="btn btn-square mx-1" href="#!"><i className="fab fa-facebook-f" /></a>
                                                    <a className="btn btn-square mx-1" href="#!"><i className="fab fa-twitter" /></a>
                                                    <a className="btn btn-square mx-1" href="#!"><i className="fab fa-instagram" /></a>
                                                </div>
                                                <div className="text-center p-4 d-flex flex-column flex-grow-1 justify-content-center">
                                                    <h5 className="mb-0">{item.Name}</h5>
                                                    <small>{item.desc}</small>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {/* Team End */}
                {/* Testimonial Start */}
                <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="container">
                        <div className="text-center">
                            <h6 className="section-title bg-white text-center text-primary px-3">Testimonial</h6>
                            <h1 className="mb-5">Our Clients Say!!!</h1>
                        </div>
                        <div className="owl-carousel testimonial-carousel position-relative">
                            <div className="testimonial-item bg-white text-center border p-4">
                                <img className="bg-white rounded-circle shadow p-1 mx-auto mb-3" src="img/testimonial-1.jpg" style={{ width: 80, height: 80 }} />
                                <h5 className="mb-0">John Doe</h5>
                                <p>New York, USA</p>
                                <p className="mb-0">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                            </div>
                            <div className="testimonial-item bg-white text-center border p-4">
                                <img className="bg-white rounded-circle shadow p-1 mx-auto mb-3" src="img/testimonial-2.jpg" style={{ width: 80, height: 80 }} />
                                <h5 className="mb-0">John Doe</h5>
                                <p>New York, USA</p>
                                <p className="mt-2 mb-0">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                            </div>
                            <div className="testimonial-item bg-white text-center border p-4">
                                <img className="bg-white rounded-circle shadow p-1 mx-auto mb-3" src="img/testimonial-3.jpg" style={{ width: 80, height: 80 }} />
                                <h5 className="mb-0">John Doe</h5>
                                <p>New York, USA</p>
                                <p className="mt-2 mb-0">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                            </div>
                            <div className="testimonial-item bg-white text-center border p-4">
                                <img className="bg-white rounded-circle shadow p-1 mx-auto mb-3" src="img/testimonial-4.jpg" style={{ width: 80, height: 80 }} />
                                <h5 className="mb-0">John Doe</h5>
                                <p>New York, USA</p>
                                <p className="mt-2 mb-0">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Testimonial End */}
                <Footer/>
            </div>

        </div>
    )
}

export default Home
