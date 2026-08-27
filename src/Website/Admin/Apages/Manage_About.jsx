import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Aheader from '../ACommon_Compo/Aheader'
import axios from 'axios'
import Afooter from '../ACommon_Compo/Afooter';

function Manage_About() {
  const [data, setdata] = useState([])
  useEffect(() => {
    fetchdata()
  }, [])
  const fetchdata = async () => {
    const res = await axios.get("http://localhost:3000/about")
    setdata(res.data)
  }
  const del = async (id) => {
    const res = await axios.delete(`http://localhost:3000/about/${id}`)
    fetchdata()
  }
  const [view, setview] = useState({
    id: "",
    Name: "",
    desc: ""

  })
  const handleview = async (id) => {
    const res = await axios.get(`http://localhost:3000/about/${id}`)
    setview(res.data)
  }
  const [update, setupdate] = useState(null)
  const [updated, setupdated] = useState({
    id: "",
    image: "",
    Name: "",
    desc: ""
  })
  const saveupdate = (about) => {
    setupdate(about);
    setupdated(about)
  }
  const handleupdate = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`http://localhost:3000/about/${update.id}`, updated)
      console.log(res.data)
      fetchdata()
      setupdate(null)
      console.log("Updated")
    } catch (error) {
      console.log("Not Updated", error);

    }
  }
  return (
    <div>
      <div className="container">
        <Aheader desc="Manage About!" />
        <h1>Manage Packages</h1>
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th scope='col'>#id</th>
              <th scope='col'>Name</th>
              <th scope='col'>Desc</th>
              <th scope='col' className='text-center'>Action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              data && data.map((item) => {
                return (
                  <tr key={item.id}>
                    <th scope='row'>{item.id}</th>
                    <td>{item.Name}</td>
                    <td>{item.desc}</td>
                    <td><button className='btn btn-primary mx-2' data-bs-toggle="modal" data-bs-target="#modal" onClick={() => handleview(item.id)}>view</button>
                      <button className='btn btn-success mx-2' onClick={()=>saveupdate(item)}>edit</button>
                      <button className='btn btn-danger mx-2' onClick={() => del(item.id)}>delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </MDBTableBody>
        </MDBTable>
        {
          update &&(
            <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="container">
                <div className="booking p-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-md-6 text-white">
                        </div>
                        <div className="col-md-12">
                            <h1 className="text-white mb-4">Add Profile</h1>
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="url" className="form-control bg-transparent" name='image' value={updated.image} onChange={(e)=>{setupdated({...updated,image:e.target.value})}} placeholder="Image" />
                                            <label htmlFor="Image">Image</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating date">
                                            <input type="text" className="form-control bg-transparent" name='Name' value={updated.Name} onChange={(e)=>{setupdated({...updated,Name:e.target.value})}} placeholder="Name" />
                                            <label htmlFor="Price">Name</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea className="form-control bg-transparent" placeholder="profile desc" name='desc' value={updated.desc} onChange={(e)=>{setupdated({...updated,desc:e.target.value})}} style={{ height: 100 }} defaultValue={""} />
                                            <label htmlFor="Description">Description</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                      <div className='row'>
                                        <div className='col-6'><button className="btn btn-outline-light w-100 py-3" type="submit" onClick={handleupdate}>Update</button></div>
                                        <div className='col-6'><button className="btn btn-outline-light w-100 py-3" type="submit" onClick={()=>setupdate(null)}>Cancel</button></div>
                                      </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
          )
        }

      </div>
      <div className="modal" tabIndex={-1} role="dialog" id='modal'>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Team Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <table className='table'>
                <thead>
                  <th scope='col'>#id</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Desc</th>
                </thead>
                <tr key={view.id}>
                  <td>{view.id}</td>
                  <td>{view.Name}</td>
                  <td>{view.desc}</td>
                </tr>
              </table>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>

      <Afooter />
    </div>
  )
}

export default Manage_About
