import { BrowserRouter , Route , Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Events from "./pages/Events"
import Products from "./pages/Products"
import Header from "./components/Header"
import Footer from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import Search from "./pages/Search"
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"
import AddProducts from "./pages/AddProducts"
import UpdateProducts from "./pages/UpdateProduct"
import DashBoard from "./pages/Dashboard"
import Addsuppliers from "./pages/AddSuppliers"
import Addstaff from "./pages/Addstaff"
import Addevents from "./pages/AddEvents"
import Updateevents from "./pages/updateevent"
import Updatesuppliers from "./pages/Updatesupplier"
import ForgetPassword from "./pages/ForgetPassword"
import ResetPassword from "./pages/ResetPassword"
import CreateDelivery from "./pages/CreateDelivery"
import UpdateDelivery from "./pages/UpdateDelivery"
import UpdateOrder from "./pages/UpdateOrder"



export default function App() {
  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route element={<PrivateRoute/>}>
           <Route path="/dashboard" element={<DashBoard/>}/> 
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
           <Route path="/add-product" element={<AddProducts/>}/>
           <Route path="/update-product/:productId" element={<UpdateProducts/>}/> 
           <Route path="/add-suppliers" element={<Addsuppliers/>}/>
           <Route path="/add-staff" element={<Addstaff/>}/>
           <Route path="/create-event" element={<Addevents/>}/>
           <Route path="/Update-event/:id" element={<Updateevents/>}/>
           <Route path="/updatesup/:id" element={<Updatesuppliers/>}/> 

           <Route path="/create-delivery-record/:orderId" element={<CreateDelivery/>}/>
           <Route path="/update-delivery/:deliveryId" element={<UpdateDelivery/>}/>
           <Route path="/update-order/:orderId" element={<UpdateOrder/>}/>

        </Route>
        <Route path="/events" element={<Events/>}/>

        <Route path="/events" element={<Events/>}/>

        <Route path="/products" element={<Products/>}/>

        <Route path="/forgetPassword" element={<ForgetPassword/>}/>
        <Route path="/resetpassword/:id/:token" element={<ResetPassword/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>

    </>
  )
}
