import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Ulogin() {
  const [formvalue, setformvalue] = useState({
    email: '',
    pass: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const redirect = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { email, pass } = formvalue;

    if (!email.trim() || !pass.trim()) {
      toast.error('Email and password are required*');
      return false;
    }

    try {
      const res = await axios.get(`http://localhost:3000/user?email=${email}`);
      console.log(res.data);

      if (res.data.length === 0) {
        toast.error('Email does not match');
        return false;
      }

      const user = res.data[0];
      if (user.status === 'blocked' || user.status === 'block') {
        toast.error('You are blocked');
        return false;
      }

      if (user.pass !== pass) {
        toast.error('Password does not match');
        return false;
      }

      localStorage.setItem('userid', user.id);
      localStorage.setItem('username', user.name);
      toast.success('Login Succesfully');
      setformvalue({ email: '', pass: '' });
      redirect('/');
    } catch (error) {
      console.log('Error: ', error);
      toast.error('An error occurred during login');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('userid')) {
      redirect('/');
    }
  }, [redirect]);

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(20, 83, 45, 0.85) 100%), url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80) center/cover no-repeat fixed'
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
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                    alt="Travel Login"
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
                      <h4 className="text-white fw-bold mb-2">Explore The World</h4>
                      <p className="small text-light mb-0">
                        Login to access your personalized travel packages, custom itineraries, and bookings.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side Form */}
                <div className="col-12 col-md-7 p-4 p-lg-5 d-flex flex-column justify-content-center">
                  <div className="text-center text-md-start mb-4">
                    <div className="d-inline-block d-md-none mb-3">
                      <Link to="/" className="text-decoration-none d-flex align-items-center justify-content-center">
                        <i className="fa fa-map-marker-alt fa-2x text-primary me-2" />
                        <span className="fs-3 fw-bold text-dark">Tourist</span>
                      </Link>
                    </div>
                    <h3 className="fw-bold text-dark mb-1">Welcome Back!</h3>
                    <p className="text-muted small">Please enter your credentials to login.</p>
                  </div>

                  <form onSubmit={handlesubmit}>
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
                          value={formvalue.email}
                          onChange={(e) => setformvalue({ ...formvalue, email: e.target.value })}
                          placeholder="name@example.com"
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
                          value={formvalue.pass}
                          onChange={(e) => setformvalue({ ...formvalue, pass: e.target.value })}
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

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="rememberMe" />
                        <label className="form-check-label text-muted small" htmlFor="rememberMe">
                          Remember me
                        </label>
                      </div>
                      <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-primary small text-decoration-none fw-semibold">
                        Forgot password?
                      </a>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2 rounded-pill shadow-sm fw-bold mb-3">
                      <i className="fa fa-sign-in-alt me-2" /> Login
                    </button>

                    <div className="text-center mt-3">
                      <p className="text-muted mb-0">
                        New here ?{' '}
                        <Link to="/Uregister" className="text-primary fw-bold text-decoration-none">
                          Register !
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

export default Ulogin;
