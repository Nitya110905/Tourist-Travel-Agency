import React, { useState } from 'react';
import Aheader from '../ACommon_Compo/Aheader';
import Afooter from '../ACommon_Compo/Afooter';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Add_package() {
  const redirect = useNavigate();
  const [packages, setpackages] = useState({
    id: '',
    url: '',
    country: 'India',
    days: '3',
    person: '2',
    price: '',
    desc: ''
  });

  const handlechange = (e) => {
    setpackages({
      ...packages,
      id: new Date().getTime().toString(),
      [e.target.name]: e.target.value
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!packages.url.trim() || !packages.price.toString().trim() || !packages.desc.trim()) {
      toast.error('Please fill in all required package details!');
      return false;
    }

    try {
      await axios.post('http://localhost:3000/packages', packages);
      toast.success('Tour package added successfully!');
      setpackages({
        id: '',
        url: '',
        country: 'India',
        days: '3',
        person: '2',
        price: '',
        desc: ''
      });
      redirect('/packman');
    } catch (error) {
      console.error('Error adding package:', error);
      toast.error('Failed to add tour package');
    }
  };

  return (
    <div className="bg-white">
      {/* Full-width Header */}
      <Aheader desc="Add Tour Package" />

      {/* Main Content Section */}
      <div className="container-xxl py-5">
        <div className="container">
          {/* Section Header */}
          <div className="text-center wow fadeInUp mb-5" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">Administration</h6>
            <h1 className="mb-2">Create New Tour Package</h1>
            <p className="text-muted">Fill out the details below to publish a new travel destination package.</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-9 col-xl-8">
              <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-5">
                <div className="card-header bg-primary text-white py-3 px-4 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 text-white">
                    <i className="fa fa-plus-circle me-2" /> New Package Form
                  </h5>
                  <Link to="/packman" className="btn btn-sm btn-outline-light rounded-pill px-3">
                    <i className="fa fa-list me-1" /> View All Packages
                  </Link>
                </div>

                <div className="card-body p-4 p-lg-5 bg-light">
                  <form onSubmit={handlesubmit}>
                    <div className="row g-3">
                      {/* Image URL with live preview */}
                      <div className="col-12">
                        <div className="form-floating bg-white rounded-3">
                          <input
                            type="url"
                            className="form-control"
                            id="packageUrl"
                            name="url"
                            value={packages.url}
                            onChange={handlechange}
                            placeholder="Image URL"
                            required
                          />
                          <label htmlFor="packageUrl">Image URL (https://...)</label>
                        </div>
                      </div>

                      {/* Image Preview Thumbnail (if entered) */}
                      {packages.url && (
                        <div className="col-12 text-center my-2">
                          <div className="p-2 bg-white rounded-3 shadow-sm d-inline-block border">
                            <img
                              src={packages.url}
                              alt="Package Preview"
                              className="rounded-2"
                              style={{ maxHeight: '160px', maxWidth: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                            <small className="d-block text-muted mt-1">Image Preview</small>
                          </div>
                        </div>
                      )}

                      {/* Destination Country */}
                      <div className="col-md-6">
                        <div className="form-floating bg-white rounded-3">
                          <select
                            className="form-select"
                            id="destinationCountry"
                            name="country"
                            value={packages.country}
                            onChange={handlechange}
                          >
                            <option value="India">India</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Japan">Japan</option>
                            <option value="Australia">Australia</option>
                          </select>
                          <label htmlFor="destinationCountry">Destination Country</label>
                        </div>
                      </div>

                      {/* Package Price */}
                      <div className="col-md-6">
                        <div className="form-floating bg-white rounded-3">
                          <input
                            type="number"
                            className="form-control"
                            id="packagePrice"
                            name="price"
                            value={packages.price}
                            onChange={handlechange}
                            placeholder="Price in USD ($)"
                            required
                          />
                          <label htmlFor="packagePrice">Price ($ USD)</label>
                        </div>
                      </div>

                      {/* Duration (Days) */}
                      <div className="col-md-6">
                        <div className="form-floating bg-white rounded-3">
                          <select
                            className="form-select"
                            id="packageDays"
                            name="days"
                            value={packages.days}
                            onChange={handlechange}
                          >
                            <option value="2">2 Days / 1 Night</option>
                            <option value="3">3 Days / 2 Nights</option>
                            <option value="4">4 Days / 3 Nights</option>
                            <option value="5">5 Days / 4 Nights</option>
                            <option value="7">7 Days / 6 Nights</option>
                            <option value="10">10 Days / 9 Nights</option>
                          </select>
                          <label htmlFor="packageDays">Tour Duration</label>
                        </div>
                      </div>

                      {/* Persons Allowed */}
                      <div className="col-md-6">
                        <div className="form-floating bg-white rounded-3">
                          <select
                            className="form-select"
                            id="packagePerson"
                            name="person"
                            value={packages.person}
                            onChange={handlechange}
                          >
                            <option value="1">1 Person (Solo)</option>
                            <option value="2">2 Persons (Couple)</option>
                            <option value="3">3 Persons (Small Group)</option>
                            <option value="5">5 Persons (Family)</option>
                            <option value="8">8+ Persons (Group Tour)</option>
                          </select>
                          <label htmlFor="packagePerson">Max Persons</label>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="col-12">
                        <div className="form-floating bg-white rounded-3">
                          <textarea
                            className="form-control"
                            id="packageDesc"
                            placeholder="Package Highlights & Details"
                            name="desc"
                            value={packages.desc}
                            onChange={handlechange}
                            style={{ height: 130 }}
                            required
                          />
                          <label htmlFor="packageDesc">Package Highlights & Details</label>
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
                              <i className="fa fa-plus-circle me-2" /> Publish Package
                            </button>
                          </div>
                          <div className="col-md-6">
                            <button
                              className="btn btn-outline-secondary w-100 py-3 rounded-pill fw-bold"
                              type="button"
                              onClick={() => redirect('/packman')}
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

export default Add_package;
