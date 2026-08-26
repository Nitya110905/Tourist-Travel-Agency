import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Aheader from '../ACommon_Compo/Aheader';
import Afooter from '../ACommon_Compo/Afooter';
import axios from 'axios';

function Package_manage() {
  const [data, setdata] = useState([])
  useEffect(() => {
    fetchdata()
  }, [])

  const fetchdata = async () => {
    const res = await axios.get("http://localhost:3000/packages")
    console.log(res.data)
    setdata(res.data)
  }
  const[modal,setmodal] = useState({
    id: "",
    url: "",
    country: "",
    days: "",
    person: "",
    price: "",
    desc: ""
  })
  const handleview = async (id)=>{
    const res = await axios.get(`http://localhost:3000/packages/${id}`)
    console.log(res.data)
    setmodal(res.data)
  }
  const del = async (id) => {
    const res = await axios.delete(`http://localhost:3000/packages/${id}`)
    console.log(res.data);
    fetchdata()
  }
  const [edit,setedit] = useState(null)
  const[edited,setedited] = useState({
    id: "",
    url: "",
    country: "",
    days: "",
    person: "",
    price: "",
    desc: ""
  })
  const saveedit = (packages)=>{
    setedit(packages);
    setedited(packages);
  }
  const handleupdate = async(e)=>{
    e.preventDefault()
    try {
      
      const res = await axios.put(`http://localhost:3000/packages/${edit.id}`,edited)
      console.log(res.data);
      fetchdata()
      setedit(null)
      console.log("Updated");
    } catch (error) {
      console.log("Not Updated",error);
      
    }    
  }
  return (
    <div>
      <div className="container">
        <Aheader desc="Manage packages!" />
        <h1>Manage Packages</h1>
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th scope='col'>#id</th>
              <th scope='col'>Country</th>
              <th scope='col'>Days</th>
              <th scope='col'>Person</th>
              <th scope='col'>Price</th>
              <th scope='col' className='text-center'>Action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              data && data.map((item) => {
                return (
                  <tr key={item.id}>
                    <th scope='row'>{item.id}</th>
                    <td>{item.country}</td>
                    <td>{item.days}</td>
                    <td>{item.person}</td>
                    <td>{item.price}$</td>
                    <td><button className='btn btn-primary mx-2' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>handleview(item.id)}>view</button>
                      <button className='btn btn-success mx-2' onClick={()=> saveedit(item)}>edit</button>
                      <button className='btn btn-danger mx-2' onClick={() => del(item.id)}>delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </MDBTableBody>
        </MDBTable>
      </div>
      {
          edit && (
            <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="container">
                <div className="booking p-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-md-6 text-white">
                        </div>
                        <div className="col-md-12">
                            <h1 className="text-white mb-4">Edit Package</h1>
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input type="url" className="form-control bg-transparent" name='url' value={edited.url} onChange={(e)=>setedited({...edited,url:e.target.value})} placeholder="Your Name" />
                                            <label htmlFor="Image">Image</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating date">
                                            <input type="tel" className="form-control bg-transparent" name='price' value={edited.price} onChange={(e)=>setedited({...edited,price:e.target.value})} placeholder="Price" />
                                            <label htmlFor="Price">Price</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <select className="form-select bg-transparent" name='country' value={edited.country} onChange={(e)=>setedited({...edited,country:e.target.value})}>
                                                <option value="India">India</option>
                                                <option value="Argentina">Argentina</option>
                                                <option value="Portugal">Portugal</option>
                                            </select>
                                            <label htmlFor="select1">Destination</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <select className="form-select bg-transparent" name='days' value={edited.days} onChange={(e)=>setedited({...edited,days:e.target.value})}>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                            <label htmlFor="days">Days</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <select className="form-select bg-transparent" name='person' value={edited.person} onChange={(e)=>setedited({...edited,person:e.target.value})}>
                                                <option value="3">3</option>
                                                <option value="5">5</option>
                                                <option value="8">8</option>
                                            </select>
                                            <label htmlFor="members">person</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea className="form-control bg-transparent" placeholder="package desc" value={edited.desc} name='desc' onChange={(e)=>setedited({...edited,desc:e.target.value})} style={{ height: 100 }} defaultValue={""} />
                                            <label htmlFor="Description">Description</label>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                    <div className="row"><div className='col-6'>
                                        <button className="btn btn-outline-light w-100 py-3" type="submit" onClick={handleupdate}>Save</button></div>
                                        <div className='col-6'> <button className="btn btn-outline-light w-100 py-3" type="submit" onClick={()=>setedit(null)}>Cancel</button></div>
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
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Package Details</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <table className='table'>
              <tr>
              <th scope='col'>#id</th>
              <th scope='col'>Country</th>
              <th scope='col'>Days</th>
              <th scope='col'>Person</th>
              <th scope='col'>Price</th>
            </tr>
            <tr key={modal.id}>
                    <th scope='row'>{modal.id}</th>
                    <td>{modal.country}</td>
                    <td>{modal.days}</td>
                    <td>{modal.person}</td>
                    <td>{modal.price}$</td>
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

export default Package_manage
