import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Afooter from '../ACommon_Compo/Afooter';
import Aheader from '../ACommon_Compo/Aheader';
import axios from 'axios';

function Serviceman() {
    const[data,setdata] = useState([])
    useEffect(()=>{
        fetchdata()
    },[])
    const fetchdata = async()=>{
        const res = await axios.get(`http://localhost:3000/services`);
        setdata(res.data)
    }
    const del = async(id)=>{
      const res = await axios.delete(`http://localhost:3000/services/${id}`)
      fetchdata()
    }
    const [view,setview] = useState({
      id: "",
      icon: "",
      title: "",
      desc: ""
    })
    const handleview = async(id)=>{
      const res = await axios.get(`http://localhost:3000/services/${id}`)
      console.log(res.data);
      setview(res.data)
    }
    const [update,setupdate] = useState(null)
    const [updated,setupdated] = useState({
      id: "",
      icon: "",
      title: "",
      desc: ""
    })
  const  saveupdate = (services)=>{
    setupdate(services);
    setupdated(services)
  }
  const handleupdate = async(e)=>{
    e.preventDefault()
    try {
      const res = await axios.put(`http://localhost:3000/services/${update.id}`,updated)
      console.log(res.data);
      fetchdata()
      setupdate(null)
      console.log("Updated");

    } catch (error) {
      console.log("Not Updated",error);
      
    }
  }
  return (
    <div>
      <div className="container">
            <Aheader desc="Manage services!"/>
      <h1>Manage Services</h1>
      <MDBTable>
      <MDBTableHead>
        <tr>
          <th scope='col'>#id</th>
          {/* <th scope='col'>Icon</th> */}
          <th scope='col'>Title</th>
          <th scope='col'>Desc</th>
          <th scope='col' className='text-center'>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
       {
        data && data.map((item)=>{
            return(
            <tr key={item.id}>
            <th scope='row'>{item.id}</th>
            <td>{item.title}</td>
            <td>{item.desc}</td>
            <td><button className='btn btn-primary mx-2' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>handleview(item.id)}>view</button>
            <button className='btn btn-success mx-2' onClick={()=>saveupdate(item)}>edit</button>
            <button className='btn btn-danger mx-2' onClick={()=>del(item.id)}>delete</button>
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
                                <h1 className="text-white mb-4">Update Service</h1>
                                <form>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="url" className="form-control bg-transparent" name='icon' value={updated.icon} onChange={(e)=>setupdated({...updated,icon:e.target.value})}  placeholder="Your Name" />
                                                <label htmlFor="Image">Image</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating date">
                                                <input type="tel" className="form-control bg-transparent" name='title' value={updated.title} onChange={(e)=>setupdated({...updated,title:e.target.value})} placeholder="Price" />
                                                <label htmlFor="Price">Title</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control bg-transparent" placeholder="package desc" name='desc' value={updated.desc} onChange={(e)=>setupdated({...updated,desc:e.target.value})} style={{ height: 100 }} defaultValue={""} />
                                                <label htmlFor="Description">Description</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                          <div className='row'><div className='col-6'>
                                          <button className="btn btn-outline-light w-100 py-3" type="submit" onClick={handleupdate}>Update</button>
                                          </div>
                                          <div className='col-6'>
                                          <button className="btn btn-outline-light w-100 py-3" type="submit" onClick={()=>setupdate(null)}>Cancel</button>
                                          </div></div>
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
    <div className="modal" id="exampleModal" tabIndex={-1} >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Service Details</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body">
        <table className='table'>
          <thead>
          <tr>
            <th scope='col'>#id</th>
            <th scope='col'>Title</th>
            <th scope='col'>Desc</th>
            </tr>
          </thead>
            <tr key={view.id}>
              <th scope='row'>{view.id}</th>
              <td >{view.title}</td>
              <td >{view.desc}</td>
            </tr>
        </table>
      </div>
      <div className="modal-footer">
      </div>
    </div>
  </div>
</div>

    <Afooter/>
    </div>
  )
}

export default Serviceman
