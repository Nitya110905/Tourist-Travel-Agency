import React, { useEffect, useState } from 'react'
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
import { toast } from 'react-toastify';
import { redirect, useNavigate } from 'react-router-dom';

function Editprofile() {
    const redirect = useNavigate()
    const [update,setupdate] = useState({
        name:"",
        email:"",
        pass:"",
        phone:""
    })
    const fetchdata = async()=>{
        try {
            const res = await axios.get(`http://localhost:3000/user/${localStorage.getItem(`userid`)}`);
            console.log(res.data);
            setupdate(res.data)
        } catch (error) {
            console.log("Error in fetching user data",error);
            
        }
    }
    useEffect(()=>{
        fetchdata()
    },[])
    const handlesubmit = async(e)=>{
        e.preventDefault();
        if(
            update.name.trim() === "" ||
            update.email.trim() === "" ||
            update.pass.trim() === "" ||
            update.phone.trim() === "" 
        ){
            toast.error("All fields are necessary!")
        }
        try {
            const res = await axios.patch(`http://localhost:3000/user/${update.id}`,update)
            if(update.status === 200){
                setupdate({
                    name:"",
                    email:"",
                    pass:"",
                    phone:""
                })
            }
            toast.success("User Updated Successfully!");
            redirect("/")
        } catch (error) {
            console.log("Error Updating User",error);
            toast.error("Error Updating User");
        }
    }
  return (
    <div>
                <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
                <div className='mask gradient-custom-3'></div>
                <MDBCard className='m-5' style={{maxWidth: '600px'}}>
                  <MDBCardBody className='px-5'>
                    <h2 className="text-uppercase text-center mb-5">Edit Profile!</h2>
                    <form onSubmit={handlesubmit}>
                    <MDBInput wrapperClass='mb-4' name='name' value={update.name} onChange={(e)=>{setupdate({...update,name:e.target.value})}}  label='Your Name' size='lg' id='form1' type='text'/>
                    <MDBInput wrapperClass='mb-4' name='email' value={update.email} onChange={(e)=>{setupdate({...update,email:e.target.value})}} label='Your Email' size='lg' id='form2' type='email'/>
                    <MDBInput wrapperClass='mb-4' name='pass' value={update.pass} onChange={(e)=>{setupdate({...update,pass:e.target.value})}} label='Password' size='lg' id='form3' type='password'/>
                    <MDBInput wrapperClass='mb-4' name='phone' value={update.phone} onChange={(e)=>{setupdate({...update,phone:e.target.value})}} label='Phone No.' size='lg' id='form3' type='tel'/>
                    <div className='d-flex flex-row justify-content-center mb-4'>
                      <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
                    </div>
                    <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'>Update</MDBBtn>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </MDBContainer>

    </div>
  )
}

export default Editprofile
