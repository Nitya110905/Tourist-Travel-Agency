import React, { useState } from 'react';
import API from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Uregister() {
  const [data, setdata] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    pass: '',
    status: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const redirect = useNavigate();

  const formchange = (e) => {
    setdata({
      ...data,
      id: new Date().getTime().toString(),
      status: 'unblocked',
      [e.target.name]: e.target.value
    });
    console.log(data);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (
      data.email.trim() === '' ||
      data.name.trim() === '' ||
      data.pass.trim() === '' ||
      data.phone.trim() === ''
    ) {
      toast.error('All Information Required...');
      return false;
    }

    try {
      const res = await API.post('/user', data);
      console.log(res.data);
      toast.success('Account created successfully! Please login.');
      setdata({
        id: '',
        name: '',
        email: '',
        phone: '',
        pass: '',
        status: ''
      });
      redirect('/Ulogin');
    } catch (error) {
      console.log(error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(20, 83, 45, 0.85) 100%), url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80) center/cover no-repeat fixed'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            <div className="card border-0 rounded-4 shadow-lg overflow-hidden bg-white">
              <div className="row g-0">
                {/* Left Side Banner Image */}
                <div className="col-md-5 d-none d-md-block position-relative">
                  <img
                    src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=800&q=80"
                    alt="Travel Registration"
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-between p-4 text-white"
                    style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)' }}
                  >
                    <div>
                      <Link to="/" className="text-white text-decoration-none d-flex align-items-center">
                        <i className="fa fa-map-marker-alt fa-2x text-primary me-2" />
                        <span className="fs-3 fw-bold tracking-wide">Tourist</span>
                      </Link>
                    </div>
                    <div>
                      <h4 className="text-white fw-bold mb-2">Start Your Adventure</h4>
                      <p className="small text-light mb-0">
                        Create an account today to discover exclusive destinations, travel deals, and seamless booking experiences.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side Registration Form */}
                <div className="col-12 col-md-7 p-4 p-lg-5 d-flex flex-column justify-content-center">
                  <div className="text-center text-md-start mb-4">
                    <div className="d-inline-block d-md-none mb-3">
                      <Link to="/" className="text-decoration-none d-flex align-items-center justify-content-center">
                        <i className="fa fa-map-marker-alt fa-2x text-primary me-2" />
                        <span className="fs-3 fw-bold text-dark">Tourist</span>
                      </Link>
                    </div>
                    <h3 className="fw-bold text-dark mb-1">Create an Account</h3>
                    <p className="text-muted small">Fill in the details below to get registered.</p>
                  </div>

                  <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                      <label className="form-label text-secondary fw-semibold small">Full Name</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0 text-muted">
                          <i className="fa fa-user" />
                        </span>
                        <input
                          type="text"
                          className="form-control bg-light border-start-0 py-2"
                          name="name"
                          value={data.name}
                          onChange={formchange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-secondary fw-semibold small">Email Address</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0 text-muted">
                          <i className="fa fa-envelope" />
                        </span>
                        <input
                          type="email"
                          className="form-control bg-light border-start-0 py-2"
                          name="email"
                          value={data.email}
                          onChange={formchange}
                          placeholder="name@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-secondary fw-semibold small">Phone Number</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0 text-muted">
                          <i className="fa fa-phone-alt" />
                        </span>
                        <input
                          type="tel"
                          className="form-control bg-light border-start-0 py-2"
                          name="phone"
                          value={data.phone}
                          onChange={formchange}
                          placeholder="+1 234 567 8900"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-secondary fw-semibold small">Password</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0 text-muted">
                          <i className="fa fa-lock" />
                        </span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-control bg-light border-start-0 border-end-0 py-2"
                          name="pass"
                          value={data.pass}
                          onChange={formchange}
                          placeholder="Create a strong password"
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

                    <div className="form-check mb-4">
                      <input className="form-check-input" type="checkbox" id="termsCheck" required />
                      <label className="form-check-label text-muted small" htmlFor="termsCheck">
                        I agree to all statements in <a href="#terms" onClick={(e) => e.preventDefault()} className="text-primary text-decoration-none">Terms of service</a>
                      </label>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2 rounded-pill shadow-sm fw-bold mb-3">
                      <i className="fa fa-user-plus me-2" /> Register
                    </button>

                    <div className="text-center mt-3">
                      <p className="text-muted mb-0">
                        Already have an account ?{' '}
                        <Link to="/Ulogin" className="text-primary fw-bold text-decoration-none">
                          Login !
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Uregister;