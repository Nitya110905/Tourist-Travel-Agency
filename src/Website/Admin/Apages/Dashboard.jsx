import React, { useEffect, useState } from 'react';
import Aheader from '../ACommon_Compo/Aheader';
import Afooter from '../ACommon_Compo/Afooter';
import { Link } from 'react-router-dom';
import API from '../../../api';
import { toast } from 'react-toastify';

function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    packages: 0,
    services: 0,
    about: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const [usersRes, packagesRes, servicesRes, aboutRes] = await Promise.all([
        API.get('/user'),
        API.get('/packages'),
        API.get('/services'),
        API.get('/about')
      ]);

      setStats({
        users: usersRes.data.length,
        packages: packagesRes.data.length,
        services: servicesRes.data.length,
        about: aboutRes.data.length
      });
      setLoading(false);
    } catch (error) {
      console.error('Failed to load dashboard metrics:', error);
      toast.error('Failed to load dashboard data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="bg-white">
      {/* Full-width Header */}
      <Aheader desc="Admin Dashboard" />

      {/* Main Content Section */}
      <div className="container-xxl py-5">
        <div className="container">
          {/* Section Heading */}
          <div className="text-center wow fadeInUp mb-5" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">System Overview</h6>
            <h1 className="mb-2">Admin Control Center</h1>
            <p className="text-muted">
              Welcome back, <strong>{localStorage.getItem('adminname') || 'Administrator'}</strong>! Here is your system overview.
            </p>
          </div>

          {/* 4 Statistical Widget Cards */}
          <div className="row g-4 mb-5">
            {/* Users Card */}
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="card border-0 shadow-sm rounded-4 h-100 p-4 bg-white border-start border-4 border-primary">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <span className="text-muted text-uppercase fw-semibold small">Total Users</span>
                    <h2 className="text-dark fw-bold mb-0 mt-1">{loading ? '...' : stats.users}</h2>
                  </div>
                  <div
                    className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center"
                    style={{ width: '56px', height: '56px' }}
                  >
                    <i className="fa fa-users fa-2x" />
                  </div>
                </div>
                <hr className="my-2 border-light" />
                <div className="d-flex justify-content-between align-items-center pt-2">
                  <span className="small text-muted">Registered accounts</span>
                  <Link to="/usermanage" className="small text-primary fw-bold text-decoration-none">
                    Manage <i className="fa fa-arrow-right ms-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Packages Card */}
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.2s">
              <div className="card border-0 shadow-sm rounded-4 h-100 p-4 bg-white border-start border-4 border-success">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <span className="text-muted text-uppercase fw-semibold small">Tour Packages</span>
                    <h2 className="text-dark fw-bold mb-0 mt-1">{loading ? '...' : stats.packages}</h2>
                  </div>
                  <div
                    className="rounded-circle bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center"
                    style={{ width: '56px', height: '56px' }}
                  >
                    <i className="fa fa-map-marked-alt fa-2x" />
                  </div>
                </div>
                <hr className="my-2 border-light" />
                <div className="d-flex justify-content-between align-items-center pt-2">
                  <span className="small text-muted">Active destinations</span>
                  <Link to="/packman" className="small text-success fw-bold text-decoration-none">
                    Manage <i className="fa fa-arrow-right ms-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Services Card */}
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="card border-0 shadow-sm rounded-4 h-100 p-4 bg-white border-start border-4 border-info">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <span className="text-muted text-uppercase fw-semibold small">Services</span>
                    <h2 className="text-dark fw-bold mb-0 mt-1">{loading ? '...' : stats.services}</h2>
                  </div>
                  <div
                    className="rounded-circle bg-info bg-opacity-10 text-info d-flex align-items-center justify-content-center"
                    style={{ width: '56px', height: '56px' }}
                  >
                    <i className="fa fa-concierge-bell fa-2x" />
                  </div>
                </div>
                <hr className="my-2 border-light" />
                <div className="d-flex justify-content-between align-items-center pt-2">
                  <span className="small text-muted">Available offerings</span>
                  <Link to="/serviceman" className="small text-info fw-bold text-decoration-none">
                    Manage <i className="fa fa-arrow-right ms-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Team Profiles Card */}
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.4s">
              <div className="card border-0 shadow-sm rounded-4 h-100 p-4 bg-white border-start border-4 border-warning">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <span className="text-muted text-uppercase fw-semibold small">Team Guides</span>
                    <h2 className="text-dark fw-bold mb-0 mt-1">{loading ? '...' : stats.about}</h2>
                  </div>
                  <div
                    className="rounded-circle bg-warning bg-opacity-10 text-warning d-flex align-items-center justify-content-center"
                    style={{ width: '56px', height: '56px' }}
                  >
                    <i className="fa fa-user-tie fa-2x" />
                  </div>
                </div>
                <hr className="my-2 border-light" />
                <div className="d-flex justify-content-between align-items-center pt-2">
                  <span className="small text-muted">Staff & guides</span>
                  <Link to="/aboutman" className="small text-warning fw-bold text-decoration-none">
                    Manage <i className="fa fa-arrow-right ms-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions & Navigation Grid */}
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-5">
            <div className="card-header bg-primary text-white py-3 px-4">
              <h5 className="mb-0 text-white">
                <i className="fa fa-bolt me-2" /> Quick Management Actions
              </h5>
            </div>
            <div className="card-body p-4 bg-light">
              <div className="row g-3">
                <div className="col-md-6 col-lg-3">
                  <Link
                    to="/addpack"
                    className="btn btn-white w-100 p-3 shadow-sm rounded-4 text-start border d-flex align-items-center bg-white text-decoration-none"
                  >
                    <div
                      className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3"
                      style={{ width: '45px', height: '45px' }}
                    >
                      <i className="fa fa-plus" />
                    </div>
                    <div>
                      <strong className="d-block text-dark">Add Package</strong>
                      <small className="text-muted">Create tour package</small>
                    </div>
                  </Link>
                </div>

                <div className="col-md-6 col-lg-3">
                  <Link
                    to="/addservice"
                    className="btn btn-white w-100 p-3 shadow-sm rounded-4 text-start border d-flex align-items-center bg-white text-decoration-none"
                  >
                    <div
                      className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center me-3"
                      style={{ width: '45px', height: '45px' }}
                    >
                      <i className="fa fa-plus" />
                    </div>
                    <div>
                      <strong className="d-block text-dark">Add Service</strong>
                      <small className="text-muted">Register new feature</small>
                    </div>
                  </Link>
                </div>

                <div className="col-md-6 col-lg-3">
                  <Link
                    to="/addabout"
                    className="btn btn-white w-100 p-3 shadow-sm rounded-4 text-start border d-flex align-items-center bg-white text-decoration-none"
                  >
                    <div
                      className="rounded-circle bg-warning text-white d-flex align-items-center justify-content-center me-3"
                      style={{ width: '45px', height: '45px' }}
                    >
                      <i className="fa fa-plus" />
                    </div>
                    <div>
                      <strong className="d-block text-dark">Add Profile</strong>
                      <small className="text-muted">Add guide/member</small>
                    </div>
                  </Link>
                </div>

                <div className="col-md-6 col-lg-3">
                  <Link
                    to="/usermanage"
                    className="btn btn-white w-100 p-3 shadow-sm rounded-4 text-start border d-flex align-items-center bg-white text-decoration-none"
                  >
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                      style={{ width: '45px', height: '45px' }}
                    >
                      <i className="fa fa-user-cog" />
                    </div>
                    <div>
                      <strong className="d-block text-dark">User Control</strong>
                      <small className="text-muted">Manage & block users</small>
                    </div>
                  </Link>
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

export default Dashboard;