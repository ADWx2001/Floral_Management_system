import React from 'react'
import { useDispatch,useSelector } from "react-redux";
import { clearCart } from "../redux/cart/cartSlice";

export default function CheckoutSuccess() {
  const dispatch = useDispatch();

  dispatch(clearCart());
  
  return (
    <div>CheckoutSuccess</div>
  )
}
