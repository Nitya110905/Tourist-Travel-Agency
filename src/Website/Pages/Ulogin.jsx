import React, { useEffect, useState } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Ulogin() {
  const [formvalue,setformvalue] = useState({
    email: "",
    pass: ""
  })
  const redirect = useNavigate()
  const handlesubmit = async (e) => {
    e.preventDefault()
    //destructure array
    const { email, pass } = formvalue;
    //if email or password are null
    if (!email.trim() || !pass.trim()) {
      toast.error("Email and password are required*");
      return false;
    }
    try {
      const res = await axios.get(`http://localhost:3000/user?email=${email}`)
      console.log(res.data);
      //Email Match
      const user = res.data[0]
      if(user.status === "blocked"){
        toast.error("You are blocked");
        return false;
      }
      if (user.email === 0) {
        toast.error("Email does not match");
        return false;
      }
      //password match
      if (user.pass !== pass) {
        toast.error("Password does not match");
        return false;
      } 
      //session
      localStorage.setItem('userid', user.id)
      localStorage.setItem('username', user.name)
      toast.success('Login Succesfully');
      setformvalue({ email: "", pass: "" });
      redirect("/")
    } 
    catch (error) {
      console.log("Error: ", error);
    }
  }
  useEffect(()=>{
    if(localStorage.getItem("userid")){
        redirect("/")
    }
},[])
  return (
    <div>
      <MDBContainer className='my-5'>
        <MDBCard>
          <form onSubmit={handlesubmit}>

            <MDBRow className='g-0 d-flex align-items-center'>

              <MDBCol md='4'>
                <MDBCardImage src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
              </MDBCol>

              <MDBCol md='8'>

                <MDBCardBody>

                  <MDBInput wrapperClass='mb-4' name='email' value={formvalue.email} onChange={(e) => { setformvalue({ ...formvalue, email: e.target.value }) }} label='Email address' id='form1' type='email' />
                  <MDBInput wrapperClass='mb-4' name='pass' value={formvalue.pass} onChange={(e) => { setformvalue({ ...formvalue, pass: e.target.value }) }} label='Password' id='form2' type='password' />

                  <div className="d-flex justify-content-between mx-4 mb-4">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                    <a href="!#">Forgot password?</a>
                  </div>

                  <MDBBtn className="mb-4 w-100">Login</MDBBtn>
                  <Link to="/Uregister"><MDBBtn className="mb-4 w-100">Register</MDBBtn></Link>

                </MDBCardBody>

              </MDBCol>

            </MDBRow>
          </form>

        </MDBCard>
      </MDBContainer>
    </div>
  )
}

export default Ulogin
