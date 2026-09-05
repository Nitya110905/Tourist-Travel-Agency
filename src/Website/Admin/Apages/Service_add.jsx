import React, { useState } from 'react';
import Aheader from '../ACommon_Compo/Aheader';
import Afooter from '../ACommon_Compo/Afooter';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../../api';
import { toast } from 'react-toastify';

function Service_add() {
  const redirect = useNavigate();
  const [service, setservice] = useState({
    id: '',
    icon: '',
    title: '',
    desc: ''
  });

  const handlechange = (e) => {
    setservice({
      ...service,
      id: new Date().getTime().toString(),
      [e.target.name]: e.target.value
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!service.icon.trim() || !service.title.trim() || !service.desc.trim()) {
      toast.error('Please fill in all required service details!');
      return false;
    }

    try {
      await API.post('/services', service);
      toast.success('Service added successfully!');
      setservice({
        id: '',
        icon: '',
        title: '',
        desc: ''
      });
      redirect('/serviceman');
    } catch (error) {
      console.error('Error adding service:', error);
      toast.error('Failed to add service');
    }
  };

  return (
    <div className="bg-white">
      {/* Full-width Header */}
      <Aheader desc="Add Service" />

      {/* Main Content Section */}
      <div className="container-xxl py-5">
        <div className="container">
          {/* Section Header */}
          <div className="text-center wow fadeInUp mb-5" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">Administration</h6>
            <h1 className="mb-2">Create New Service</h1>
            <p className="text-muted">Fill out the form below to publish a new service offering for tourists.</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-9 col-xl-8">
              <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-5">
                <div className="card-header bg-primary text-white py-3 px-4 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 text-white">
                    <i className="fa fa-plus-circle me-2" /> New Service Form
                  </h5>
                  <Link to="/serviceman" className="btn btn-sm btn-outline-light rounded-pill px-3">
                    <i className="fa fa-list me-1" /> View All Services
                  </Link>
                </div>

                <div className="card-body p-4 p-lg-5 bg-light">
                  <form onSubmit={handlesubmit}>
                    <div className="row g-3">
                      {/* Icon / Image URL */}
                      <div className="col-md-6">
                        <div className="form-floating bg-white rounded-3">
                          <input
                            type="url"
                            className="form-control"
                            id="serviceIcon"
                            name="icon"
                            value={service.icon}
                            onChange={handlechange}
                            placeholder="Icon / Image URL"
                            required
                          />
                          <label htmlFor="serviceIcon">Icon / Image URL (https://...)</label>
                        </div>
                      </div>

                      {/* Service Title */}
                      <div className="col-md-6">
                        <div className="form-floating bg-white rounded-3">
                          <input
                            type="text"
                            className="form-control"
                            id="serviceTitle"
                            name="title"
                            value={service.title}
                            onChange={handlechange}
                            placeholder="Service Title"
                            required
                          />
                          <label htmlFor="serviceTitle">Service Title</label>
                        </div>
                      </div>

                      {/* Live Image/Icon Preview (if entered) */}
                      {service.icon && (
                        <div className="col-12 text-center my-2">
                          <div className="p-2 bg-white rounded-3 shadow-sm d-inline-block border">
                            {service.icon.startsWith('http') || service.icon.startsWith('/') || service.icon.startsWith('data:') ? (
                              <img
                                src={service.icon}
                                alt="Service Preview"
                                className="rounded-2"
                                style={{ maxHeight: '110px', maxWidth: '100%', objectFit: 'cover' }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            ) : (
                              <i className={`fa ${service.icon} fa-3x text-primary p-2`} />
                            )}
                            <small className="d-block text-muted mt-1">Icon Preview</small>
                          </div>
                        </div>
                      )}

                      {/* Description */}
                      <div className="col-12">
                        <div className="form-floating bg-white rounded-3">
                          <textarea
                            className="form-control"
                            id="serviceDesc"
                            placeholder="Service Description & Features"
                            name="desc"
                            value={service.desc}
                            onChange={handlechange}
                            style={{ height: 130 }}
                            required
                          />
                          <label htmlFor="serviceDesc">Service Description & Features</label>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="col-12 mt-4">
                        <div className="row g-3">
                          <div className="col-md-6">
                            <button
                              className="btn btn-primary w-100 py-3 rounded-pill shadow-sm fw-bold"
                              type="submit"
                            >
                              <i className="fa fa-plus-circle me-2" /> Publish Service
                            </button>
                          </div>
                          <div className="col-md-6">
                            <button
                              className="btn btn-outline-secondary w-100 py-3 rounded-pill fw-bold"
                              type="button"
                              onClick={() => redirect('/serviceman')}
                            >
                              <i className="fa fa-times me-2" /> Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Footer */}
      <Afooter />
    </div>
  );
}

export default Service_add;
