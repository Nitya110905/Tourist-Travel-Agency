import React from 'react';
import Home from './Website/Pages/Home';
import About from './Website/Pages/About';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Service from './Website/Pages/Service';
import Package from './Website/Pages/Package';
import Testimonial from './Website/Pages/Testimonial';
import Error from './Website/Pages/Error';
import Destination from './Website/Pages/Destination';
import Booking from './Website/Pages/Booking';
import Contact from './Website/Pages/Contact';
import Dashboard from './Website/Admin/Apages/Dashboard';
import Package_manage from './Website/Admin/Apages/Package_manage';
import Add_package from './Website/Admin/Apages/Add_package';
import Service_add from './Website/Admin/Apages/Service_add';
import Serviceman from './Website/Admin/Apages/Serviceman';
import Add_profile from './Website/Admin/Apages/Add_profile';
import Manage_About from './Website/Admin/Apages/Manage_About';
import Alogin from './Website/Admin/Apages/Alogin';
import Ulogin from './Website/Pages/Ulogin';
import Uregister from './Website/Pages/Uregister';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Usermanage from './Website/Admin/Apages/Usermanage';
import Editprofile from './Website/Pages/Editprofile';

function App() {
  return (
    <div className="App">
      {/* <h1>hello tourist</h1> */}
      {/* <Home/> */}
      {/* <About/> */}
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/services' element={<Service />}></Route>
          <Route path='/package' element={<Package />}></Route>
          <Route path='/Testimonial' element={<Testimonial />}></Route>
          <Route path='/404' element={<Error />}></Route>
          <Route path='/Destination' element={<Destination />}></Route>
          <Route path='/Booking' element={<Booking />}></Route>
          <Route path='/Contact' element={<Contact />}></Route>
          <Route path='*' element={<Error />}></Route>
          <Route path='/Ulogin' element={<Ulogin />}></Route>
          <Route path='/Uregister' element={<Uregister />}></Route>
          <Route path='/useredit' element={<Editprofile />}></Route>
          {/* hide route */}
          <Route path='/Dashboard' element={<Dashboard />}></Route>
          <Route path='/Packman' element={<Package_manage />}></Route>
          <Route path='/addpack' element={<Add_package />}></Route>
          <Route path='/addservice' element={<Service_add />}></Route>
          <Route path='/serviceman' element={<Serviceman />}></Route>
          <Route path='/addabout' element={<Add_profile />}></Route>
          <Route path='/aboutman' element={<Manage_About />}></Route>
          <Route path='/alogin' element={<Alogin />}></Route>
          <Route path='/usermanage' element={<Usermanage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
