import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Aheader from '../ACommon_Compo/Aheader';
import Afooter from '../ACommon_Compo/Afooter';
import axios from 'axios';
import { toast } from 'react-toastify';

function Package_manage() {
  const [data, setdata] = useState([]);
  const [modal, setmodal] = useState({
    id: '',
    url: '',
    country: '',
    days: '',
    person: '',
    price: '',
    desc: ''
  });
  const [edit, setedit] = useState(null);
  const [edited, setedited] = useState({
    id: '',
    url: '',
    country: '',
    days: '',
    person: '',
    price: '',
    desc: ''
  });

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const res = await axios.get('http://localhost:3000/packages');
      setdata(res.data);
    } catch (error) {
      console.error('Failed to fetch packages:', error);
      toast.error('Failed to load packages');
    }
  };

  const handleview = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/packages/${id}`);
      setmodal(res.data);
    } catch (error) {
      console.error('Failed to fetch package details:', error);
      toast.error('Failed to fetch package details');
    }
  };

  const del = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await axios.delete(`http://localhost:3000/packages/${id}`);
        toast.success('Package deleted successfully!');
        fetchdata();
      } catch (error) {
        console.error('Error deleting package:', error);
        toast.error('Failed to delete package');
      }
    }
  };

  const saveedit = (pkg) => {
    setedit(pkg);
    setedited(pkg);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleupdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/packages/${edit.id}`, edited);
      toast.success('Package updated successfully!');
      fetchdata();
      setedit(null);
    } catch (error) {
      console.error('Not Updated:', error);
      toast.error('Failed to update package');
    }
  };

  return (
    <div className="bg-white">
      {/* Full-width Header */}
      <Aheader desc="Manage Packages" />

      {/* Main Content Section */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title bg-white text-center text-primary px-3">Administration</h6>
            <h1 className="mb-5">Manage Tour Packages</h1>
          </div>

          {/* Table Card */}
          <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-5">
            <div className="card-header bg-primary text-white py-3 px-4 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 text-white">
                <i className="fa fa-map-marked-alt me-2" /> All Available Packages ({data.length})
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <MDBTable hover className="align-middle mb-0 bg-white">
                  <MDBTableHead className="bg-light">
                    <tr>
                      <th scope="col" className="ps-4 fw-bold text-dark">#ID</th>
                      <th scope="col" className="fw-bold text-dark">Image</th>
                      <th scope="col" className="fw-bold text-dark">Destination</th>
                      <th scope="col" className="fw-bold text-dark">Duration</th>
                      <th scope="col" className="fw-bold text-dark">Persons</th>
                      <th scope="col" className="fw-bold text-dark">Price</th>
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
                            {item.url ? (
                              <img
                                src={item.url}
                                alt={item.country || 'Package'}
                                className="rounded-3 shadow-sm"
                                style={{ width: '60px', height: '45px', objectFit: 'cover' }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100';
                                }}
                              />
                            ) : (
                              <div className="bg-light rounded-3 d-flex align-items-center justify-content-center text-muted" style={{ width: '60px', height: '45px' }}>
                                <i className="fa fa-image" />
                              </div>
                            )}
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <i className="fa fa-map-marker-alt text-primary me-2" />
                              <span className="fw-bold text-dark">{item.country}</span>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-light text-primary border border-primary px-3 py-2 rounded-pill">
                              <i className="fa fa-calendar-alt me-1" /> {item.days} Days
                            </span>
                          </td>
                          <td>
                            <span className="badge bg-light text-secondary border px-3 py-2 rounded-pill">
                              <i className="fa fa-user me-1" /> {item.person} Person{item.person > 1 ? 's' : ''}
                            </span>
                          </td>
                          <td>
                            <span className="fs-6 fw-bold text-primary">${item.price}</span>
                          </td>
                          <td className="text-center pe-4">
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-sm btn-outline-primary me-1 rounded-2"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => handleview(item.id)}
                                title="View Package Details"
                              >
                                <i className="fa fa-eye me-1" /> View
                              </button>
                              <button
                                className="btn btn-sm btn-outline-success me-1 rounded-2"
                                onClick={() => saveedit(item)}
                                title="Edit Package"
                              >
                                <i className="fa fa-edit me-1" /> Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger rounded-2"
                                onClick={() => del(item.id)}
                                title="Delete Package"
                              >
                                <i className="fa fa-trash-alt me-1" /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-5 text-muted">
                          <i className="fa fa-box-open fa-3x mb-3 text-secondary d-block" />
                          <p className="mb-0">No tour packages found. Add a package to get started!</p>
                        </td>
                      </tr>
                    )}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </div>
          </div>

          {/* Edit Package Section */}
          {edit && (
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-5 wow fadeInUp" data-wow-delay="0.1s">
              <div className="card-header bg-dark text-white py-3 px-4 d-flex justify-content-between align-items-center">
                <h4 className="text-white mb-0">
                  <i className="fa fa-edit text-primary me-2" /> Edit Package (#{edit.id})
                </h4>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-light rounded-pill px-3"
                  onClick={() => setedit(null)}
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
                          id="editUrl"
                          name="url"
                          value={edited.url || ''}
                          onChange={(e) => setedited({ ...edited, url: e.target.value })}
                          placeholder="Image URL"
                          required
                        />
                        <label htmlFor="editUrl">Image URL</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating bg-white rounded-3">
                        <input
                          type="number"
                          className="form-control"
                          id="editPrice"
                          name="price"
                          value={edited.price || ''}
                          onChange={(e) => setedited({ ...edited, price: e.target.value })}
                          placeholder="Price ($)"
                          required
                        />
                        <label htmlFor="editPrice">Price ($)</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating bg-white rounded-3">
                        <select
                          className="form-select"
                          id="editCountry"
                          name="country"
                          value={edited.country || 'India'}
                          onChange={(e) => setedited({ ...edited, country: e.target.value })}
                        >
                          <option value="India">India</option>
                          <option value="Argentina">Argentina</option>
                          <option value="Portugal">Portugal</option>
                          <option value="Maldives">Maldives</option>
                          <option value="Thailand">Thailand</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="USA">USA</option>
                          <option value="Japan">Japan</option>
                        </select>
                        <label htmlFor="editCountry">Destination</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating bg-white rounded-3">
                        <select
                          className="form-select"
                          id="editDays"
                          name="days"
                          value={edited.days || '3'}
                          onChange={(e) => setedited({ ...edited, days: e.target.value })}
                        >
                          <option value="2">2 Days</option>
                          <option value="3">3 Days</option>
                          <option value="4">4 Days</option>
                          <option value="5">5 Days</option>
                          <option value="7">7 Days</option>
                          <option value="10">10 Days</option>
                        </select>
                        <label htmlFor="editDays">Duration</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating bg-white rounded-3">
                        <select
                          className="form-select"
                          id="editPerson"
                          name="person"
                          value={edited.person || '2'}
                          onChange={(e) => setedited({ ...edited, person: e.target.value })}
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 Persons</option>
                          <option value="3">3 Persons</option>
                          <option value="4">4 Persons</option>
                          <option value="5">5 Persons</option>
                          <option value="8">8 Persons</option>
                        </select>
                        <label htmlFor="editPerson">Persons</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating bg-white rounded-3">
                        <textarea
                          className="form-control"
                          id="editDesc"
                          placeholder="Package Description"
                          value={edited.desc || ''}
                          name="desc"
                          onChange={(e) => setedited({ ...edited, desc: e.target.value })}
                          style={{ height: 120 }}
                          required
                        />
                        <label htmlFor="editDesc">Package Description</label>
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
                            onClick={() => setedit(null)}
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

      {/* View Package Modal */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4 border-0 shadow">
            <div className="modal-header bg-primary text-white py-3 px-4">
              <h5 className="modal-title text-white" id="exampleModalLabel">
                <i className="fa fa-info-circle me-2" /> Package Details #{modal.id}
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body p-4">
              <div className="row g-4 align-items-center">
                {modal.url && (
                  <div className="col-md-5">
                    <img
                      src={modal.url}
                      alt={modal.country}
                      className="img-fluid rounded-4 shadow-sm w-100"
                      style={{ maxHeight: '250px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400';
                      }}
                    />
                  </div>
                )}
                <div className={modal.url ? 'col-md-7' : 'col-md-12'}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="text-primary mb-0">{modal.country}</h3>
                    <span className="badge bg-success fs-5 px-3 py-2 rounded-pill">${modal.price}</span>
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <div className="p-3 bg-light rounded-3">
                        <small className="text-muted d-block">Duration</small>
                        <span className="fw-bold text-dark">
                          <i className="fa fa-calendar-alt text-primary me-2" />
                          {modal.days} Days
                        </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-3 bg-light rounded-3">
                        <small className="text-muted d-block">Capacity</small>
                        <span className="fw-bold text-dark">
                          <i className="fa fa-users text-primary me-2" />
                          {modal.person} Persons
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-muted mb-2">Description</h6>
                    <p className="text-secondary mb-0 bg-light p-3 rounded-3">{modal.desc || 'No description provided.'}</p>
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

export default Package_manage;

