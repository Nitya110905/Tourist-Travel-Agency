import React, { useEffect, useState } from 'react';
import Aheader from '../ACommon_Compo/Aheader';
import Afooter from '../ACommon_Compo/Afooter';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import { toast } from 'react-toastify';

function Usermanage() {
  const [user, setuser] = useState([]);
  const [view, setview] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    status: '',
    pass: ''
  });

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user');
      setuser(res.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('Failed to load users');
    }
  };

  const handledel = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:3000/user/${id}`);
        toast.success('User deleted successfully!');
        fetchdata();
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    }
  };

  const handleview = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/user/${id}`);
      setview(res.data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      toast.error('Failed to fetch user details');
    }
  };

  // Status toggle handler
  const handlestatus = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/user/${id}`);
      const currentstatus = res.data.status;
      const isBlocked = currentstatus === 'blocked' || currentstatus === 'block';
      const newStatus = isBlocked ? 'unblocked' : 'blocked';

      const updateRes = await axios.patch(`http://localhost:3000/user/${id}`, { status: newStatus });
      if (updateRes.status === 200) {
        if (newStatus === 'unblocked') {
          toast.success('User unblocked successfully!');
        } else {
          toast.warning('User blocked successfully!');
        }
        fetchdata();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update user status');
    }
  };

  return (
    <div className="bg-white">
      {/* Full-width Header */}
      <Aheader desc="Manage Users" />

      {/* Main Content Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">Administration</h6>
            <h1 className="mb-5">Manage Registered Users</h1>
          </div>

          {/* User Table Card */}
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-5">
            <div className="card-header bg-primary text-white py-3 px-4 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 text-white">
                <i className="fa fa-users me-2" /> All Users ({user.length})
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <MDBTable hover className="align-middle mb-0 bg-white">
                  <MDBTableHead className="bg-light">
                    <tr>
                      <th scope="col" className="ps-4 fw-bold text-dark">#ID</th>
                      <th scope="col" className="fw-bold text-dark">User</th>
                      <th scope="col" className="fw-bold text-dark">Email</th>
                      <th scope="col" className="fw-bold text-dark">Phone</th>
                      <th scope="col" className="fw-bold text-dark text-center">Status</th>
                      <th scope="col" className="text-center pe-4 fw-bold text-dark">Actions</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {user && user.length > 0 ? (
                      user.map((data) => {
                        const isBlocked = data.status === 'blocked' || data.status === 'block';
                        return (
                          <tr key={data.id}>
                            <th scope="row" className="ps-4 text-muted fw-normal">
                              #{data.id}
                            </th>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="fw-bold text-dark fs-6">{data.name || 'Anonymous User'}</span>
                              </div>
                            </td>
                            <td>
                              <span className="text-secondary">
                                <i className="fa fa-envelope text-primary me-2" />
                                {data.email || 'N/A'}
                              </span>
                            </td>
                            <td>
                              <span className="text-secondary">
                                <i className="fa fa-phone-alt text-success me-2" />
                                {data.phone || 'N/A'}
                              </span>
                            </td>
                            <td className="text-center">
                              <button
                                className={`btn btn-sm rounded-pill px-3 fw-bold ${
                                  isBlocked ? 'btn-outline-danger' : 'btn-outline-success'
                                }`}
                                onClick={() => handlestatus(data.id)}
                                title={isBlocked ? 'Click to unblock user' : 'Click to block user'}
                              >
                                <i className={`fa ${isBlocked ? 'fa-ban' : 'fa-check-circle'} me-1`} />
                                {isBlocked ? 'Blocked' : 'Unblocked'}
                              </button>
                            </td>
                            <td className="text-center pe-4">
                              <div className="btn-group" role="group">
                                <button
                                  className="btn btn-sm btn-outline-primary me-1 rounded-2"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modal"
                                  onClick={() => handleview(data.id)}
                                  title="View User Details"
                                >
                                  <i className="fa fa-eye me-1" /> View
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger rounded-2"
                                  onClick={() => handledel(data.id)}
                                  title="Delete User"
                                >
                                  <i className="fa fa-trash-alt me-1" /> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-5 text-muted">
                          <i className="fa fa-user-slash fa-3x mb-3 text-secondary d-block" />
                          <p className="mb-0">No users found.</p>
                        </td>
                      </tr>
                    )}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View User Modal */}
      <div className="modal fade" tabIndex={-1} role="dialog" id="modal" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 border-0 shadow">
            <div className="modal-header bg-primary text-white py-3 px-4">
              <h5 className="modal-title text-white" id="modalLabel">
                <i className="fa fa-id-badge me-2" /> User Details #{view.id}
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body p-4 text-center">
              {/* User Avatar */}
              <div
                className="rounded-circle bg-primary bg-opacity-10 text-primary d-inline-flex align-items-center justify-content-center shadow-sm mb-3 border border-4 border-primary"
                style={{ width: '100px', height: '100px' }}
              >
                <span className="fs-1 fw-bold">
                  {view.name ? view.name.charAt(0).toUpperCase() : <i className="fa fa-user" />}
                </span>
              </div>

              <h4 className="text-dark mb-1">{view.name || 'Anonymous User'}</h4>
              <p
                className={`badge px-3 py-1 rounded-pill mb-3 ${
                  view.status === 'blocked' || view.status === 'block'
                    ? 'bg-danger bg-opacity-10 text-danger border border-danger'
                    : 'bg-success bg-opacity-10 text-success border border-success'
                }`}
              >
                <i
                  className={`fa ${
                    view.status === 'blocked' || view.status === 'block' ? 'fa-ban' : 'fa-check-circle'
                  } me-1`}
                />
                {view.status === 'blocked' || view.status === 'block' ? 'Blocked' : 'Active / Unblocked'}
              </p>

              {/* User Detail Info Cards */}
              <div className="text-start bg-light p-3 rounded-3 mt-2">
                <div className="d-flex align-items-center mb-3 pb-2 border-bottom">
                  <div
                    className="bg-white rounded-circle p-2 shadow-sm me-3 text-primary d-flex align-items-center justify-content-center"
                    style={{ width: '38px', height: '38px' }}
                  >
                    <i className="fa fa-hashtag" />
                  </div>
                  <div>
                    <small className="text-muted d-block">User ID</small>
                    <strong className="text-dark">{view.id || 'N/A'}</strong>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-3 pb-2 border-bottom">
                  <div
                    className="bg-white rounded-circle p-2 shadow-sm me-3 text-primary d-flex align-items-center justify-content-center"
                    style={{ width: '38px', height: '38px' }}
                  >
                    <i className="fa fa-envelope" />
                  </div>
                  <div>
                    <small className="text-muted d-block">Email Address</small>
                    <strong className="text-dark">{view.email || 'N/A'}</strong>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-3 pb-2 border-bottom">
                  <div
                    className="bg-white rounded-circle p-2 shadow-sm me-3 text-success d-flex align-items-center justify-content-center"
                    style={{ width: '38px', height: '38px' }}
                  >
                    <i className="fa fa-phone" />
                  </div>
                  <div>
                    <small className="text-muted d-block">Phone Number</small>
                    <strong className="text-dark">{view.phone || 'N/A'}</strong>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <div
                    className="bg-white rounded-circle p-2 shadow-sm me-3 text-warning d-flex align-items-center justify-content-center"
                    style={{ width: '38px', height: '38px' }}
                  >
                    <i className="fa fa-shield-alt" />
                  </div>
                  <div>
                    <small className="text-muted d-block">Account Status</small>
                    <strong
                      className={
                        view.status === 'blocked' || view.status === 'block' ? 'text-danger' : 'text-success'
                      }
                    >
                      {view.status === 'blocked' || view.status === 'block' ? 'Blocked' : 'Unblocked'}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer bg-light py-2 px-4">
              <button type="button" className="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Footer */}
      <Afooter />
    </div>
  );
}

export default Usermanage;
