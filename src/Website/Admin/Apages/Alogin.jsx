import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Alogin() {
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
      toast.error('Email and Password are required');
      return false;
    }

    try {
      const res = await axios.get(`http://localhost:3000/admin?email=${email}`);
      console.log(res.data);

      if (res.data.length === 0) {
        toast.error('Email does not match!');
        return false;
      }

      const admin = res.data[0];
      if (admin.pass !== pass) {
        toast.error('Password does not match!');
        return false;
      }

      localStorage.setItem('adminid', admin.id);
      localStorage.setItem('adminname', admin.name);
      toast.success('Login Succesfully');
      redirect('/Dashboard');
    } catch (error) {
      console.log('Error', error);
      toast.error('An error occurred during admin login');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('adminid')) {
      redirect('/Dashboard');
    }
  }, [redirect]);

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            {/* Admin Login Card */}
            <div className="card border-0 rounded-4 shadow-lg overflow-hidden bg-white">
              {/* Header Gradient */}
              <div
                className="p-4 text-center text-white"
                style={{
                  background: 'linear-gradient(135deg, #86B817 0%, #0F172B 100%)'
                }}
              >
                <div
                  className="rounded-circle bg-white text-primary d-inline-flex align-items-center justify-content-center shadow mb-3 border border-4 border-white"
                  style={{ width: '70px', height: '70px' }}
                >
                  <i className="fa fa-user-shield fa-2x" />
                </div>
                <h3 className="fw-bold text-white mb-1">Admin Portal</h3>
                <p className="small text-white-50 mb-0">Tourist Administration Access</p>
              </div>

              {/* Form Body */}
              <div className="card-body p-4 p-md-5">
                <form onSubmit={handlesubmit}>
                  <div className="mb-3">
                    <label className="form-label text-secondary fw-semibold small">Admin Email</label>
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
                        placeholder="admin@example.com"
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
                        placeholder="Enter admin password"
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
                      <input className="form-check-input" type="checkbox" id="adminRemember" />
                      <label className="form-check-label text-muted small" htmlFor="adminRemember">
                        Remember session
                      </label>
                    </div>
                    <a href="#support" onClick={(e) => e.preventDefault()} className="text-primary small text-decoration-none fw-semibold">
                      Need help?
                    </a>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 py-3 rounded-pill shadow-sm fw-bold mb-3">
                    <i className="fa fa-shield-alt me-2" /> Sign In to Dashboard
                  </button>

                  <div className="text-center mt-3 pt-2 border-top">
                    <Link to="/" className="text-muted small text-decoration-none d-inline-flex align-items-center">
                      <i className="fa fa-arrow-left me-1" /> Back to Main Website
                    </Link>
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

export default Alogin;
