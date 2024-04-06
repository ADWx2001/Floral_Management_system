import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../components/DashSideBar";
import DashProfile from "../components/DashProfile";
import DashProduct from "../components/DashProduct";
import DashUsers from "../components/DashUsers";
import Suppliers from "../components/suppliers";
import Events from "./Events";
import Staffmembers from "../components/Staffmembers";
import Supplierperfromance from "../components/supplierperofrmance";

export default function DashBoard() {
  const location = useLocation();
  const[tab,setTab]= useState();

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search]);
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSideBar/>
      </div>
      {tab==='profile' && <DashProfile/>}
      {tab === 'products' && <DashProduct/>}
      {tab === 'users' && <DashUsers/>}
      {tab === 'suppliers' && <Suppliers/>}
      {tab === 'events' && <Events/>}
      {tab === 'staff' && <Staffmembers/>}
      {tab === 'sperforamnce' && <Supplierperfromance/>}
    </div>
  )
}
