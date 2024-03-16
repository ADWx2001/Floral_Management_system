import { BrowserRouter , Route , Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import DashBoard from "./pages/Dashboard"
import Events from "./pages/Events"
import Header from "./components/Header"
import Footer from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import Search from "./pages/Search"
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"
import AddProducts from "./pages/AddProducts"
import UpdateProducts from "./pages/UpdateProduct"
import Addsuppliers from "./pages/addsuppliers"
import Suppliers from "./components/suppliers"
import Updatesuppliers from "./pages/updatesupplier"
import Addevents from "./pages/AddEvents"
import Updateevents from "./pages/updateevent"
import Addstaff from "./pages/Addstaff"
import Updatestaff from "./pages/updatestaff"

export default function App() {
  return (
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
           <Route path="/add-suppliers" element={<Addsuppliers/>}/>
           <Route path="/add-staff" element={<Addstaff/>}/>
           <Route path="/create-event" element={<Addevents/>}/>
           <Route path="/Update-event/:id" element={<Updateevents/>}/>
           <Route path="/Update-staff/:id" element={<Updatestaff/>}/>

          
           <Route path="/update-product/:productId" element={<UpdateProducts/>}/> 
           <Route path="/updatesup/:id" element={<Updatesuppliers/>}/> 
          
        </Route>
       
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}
