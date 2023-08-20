import React from 'react';
import { BrowserRouter,Routes,Route } from "react-router-dom";

// user
import Login from "./components/user/login/login";
import Registation from "./components/user/register/register";
import HomeNavbar from "./components/user/navbar-home/navbar";
import Home from "./components/user/home/home";
import Footer from "./components/user/footer/footer";
import Booking from "./components/user/Booking/booking";
import FoodOrderMain from "./components/user/foodOrder-main/foodordermain";
import Order from "./components/user/order/order";
import Schedule from "./components/user/schedule/schedule";
import Complaint from "./components/user/complaint/complaint";
import Location from "./components/user/location/location";
import ResetPassword from "./components/user/resetPassword/resetPassword";
import SetPassword from "./components/user/setPassword/setPassword";
import Error from "./components/user/404Error/404Error";

//admin
import CanteenAdmin from "./components/admin/canteen/canteen";
import BookingAdmin from "./components/admin/booking/booking";
import ComplaintAdmin from "./components/admin/complaint/complaint";
import RegistrationAdmin from "./components/admin/registration/registration";
import FeedbackAdmin from "./components/admin/feedback/feedback";
import ScheduleAdmin from "./components/admin/schedule/schedule";
import LocationAdmin from "./components/admin/location/location";
import HomeAdmin from "./components/admin/homeAdmin/home";
import FoodAdmin from "./components/admin/foodOrder/foodOrder";
import NavbarAdmin from "./components/admin/navbarAdmin/navbar";
import FooterAdmin from "./components/admin/footerAdmin/footerAdmin";
import LoginAdmin from "./components/admin/loginAdmin/loginAdmin";
import Notification from "./components/admin/notification/notification";


function App() {
  return (
   <div>
        <BrowserRouter>
            <Routes>

              {/* user */}
              <Route path="/" element= { <Login/>} />
              <Route path="/register" element= { <Registation/>} />
              <Route path="/login" element= { <Login/>} />
              <Route path="/home" element= { <Home/>} />
              <Route path="/navbarhome" element= { <HomeNavbar/>} />
              <Route path="/footer" element= { <Footer/>} />
              <Route path="/booking" element= { <Booking/>} />
              <Route path="/foodordermain" element= { <FoodOrderMain/>} />
              <Route path="/order" element= { <Order/>} />
              <Route path="/schedule" element= { <Schedule/>} />
              <Route path="/complaint" element= { <Complaint/>} />
              <Route path="/location" element= { <Location/>} />
              <Route path="/resetPassword" element= { <ResetPassword/>} />
              <Route path="/setPassword" element= { <SetPassword/>} />
              <Route path="/error" element= { <Error/>} />


              {/* admin */}
              <Route path="/canteenAdmin" element= { <CanteenAdmin/>} />
              <Route path="/bookingAdmin" element= { <BookingAdmin/>} />
              <Route path="/complaintAdmin" element= { <ComplaintAdmin/>} />
              <Route path="/regiAdmin" element= { <RegistrationAdmin/>} />
              <Route path="/feedbackAdmin" element= { <FeedbackAdmin/>} />
              <Route path="/scheduleAdmin" element= { <ScheduleAdmin/>} />
              <Route path="/locationAdmin" element= { <LocationAdmin/>} />
              <Route path="/homeAdmin" element= { <HomeAdmin/>} />
              <Route path="/foodAdmin" element= { <FoodAdmin/>} />
              <Route path="/navbarAdmin" element= { <NavbarAdmin/>} />
              <Route path="/footerAdmin" element= { <FooterAdmin/>} />
              <Route path="/loginAdmin" element= { <LoginAdmin/>} />
              <Route path="/notification" element= { <Notification/>} />

            </Routes>
        </BrowserRouter>
   </div>
  );
}

export default App;