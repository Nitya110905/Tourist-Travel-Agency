import React, { useState } from 'react';
import Aheader from '../ACommon_Compo/Aheader';
import Afooter from '../ACommon_Compo/Afooter';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../../api';
import { toast } from 'react-toastify';

function Add_profile() {
  const redirect = useNavigate();
  const [profile, setprofile] = useState({
    id: '',
    image: '',
    Name: '',
    desc: ''
  });

  const handlechange = (e) => {
    setprofile({
      ...profile,
      id: new Date().getTime().toString(),
      [e.target.name]: e.target.value
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!profile.image.trim() || !profile.Name.trim() || !profile.desc.trim()) {
      toast.error('Please fill in all required profile details!');
      return false;
    }

    try {
      await API.post('/about', profile);
      toast.success('Team guide profile added successfully!');
      setprofile({
        id: '',
        image: '',
        Name: '',
        desc: ''
      });
      redirect('/aboutman');
    } catch (error) {
      console.error('Error adding profile:', error);
      toast.error('Failed to add profile');
    }
  };

  return (
    <div className="bg-white">
      {/* Full-width Header */}
      <Aheader desc="Add Team Guide" />

      {/* Main Content Section */}
      <div className="container-xxl py-5">
        <div className="container">
          {/* Section Header */}
          <div className="text-center wow fadeInUp mb-5" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">Administration</h6>
            <h1 className="mb-2">Add Team Guide Profile</h1>
            <p className="text-muted">Register a new tour guide or staff member to be featured on the About page.</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-9 col-xl-8">
              <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-5">
                <div className="card-header bg-primary text-white py-3 px-4 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 text-white">
                    <i className="fa fa-user-plus me-2" /> New Guide Profile Form
                  </h5>
                  <Link to="/aboutman" className="btn btn-sm btn-outline-light rounded-pill px-3">
                    <i className="fa fa-list me-1" /> View All Profiles
                  </Link>
                </div>

                <div className="card-body p-4 p-lg-5 bg-light">
                  <form onSubmit={handlesubmit}>
                    <div className="row g-3">
                      {/* Photo URL */}
                      <div className="col-md-6">
                        <div className="form-floating bg-white rounded-3">
                          <input
                            type="url"
                            className="form-control"
                            id="profileImage"
                            name="image"
                            value={profile.image}
                            onChange={handlechange}
                            placeholder="Photo URL"
                            required
                          />
                          <label htmlFor="profileImage">Photo URL (https://...)</label>
                        </div>
                      </div>

                      {/* Full Name */}
                      <div className="col-md-6">
                        <div className="form-floating bg-white rounded-3">
                          <input
                            type="text"
                            className="form-control"
                            id="profileName"
                            name="Name"
                            value={profile.Name}
                            onChange={handlechange}
                            placeholder="Full Name"
                            required
                          />
                          <label htmlFor="profileName">Full Name</label>
                        </div>
                      </div>

                      {/* Live Photo Preview (if entered) */}
                      {profile.image && (
                        <div className="col-12 text-center my-2">
                          <div className="p-2 bg-white rounded-3 shadow-sm d-inline-block border">
                            <img
                              src={profile.image}
                              alt="Profile Preview"
                              className="rounded-circle border border-3 border-primary"
                              style={{ width: '90px', height: '90px', objectFit: 'cover' }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                            <small className="d-block text-muted mt-1">Photo Preview</small>
                          </div>
                        </div>
                      )}

                      {/* Description / Bio */}
                      <div className="col-12">
                        <div className="form-floating bg-white rounded-3">
                          <textarea
                            className="form-control"
                            id="profileDesc"
                            placeholder="Profile Bio & Specialization"
                            name="desc"
                            value={profile.desc}
                            onChange={handlechange}
                            style={{ height: 130 }}
                            required
                          />
                          <label htmlFor="profileDesc">Profile Bio & Specialization</label>
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
                              <i className="fa fa-user-plus me-2" /> Add Guide Profile
                            </button>
                          </div>
                          <div className="col-md-6">
                            <button
                              className="btn btn-outline-secondary w-100 py-3 rounded-pill fw-bold"
                              type="button"
                              onClick={() => redirect('/aboutman')}
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

export default Add_profile;
