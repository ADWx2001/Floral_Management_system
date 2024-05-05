import { BrowserRouter , Route , Routes} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Event from "./pages/Event";
import Products from "./pages/Products"
import Header from "./components/Header"
import Footer from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import Cart from "./pages/Cart";
import Ordersummary from "./pages/Ordersummary"
import NotFound from "./pages/NotFound";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./pages/Checkout"
import Search from "./pages/Search"
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"
import AddProducts from "./pages/AddProducts"
import UpdateProducts from "./pages/UpdateProduct"
import UpdateOrder from "./pages/UpdateOrder";
import RequestItems from "./pages/RequestItems"
import UpdateRequest from "./pages/UpdateRequest"
import CreateDelivery from "./pages/CreateDelivery"
import UpdateDelivery from "./pages/UpdateDelivery"
import DashBoard from "./pages/Dashboard"
import PostProduct from "./pages/PostProduct"
import ScrollToTop from "./components/ScrollToTop"
import UpdateReviews from "./pages/UpdateReviews"
import ReplyReview from "./pages/ReplyReview"
import Addstaff from "./pages/Addstaff"
import Addevents from "./pages/AddEvents"
import Updateevents from "./pages/updateevent"
import Updatesuppliers from "./pages/Updatesupplier"
import ForgetPassword from "./pages/ForgetPassword"
import ResetPassword from "./pages/ResetPassword"
import Addrestockrec from "./pages/addStockrecords"
import ContactSup from "./pages/ContactSupplier"
import CheckoutSuccess from "./pages/CheckoutSuccess"
import PostEvent from "./pages/PostEvent"
import Addsuppliers from "./pages/addsuppliers"
import BookEvent from "./pages/BookEvent"
import EventReqSuccess from "./pages/EventReqSuccess"
import UpdateEventBooking from "./pages/UpdateEventBooking"


export default function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      <ScrollToTop/>
      <>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/sign-in" element={<SignIn/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/event-home" element={<Event/>}/>
            <Route element={<PrivateRoute/>}/>
            <Route path="/dashboard" element={<DashBoard/>}/> 
            <Route element={<OnlyAdminPrivateRoute/>}>
            <Route path="/add-product" element={<AddProducts/>}/>
            <Route path="/update-product/:productId" element={<UpdateProducts/>}/>
            <Route path="/update-order/:orderId" element={<UpdateOrder/>}></Route>
            <Route path="/req-items-seller" element={<RequestItems/>}></Route>  
            <Route path="/update-request/:requestId" element={<UpdateRequest/>}></Route>
            <Route path="/create-delivery-record/:orderId" element={<CreateDelivery/>}></Route>
            <Route path="/update-delivery/:deliveryId" element={<UpdateDelivery/>}></Route>
            <Route path="/reply-review/:reviewId" element={<ReplyReview/>}/> </Route>
            <Route path="/product/:productSlug" element={<PostProduct/>}/>
            <Route path="/event/:eventSlug" element={<PostEvent/>}/> 
            <Route path="/update-review/:reviewId" element={<UpdateReviews/>}/>  
            <Route path="/add-staff" element={<Addstaff/>}/>
            <Route path="/add-srecords" element={<Addrestockrec/>}/>
            <Route path="/create-event" element={<Addevents/>}/>
            <Route path="/Update-event/:id" element={<Updateevents/>}/>
            <Route path="/updatesup/:id" element={<Updatesuppliers/>}/> 
            <Route path="/create-delivery-record/:orderId" element={<CreateDelivery/>}/>
            <Route path="/update-delivery/:deliveryId" element={<UpdateDelivery/>}/>
            <Route path="/update-order/:orderId" element={<UpdateOrder/>}/>
            <Route path="/forgetPassword" element={<ForgetPassword/>}/>
            <Route path="/resetpassword/:id/:token" element={<ResetPassword/>} />
            <Route path = "/products" element={<Products/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/not-found" element={<NotFound/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/ordersummary" element= {<Ordersummary/>} />
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/order-pay-success" element={<CheckoutSuccess/>}/>
            <Route path="/contactsup/:id" element={<ContactSup/>}/>
            <Route path="/add-suppliers" element={<Addsuppliers/>}/>
            <Route path="/event-book/:eventSlug" element={<BookEvent/>}/>
            <Route path="/event-request-success" element={<EventReqSuccess/>}/>
            <Route path="/update-event-record/:recordId" element={<UpdateEventBooking/>}/>
          </Routes>
        <Footer/>
      </>
    </BrowserRouter>
  )
}