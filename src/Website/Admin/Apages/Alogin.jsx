import React, { useEffect, useState } from 'react'
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
  }from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Alogin() {
    const[formvalue,setformvalue]=useState({
        email:"",
        pass:""
    })
    const redirect = useNavigate()
    const handlesubmit = async(e)=>{
        e.preventDefault()
      
        const{email,pass} = formvalue;
        if(!email.trim() || !pass.trim()){
          toast.error("Email and Password are required");
            return false;
        }
        try {
            const res = await axios.get(`http://localhost:3000/admin?email=${email}`)
            console.log(res.data);
            if(res.data.length===0){
                toast.error("Email does not match!");
                return false;   
            }
            const admin = res.data[0]
            if(admin.pass !== pass){
              toast.error("Password does not match!");
                return false;
            }
            localStorage.setItem('adminid',admin.id)
            localStorage.setItem('adminname',admin.name)
            toast.success('Login Succesfully');
            redirect("/Dashboard")
            
            
            
        } catch (error) {
            console.log("Error",error);
            
        }

    }
    useEffect(()=>{
      if(localStorage.getItem("adminid")){
          redirect("/Dashboard")
      }
  },[])


  return (
    <div>
      <MDBContainer fluid className="p-3 my-5">
<form onSubmit={handlesubmit}>
  
<MDBRow>

<MDBCol col='10' md='6'>
  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
</MDBCol>

<MDBCol col='4' md='6'>


  <MDBInput wrapperClass='mb-4' name='email' value={formvalue.email} onChange={(e)=>{setformvalue({...formvalue,email:e.target.value})}} label='Email address' id='formControlLg' type='email' size="lg"/>
  <MDBInput wrapperClass='mb-4' label='Password' name='pass' value={formvalue.pass} onChange={(e)=>{setformvalue({...formvalue,pass:e.target.value})}} id='formControlLg' type='password' size="lg"/>


  <div className="d-flex justify-content-between mx-4 mb-4">
    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
    <a href="!#">Forgot password?</a>
  </div>

  <MDBBtn className="mb-4 w-100" size="lg">Sign in</MDBBtn>


</MDBCol>

</MDBRow>
</form>

</MDBContainer>
    </div>
  )
}

export default Alogin
