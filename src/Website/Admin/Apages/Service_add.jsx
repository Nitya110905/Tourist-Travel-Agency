import React, { useState } from 'react'
import Aheader from '../ACommon_Compo/Aheader'
import Afooter from '../ACommon_Compo/Afooter'
import axios from 'axios'

function Service_add() {
    const[service,setservice] = useState({
        id:"",
        icon:"",
        title:"",
        desc:""
    })
    const handlechange=(e)=>{
        setservice({
            ...service,
            id: new Date().getTime().toString(),
            [e.target.name]:e.target.value
        })
        console.log(service);
    }
    const handlesubmit=async(e)=>{
        e.preventDefault()
        const res = await axios.post(`http://localhost:3000/services`,service);
        console.log(res.data);
        setservice({
            icon:"",
            title:"",
            desc:""
        })
    }
  return (
    <div>
      <Aheader desc="Add Service"/>
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="booking p-5">
                        <div className="row g-5 align-items-center">
                            <div className="col-md-6 text-white">
                            </div>
                            <div className="col-md-12">
                                <h1 className="text-white mb-4">Add Service</h1>
                                <form onSubmit={handlesubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="url" className="form-control bg-transparent" name='icon' value={service.icon} onChange={handlechange}  placeholder="Your Name" />
                                                <label htmlFor="Image">Image</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating date">
                                                <input type="tel" className="form-control bg-transparent" name='title' value={service.title} onChange={handlechange} placeholder="Price" />
                                                <label htmlFor="Price">Title</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control bg-transparent" placeholder="package desc" name='desc' value={service.desc} onChange={handlechange} style={{ height: 100 }} defaultValue={""} />
                                                <label htmlFor="Description">Description</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-outline-light w-100 py-3" type="submit">ADD</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      <Afooter/>
    </div>
  )
}

export default Service_add
