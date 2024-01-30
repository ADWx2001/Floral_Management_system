import { BrowserRouter , Route , Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import DashBoard from "./pages/DashBoard"
import Events from "./pages/Events"
import Header from "./components/Header"
import Footer from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import Search from "./pages/Search"

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
        <Route path="/events" element={<Events/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}
