import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Aheader from '../ACommon_Compo/Aheader';
import Afooter from '../ACommon_Compo/Afooter';
import axios from 'axios';
import { toast } from 'react-toastify';

function Serviceman() {
  const [data, setdata] = useState([]);
  const [view, setview] = useState({
    id: '',
    icon: '',
    title: '',
    desc: ''
  });
  const [update, setupdate] = useState(null);
  const [updated, setupdated] = useState({
    id: '',
    icon: '',
    title: '',
    desc: ''
  });

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const res = await axios.get('http://localhost:3000/services');
      setdata(res.data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      toast.error('Failed to load services');
    }
  };

  const del = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`http://localhost:3000/services/${id}`);
        toast.success('Service deleted successfully!');
        fetchdata();
      } catch (error) {
        console.error('Error deleting service:', error);
        toast.error('Failed to delete service');
      }
    }
  };

  const handleview = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/services/${id}`);
      setview(res.data);
    } catch (error) {
      console.error('Failed to fetch service details:', error);
      toast.error('Failed to fetch service details');
    }
  };

  const saveupdate = (service) => {
    setupdate(service);
    setupdated(service);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleupdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/services/${update.id}`, updated);
      toast.success('Service updated successfully!');
      fetchdata();
      setupdate(null);
    } catch (error) {
      console.error('Not Updated:', error);
      toast.error('Failed to update service');
    }
  };

  return (
    <div className="bg-white">
      {/* Full-width Header */}
      <Aheader desc="Manage Services" />

      {/* Main Content Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">Administration</h6>
            <h1 className="mb-5">Manage Services</h1>
          </div>

          {/* Table Card */}
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-5">
            <div className="card-header bg-primary text-white py-3 px-4 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 text-white">
                <i className="fa fa-cogs me-2" /> All Services ({data.length})
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <MDBTable hover className="align-middle mb-0 bg-white">
                  <MDBTableHead className="bg-light">
                    <tr>
                      <th scope="col" className="ps-4 fw-bold text-dark">#ID</th>
                      <th scope="col" className="fw-bold text-dark">Icon / Image</th>
                      <th scope="col" className="fw-bold text-dark">Title</th>
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
                            {item.icon && (item.icon.startsWith('http') || item.icon.startsWith('/') || item.icon.startsWith('data:')) ? (
                              <img
                                src={item.icon}
                                alt={item.title || 'Service'}
                                className="rounded-3 shadow-sm border"
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100';
                                }}
                              />
                            ) : item.icon && item.icon.startsWith('fa') ? (
                              <div
                                className="bg-light rounded-3 d-flex align-items-center justify-content-center text-primary border"
                                style={{ width: '50px', height: '50px' }}
                              >
                                <i className={`fa ${item.icon} fs-4`} />
                              </div>
                            ) : (
                              <div
                                className="bg-light rounded-3 d-flex align-items-center justify-content-center text-primary border"
                                style={{ width: '50px', height: '50px' }}
                              >
                                <i className="fa fa-concierge-bell fs-4" />
                              </div>
                            )}
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="fw-bold text-dark fs-6">{item.title || 'Untitled Service'}</span>
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
                                title="View Service Details"
                              >
                                <i className="fa fa-eye me-1" /> View
                              </button>
                              <button
                                className="btn btn-sm btn-outline-success me-1 rounded-2"
                                onClick={() => saveupdate(item)}
                                title="Edit Service"
                              >
                                <i className="fa fa-edit me-1" /> Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger rounded-2"
                                onClick={() => del(item.id)}
                                title="Delete Service"
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
                          <i className="fa fa-cogs fa-3x mb-3 text-secondary d-block" />
                          <p className="mb-0">No services found. Add a service to get started!</p>
                        </td>
                      </tr>
                    )}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </div>
          </div>

          {/* Edit Service Section */}
          {update && (
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-5 wow fadeInUp" data-wow-delay="0.1s">
              <div className="card-header bg-dark text-white py-3 px-4 d-flex justify-content-between align-items-center">
                <h4 className="text-white mb-0">
                  <i className="fa fa-edit text-primary me-2" /> Edit Service (#{update.id})
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
                          id="editIcon"
                          name="icon"
                          value={updated.icon || ''}
                          onChange={(e) => setupdated({ ...updated, icon: e.target.value })}
                          placeholder="Icon / Image URL"
                          required
                        />
                        <label htmlFor="editIcon">Icon / Image URL</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating bg-white rounded-3">
                        <input
                          type="text"
                          className="form-control"
                          id="editTitle"
                          name="title"
                          value={updated.title || ''}
                          onChange={(e) => setupdated({ ...updated, title: e.target.value })}
                          placeholder="Service Title"
                          required
                        />
                        <label htmlFor="editTitle">Service Title</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating bg-white rounded-3">
                        <textarea
                          className="form-control"
                          id="editDesc"
                          placeholder="Service Description"
                          name="desc"
                          value={updated.desc || ''}
                          onChange={(e) => setupdated({ ...updated, desc: e.target.value })}
                          style={{ height: 120 }}
                          required
                        />
                        <label htmlFor="editDesc">Description</label>
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

      {/* View Service Modal */}
      <div className="modal fade" tabIndex={-1} role="dialog" id="modal" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 border-0 shadow">
            <div className="modal-header bg-primary text-white py-3 px-4">
              <h5 className="modal-title text-white" id="modalLabel">
                <i className="fa fa-concierge-bell me-2" /> Service Details #{view.id}
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body p-4 text-center">
              {view.icon && (view.icon.startsWith('http') || view.icon.startsWith('/') || view.icon.startsWith('data:')) ? (
                <img
                  src={view.icon}
                  alt={view.title}
                  className="rounded-4 shadow mb-3 border border-4 border-primary"
                  style={{ width: '110px', height: '110px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200';
                  }}
                />
              ) : (
                <div
                  className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center text-primary shadow-sm mb-3 border"
                  style={{ width: '110px', height: '110px' }}
                >
                  <i className={`fa ${view.icon && view.icon.startsWith('fa') ? view.icon : 'fa-concierge-bell'} fa-3x`} />
                </div>
              )}
              <h4 className="text-dark mb-1">{view.title || 'Untitled Service'}</h4>
              <p className="badge bg-light text-primary border border-primary px-3 py-1 rounded-pill mb-3">
                Service #{view.id}
              </p>
              <div className="text-start bg-light p-3 rounded-3 mt-2">
                <h6 className="text-muted mb-2">Description:</h6>
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

export default Serviceman;
