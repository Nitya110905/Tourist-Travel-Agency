import React, { useState } from 'react'
import Aheader from '../ACommon_Compo/Aheader'
import Afooter from '../ACommon_Compo/Afooter'
import axios from 'axios'

function Add_package() {
    const[packages,setpackages]=useState({
        id: "",
        url: "",
        country: "",
        days: "",
        person: "",
        price: "",
        desc: ""
    })
    const handlechange=(e)=>{
        setpackages({
            ...packages,
            id:new Date().getTime().toString(),
            [e.target.name]:e.target.value
        })
        console.log(packages);
    }
    const handlesubmit=async(e)=>{
        e.preventDefault()

        const res = await axios.post(`http://localhost:3000/packages`,packages);
        console.log(res.data);
        setpackages({  
        url: "",
        country: "",
        days: "",
        person: "",
        price: "",
        desc: ""
        })
    }
    
  return (
    <div>
      <Aheader desc="Add Packages"/>
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="booking p-5">
                        <div className="row g-5 align-items-center">
                            <div className="col-md-6 text-white">
                            </div>
                            <div className="col-md-12">
                                <h1 className="text-white mb-4">Add Package</h1>
                                <form onSubmit={handlesubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="url" className="form-control bg-transparent" name='url' value={packages.url} onChange={handlechange} placeholder="Your Name" />
                                                <label htmlFor="Image">Image</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating date">
                                                <input type="tel" className="form-control bg-transparent" name='price' value={packages.price} onChange={handlechange} placeholder="Price" />
                                                <label htmlFor="Price">Price</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <select className="form-select bg-transparent" name='country' value={packages.country} onChange={handlechange}>
                                                    <option value="India">India</option>
                                                    <option value="Argentina">Argentina</option>
                                                    <option value="Portugal">Portugal</option>
                                                </select>
                                                <label htmlFor="select1">Destination</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <select className="form-select bg-transparent" name='days' value={packages.days} onChange={handlechange}>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                                <label htmlFor="days">Days</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <select className="form-select bg-transparent" name='person' value={packages.person} onChange={handlechange}>
                                                    <option value="3">3</option>
                                                    <option value="5">5</option>
                                                    <option value="8">8</option>
                                                </select>
                                                <label htmlFor="members">person</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control bg-transparent" placeholder="package desc" name='desc' value={packages.desc} onChange={handlechange} style={{ height: 100 }} defaultValue={""} />
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

export default Add_package
