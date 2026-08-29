import React, { useState } from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Uregister() {
    const [data,setdata] = useState({
        id: "",
        name: "",
        email: "",
        phone:"",
        pass: "",
        status:""
    })
    const formchange = (e)=>{
        setdata({
            ...data,
            id:new Date().getTime().toString(),
            status:"unblocked",
            [e.target.name]:e.target.value
        })
        console.log(data);
    }
    const redirect = useNavigate()
    const handlesubmit =async(e)=>{
        e.preventDefault()
        if(data.email.trim() =="" || data.name.trim() =="" || data.pass.trim() =="" || data.phone.trim() ==""){
            toast.error("All Information Required...");
            return false;
            
        }
        const res = await axios.post("http://localhost:3000/user",data)
        console.log(res.data);
        setdata({
            id: "",
        name: "",
        email: "",
        phone:"",
        pass: "",
        status:""
        })
        redirect("/Ulogin")
    }
  return (
    <div>
      <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <form onSubmit={handlesubmit}>
          <MDBInput wrapperClass='mb-4' name='name' value={data.name} onChange={formchange} label='Your Name' size='lg' id='form1' type='text'/>
          <MDBInput wrapperClass='mb-4' name='email' value={data.email} onChange={formchange} label='Your Email' size='lg' id='form2' type='email'/>
          <MDBInput wrapperClass='mb-4' name='pass' value={data.pass} onChange={formchange} label='Password' size='lg' id='form3' type='password'/>
          <MDBInput wrapperClass='mb-4' name='phone' value={data.phone} onChange={formchange} label='Phone No.' size='lg' id='form3' type='tel'/>
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'>Register</MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </div>
  )
}

export default Uregister