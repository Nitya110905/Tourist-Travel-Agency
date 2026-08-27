import React, { useState } from 'react'
import Aheader from '../ACommon_Compo/Aheader'
import Afooter from '../ACommon_Compo/Afooter'
import axios from 'axios'

function Add_profile() {
  const[profile,setprofile] = useState({
    id:"",
    image:"",
    Name:"",
    desc:""
  })
  const handlechange = (e) =>{
    setprofile({
      ...profile,
      //id
      id: new Date().getTime().toString(),
      [e.target.name]: e.target.value
    })
  }
  // take data to api
  const handlesubmit = async(e)=>{
    e.preventDefault()
    const res = await axios.post(`http://localhost:3000/about`,profile)
    setprofile({
      id:"",
    image:"",
    Name:"",
    desc:""
    })
  }
  
  return (
    <div>
      <Aheader desc="Add Profile"/>
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="booking p-5">
                        <div className="row g-5 align-items-center">
                            <div className="col-md-6 text-white">
                            </div>
                            <div className="col-md-12">
                                <h1 className="text-white mb-4">Add Profile</h1>
                                <form onSubmit={handlesubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="url" className="form-control bg-transparent" name='image' value={profile.image} onChange={handlechange} placeholder="Image" />
                                                <label htmlFor="Image">Image</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating date">
                                                <input type="text" className="form-control bg-transparent" name='Name' value={profile.Name} onChange={handlechange} placeholder="Name" />
                                                <label htmlFor="Price">Name</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control bg-transparent" placeholder="profile desc" name='desc' value={profile.desc} onChange={handlechange} style={{ height: 100 }} defaultValue={""} />
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

export default Add_profile
