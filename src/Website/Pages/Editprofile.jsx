import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function Editprofile() {
  const redirect = useNavigate();
  const [update, setupdate] = useState({
    id: '',
    name: '',
    email: '',
    pass: '',
    phone: '',
    status: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const fetchdata = async () => {
    try {
      const userId = localStorage.getItem('userid');
      if (!userId) {
        toast.error('Please login first');
        redirect('/Ulogin');
        return;
      }
      const res = await axios.get(`http://localhost:3000/user/${userId}`);
      console.log(res.data);
      setupdate(res.data);
    } catch (error) {
      console.log('Error in fetching user data', error);
      toast.error('Failed to load profile data');
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (
      !update.name ||
      update.name.trim() === '' ||
      !update.email ||
      update.email.trim() === '' ||
      !update.pass ||
      update.pass.trim() === '' ||
      !update.phone ||
      update.phone.trim() === ''
    ) {
      toast.error('All fields are necessary!');
      return false;
    }

    try {
      const res = await axios.patch(`http://localhost:3000/user/${update.id}`, update);
      if (res.status === 200) {
        localStorage.setItem('username', update.name);
        toast.success('Profile updated successfully!');
        redirect('/');
      }
    } catch (error) {
      console.log('Error Updating User', error);
      toast.error('Error updating profile');
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center py-5"
      style={{
        background:
          'linear-gradient(rgba(248, 250, 252, 0.92), rgba(240, 247, 238, 0.92)), url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80) center/cover no-repeat fixed'
      }}
    >
      <div className="container">
        {/* Top Brand & Navigation Header */}
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-lg-8 col-xl-7 d-flex justify-content-between align-items-center">
            <Link to="/" className="text-decoration-none d-flex align-items-center">
              <h2 className="text-primary m-0 fw-bold">
                <i className="fa fa-map-marker-alt me-2" />
                Tourist
              </h2>
            </Link>
            <Link to="/" className="btn btn-outline-primary rounded-pill px-3 py-2 fw-semibold small">
              <i className="fa fa-arrow-left me-1" /> Back to Home
            </Link>
          </div>
        </div>

        {/* Profile Card */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-7">
            <div className="card shadow-sm border border-light-subtle rounded-4 overflow-hidden bg-white">
              {/* Card Header Section */}
              <div className="text-center pt-5 pb-4 px-4 bg-white border-bottom border-light">
                
                <h1 className="fw-bold text-dark mb-1">{update.name || 'User Profile'}</h1>
                <p className="text-muted small mb-0">
                  <i className="fa fa-envelope text-primary me-1" /> {update.email || 'user@example.com'}
                </p>
              </div>

              {/* Form Body */}
              <div className="card-body p-4 p-md-5">
                <form onSubmit={handlesubmit}>
                  <div className="row g-3">
                    {/* Full Name */}
                    <div className="col-md-6">
                      <label className="form-label text-secondary fw-semibold small">Full Name</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0 text-muted">
                          <i className="fa fa-user" />
                        </span>
                        <input
                          type="text"
                          className="form-control bg-light border-start-0 py-2"
                          name="name"
                          value={update.name || ''}
                          onChange={(e) => setupdate({ ...update, name: e.target.value })}
                          placeholder="Your Name"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label className="form-label text-secondary fw-semibold small">Email Address</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0 text-muted">
                          <i className="fa fa-envelope" />
                        </span>
                        <input
                          type="email"
                          className="form-control bg-light border-start-0 py-2"
                          name="email"
                          value={update.email || ''}
                          onChange={(e) => setupdate({ ...update, email: e.target.value })}
                          placeholder="name@example.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="col-md-6">
                      <label className="form-label text-secondary fw-semibold small">Phone Number</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0 text-muted">
                          <i className="fa fa-phone-alt" />
                        </span>
                        <input
                          type="tel"
                          className="form-control bg-light border-start-0 py-2"
                          name="phone"
                          value={update.phone || ''}
                          onChange={(e) => setupdate({ ...update, phone: e.target.value })}
                          placeholder="+1 234 567 8900"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="col-md-6">
                      <label className="form-label text-secondary fw-semibold small">Password</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0 text-muted">
                          <i className="fa fa-lock" />
                        </span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-control bg-light border-start-0 border-end-0 py-2"
                          name="pass"
                          value={update.pass || ''}
                          onChange={(e) => setupdate({ ...update, pass: e.target.value })}
                          placeholder="Enter password"
                          required
                        />
                        <button
                          type="button"
                          className="input-group-text bg-light border-start-0 text-muted"
                          onClick={() => setShowPassword(!showPassword)}
                          title={showPassword ? 'Hide password' : 'Show password'}
                        >
                          <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="col-12 mt-4 pt-2">
                      <div className="row g-3">
                        <div className="col-sm-6">
                          <button
                            type="submit"
                            className="btn btn-primary w-100 py-2 rounded-pill shadow-sm fw-bold"
                          >
                            <i className="fa fa-save me-2" />   Update
                          </button>
                        </div>
                        <div className="col-sm-6">
                          <button
                            type="button"
                            className="btn btn-outline-secondary w-100 py-2 rounded-pill fw-bold"
                            onClick={() => redirect('/')}
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
  );
}

export default Editprofile;
