import { BrowserRouter , Route , Routes} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import DashBoard from "./pages/DashBoard"
import Events from "./pages/Events"
import Header from "./components/Header"
import Footer from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Products from "./pages/Products"
import Checkout from "./pages/Checkout"
import Search from "./pages/Search"
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"
import AddProducts from "./pages/AddProducts"


export default function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route element={<PrivateRoute/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/> 
        <Route element={<OnlyAdminPrivateRoute/>}>
           <Route path="/add-product" element={<AddProducts/>}/> 
        </Route>
        <Route path="/events" element={<Events/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/not-found" element={<NotFound/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}
