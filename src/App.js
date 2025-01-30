import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Carousel_Mou from "./pages/carousel_mou/Carousel_Mou.jsx";
import Carousel_Beach from "./pages/carousel_beach/Carousel_beach.jsx";
import Carousel_Rel from "./pages/carousel_rel/Carousel_Rel.jsx";
import BookingPage from "./pages/booking_page/Booking_Page.jsx";
import PaymentPage from "./pages/razor_payment/RazorPayment.jsx";
import ThankYouPage from "./pages/thankyou/ThankYou.jsx";
import Flight from "./pages/Flight/Flight.jsx";
import Hotels from "./pages/hotel/Hotel.jsx";
import Train from "./pages/train/Train.jsx";



function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/homedest_mou" element={<Carousel_Mou/>}/>
        <Route path="/homedest_beach" element={<Carousel_Beach/>}/>
        <Route path="/homedest_rel" element={<Carousel_Rel/>}/>
        <Route path="/flights" element={<Flight/>}/>
        <Route path="/hotels" element={<Hotels/>}/>
        <Route path="/trains" element={<Train/>}/>
        <Route path="/booking_page" element={<BookingPage/>}/>
        <Route path="/pay" element={<PaymentPage/>}/>
        <Route path="/thanks"  element={<ThankYouPage/>}/>
        {/* <Route path="/gth"  element={<Gth/>}/>
        <Route path="/gth2" element={<Gth2/>}></Route> */}


      </Routes>
    </BrowserRouter>
  ) 
  
}
export default App;