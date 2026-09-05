import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Aheader from '../ACommon_Compo/Aheader';
import Afooter from '../ACommon_Compo/Afooter';
import API from '../../../api';
import { toast } from 'react-toastify';

function Manage_About() {
  const [data, setdata] = useState([]);
  const [view, setview] = useState({
    id: '',
    image: '',
    Name: '',
    desc: ''
  });
  const [update, setupdate] = useState(null);
  const [updated, setupdated] = useState({
    id: '',
    image: '',
    Name: '',
    desc: ''
  });

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const res = await API.get('/about');
      setdata(res.data);
    } catch (error) {
      console.error('Failed to fetch profiles:', error);
      toast.error('Failed to load profiles');
    }
  };

  const del = async (id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        await API.delete(`/about/${id}`);
        toast.success('Profile deleted successfully!');
        fetchdata();
      } catch (error) {
        console.error('Error deleting profile:', error);
        toast.error('Failed to delete profile');
      }
    }
  };

  const handleview = async (id) => {
    try {
      const res = await API.get(`/about/${id}`);
      setview(res.data);
    } catch (error) {
      console.error('Failed to fetch profile details:', error);
      toast.error('Failed to fetch profile details');
    }
  };

  const saveupdate = (about) => {
    setupdate(about);
    setupdated(about);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleupdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/about/${update.id}`, updated);
      toast.success('Profile updated successfully!');
      fetchdata();
      setupdate(null);
    } catch (error) {
      console.error('Not Updated:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="bg-white">
      {/* Full-width Header */}
      <Aheader desc="Manage About" />

      {/* Main Content Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">Administration</h6>
            <h1 className="mb-5">Manage About Profiles</h1>
          </div>

          {/* Table Card */}
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-5">
            <div className="card-header bg-primary text-white py-3 px-4 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 text-white">
                <i className="fa fa-users-cog me-2" /> All Team Profiles ({data.length})
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <MDBTable hover className="align-middle mb-0 bg-white">
                  <MDBTableHead className="bg-light">
                    <tr>
                      <th scope="col" className="ps-4 fw-bold text-dark">#ID</th>
                      <th scope="col" className="fw-bold text-dark">Photo</th>
                      <th scope="col" className="fw-bold text-dark">Name</th>
                      <th scope="col" className="fw-bold text-dark">Description</th>
                      <th scope="col" className="text-center pe-4 fw-bold text-dark">Actions</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {data && data.length > 0 ? (
                      data.map((item) => (
                        <tr key={item.id}>
                          <th scope="row" className="ps-4 text-muted fw-normal">
                            #{item.id}
                          </th>
                          <td>
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.Name || 'Team Member'}
                                className="rounded-circle shadow-sm"
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100';
                                }}
                              />
                            ) : (
                              <div
                                className="bg-light rounded-circle d-flex align-items-center justify-content-center text-muted border"
                                style={{ width: '50px', height: '50px' }}
                              >
                                <i className="fa fa-user" />
                              </div>
                            )}
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="fw-bold text-dark fs-6">{item.Name}</span>
                            </div>
                          </td>
                          <td style={{ maxWidth: '350px' }}>
                            <span className="text-secondary text-truncate d-inline-block" style={{ maxWidth: '320px' }}>
                              {item.desc || 'No description available'}
                            </span>
                          </td>
                          <td className="text-center pe-4">
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-sm btn-outline-primary me-1 rounded-2"
                                data-bs-toggle="modal"
                                data-bs-target="#modal"
                                onClick={() => handleview(item.id)}
                                title="View Profile Details"
                              >
                                <i className="fa fa-eye me-1" /> View
                              </button>
                              <button
                                className="btn btn-sm btn-outline-success me-1 rounded-2"
                                onClick={() => saveupdate(item)}
                                title="Edit Profile"
                              >
                                <i className="fa fa-edit me-1" /> Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger rounded-2"
                                onClick={() => del(item.id)}
                                title="Delete Profile"
                              >
                                <i className="fa fa-trash-alt me-1" /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-5 text-muted">
                          <i className="fa fa-users fa-3x mb-3 text-secondary d-block" />
                          <p className="mb-0">No profiles found. Add a profile to get started!</p>
                        </td>
                      </tr>
                    )}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </div>
          </div>

          {/* Edit Profile Section */}
          {update && (
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-5 wow fadeInUp" data-wow-delay="0.1s">
              <div className="card-header bg-dark text-white py-3 px-4 d-flex justify-content-between align-items-center">
                <h4 className="text-white mb-0">
                  <i className="fa fa-user-edit text-primary me-2" /> Edit Profile (#{update.id})
                </h4>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-light rounded-pill px-3"
                  onClick={() => setupdate(null)}
                >
                  <i className="fa fa-times me-1" /> Close
                </button>
              </div>
              <div className="card-body p-4 p-lg-5 bg-light">
                <form onSubmit={handleupdate}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating bg-white rounded-3">
                        <input
                          type="url"
                          className="form-control"
                          id="editImage"
                          name="image"
                          value={updated.image || ''}
                          onChange={(e) => setupdated({ ...updated, image: e.target.value })}
                          placeholder="Image URL"
                          required
                        />
                        <label htmlFor="editImage">Image URL</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating bg-white rounded-3">
                        <input
                          type="text"
                          className="form-control"
                          id="editName"
                          name="Name"
                          value={updated.Name || ''}
                          onChange={(e) => setupdated({ ...updated, Name: e.target.value })}
                          placeholder="Full Name"
                          required
                        />
                        <label htmlFor="editName">Full Name</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating bg-white rounded-3">
                        <textarea
                          className="form-control"
                          id="editDesc"
                          placeholder="Profile Description"
                          name="desc"
                          value={updated.desc || ''}
                          onChange={(e) => setupdated({ ...updated, desc: e.target.value })}
                          style={{ height: 120 }}
                          required
                        />
                        <label htmlFor="editDesc">Description / Bio</label>
                      </div>
                    </div>
                    <div className="col-12 mt-4">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <button className="btn btn-primary w-100 py-3 rounded-pill shadow-sm fw-bold" type="submit">
                            <i className="fa fa-save me-2" /> Save Changes
                          </button>
                        </div>
                        <div className="col-md-6">
                          <button
                            className="btn btn-outline-secondary w-100 py-3 rounded-pill fw-bold"
                            type="button"
                            onClick={() => setupdate(null)}
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
          )}
        </div>
      </div>

      {/* View Profile Modal */}
      <div className="modal fade" tabIndex={-1} role="dialog" id="modal" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 border-0 shadow">
            <div className="modal-header bg-primary text-white py-3 px-4">
              <h5 className="modal-title text-white" id="modalLabel">
                <i className="fa fa-id-card me-2" /> Team Member Details #{view.id}
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body p-4 text-center">
              {view.image ? (
                <img
                  src={view.image}
                  alt={view.Name}
                  className="rounded-circle shadow mb-3 border border-4 border-primary"
                  style={{ width: '110px', height: '110px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200';
                  }}
                />
              ) : (
                <div
                  className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center text-primary shadow-sm mb-3 border"
                  style={{ width: '110px', height: '110px' }}
                >
                  <i className="fa fa-user fa-3x" />
                </div>
              )}
              <h4 className="text-dark mb-1">{view.Name}</h4>
              <p className="badge bg-light text-primary border border-primary px-3 py-1 rounded-pill mb-3">
                Team Member #{view.id}
              </p>
              <div className="text-start bg-light p-3 rounded-3 mt-2">
                <h6 className="text-muted mb-2">About / Bio:</h6>
                <p className="text-secondary mb-0">{view.desc || 'No description provided.'}</p>
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

export default Manage_About;

