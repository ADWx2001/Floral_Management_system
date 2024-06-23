// import {
//   Avatar,
//   Button,
//   Dropdown,
//   DropdownDivider,
//   DropdownHeader,
//   DropdownItem,
//   Navbar,
//   TextInput,
// } from "flowbite-react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AiOutlineSearch } from "react-icons/ai";
// import { useSelector, useDispatch } from "react-redux";
// import { signOut } from "../redux/user/userSlice";
// import { useEffect, useState } from "react";
// import { getCartTotal } from "../redux/cart/cartSlice";
// import './nav.css';

// export default function Header() {
//   const path = useLocation().pathname;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { currentUser } = useSelector((state) => state.user);
//   const { theme } = useSelector((state) => state.theme);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { cartTotalQuantity } = useSelector((state) => state.cart);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get("searchTerm");
//     if (searchTermFromUrl) {
//       setSearchTerm(searchTermFromUrl);
//     }
//     // Dispatch getCartTotal action to update cart total
//     dispatch(getCartTotal());
//   }, [dispatch, location.search]);

//   const handleSignOut = async () => {
//     try {
//       await fetch("/api/user/signout");
//       dispatch(signOut());
//       navigate("/");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams(location.search);
//     urlParams.set("searchTerm", searchTerm);
//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   };

//   return (
//     <Navbar
//       className="border-b-2 font-extrabold py-4 flex flex-col"
//       style={{ backgroundColor: "#151515" }}
//     >
//       <div className="flex items-center justify-between w-full">
//         <Link to="/" className="self-center flex-shrink-0">
//           <img
//             src={"/logo/black_logo.png"}
//             alt="FloraShop Logo"
//             className="w-20 h-auto md:w-36 lg:w-48"
//           />
//         </Link>

//         <div>
//           <Navbar.Collapse className="font-cinzel text-white text-lg lg:text-xl">
//             <Navbar.Link
//               active={path === "/"}
//               as={"div"}
//               className="font-semibold text-white active:text-rose-300 custom-navbar-link"
//             >
//               <Link to="/">Home</Link>
//             </Navbar.Link>

//             <Navbar.Link
//               active={path === "/about"}
//               as={"div"}
//               className="font-semibold text-white custom-navbar-link"
//             >
//               <Link to="/about">About</Link>
//             </Navbar.Link>

//             <Navbar.Link
//               active={path === "/events"}
//               as={"div"}
//               className="font-semibold text-white custom-navbar-link"
//             >
//               <Link to="/event-home">Events</Link>
//             </Navbar.Link>

//             <Navbar.Link
//               active={path === "/products"}
//               as={"div"}
//               className="font-semibold text-white custom-navbar-link"
//             >
//               <Link to="/products">Products</Link>
//             </Navbar.Link>
//           </Navbar.Collapse>
//           <form onSubmit={handleSubmit} className="w-full mt-2 lg:w-auto">
//             <TextInput
//               type="text"
//               placeholder=""
//               rightIcon={AiOutlineSearch}
//               className="w-full lg:w-auto"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </form>
//         </div>

//         <div className="flex items-center gap-4 md:order-2 font-cinzel">
//           {currentUser && (
//             <Link to="/cart">
//               <div className="flex relative">
//                 <box-icon
//                   type="solid"
//                   name="shopping-bag"
//                   color="#E437A1"
//                   size="md"
//                 ></box-icon>
//                 <span className="rounded-xl absolute  left-8 bottom-6 px-2 bg-yellow-400 text-xs text-white font-extrabold">
//                   {cartTotalQuantity}
//                 </span>
//               </div>
//             </Link>
//           )}
//           {currentUser ? (
//             <Dropdown
//               arrowIcon={false}
//               inline
//               label={
//                 <box-icon
//                   type="solid"
//                   name="user"
//                   color="#E437A1"
//                   size="md"
//                 ></box-icon>
//               }
//             >
//               <DropdownHeader>
//                 <span className="block text-sm">{currentUser.username}</span>
//                 <span className="block text-sm font-medium truncate">
//                   {currentUser.email}
//                 </span>
//               </DropdownHeader>
//               <Link to={"/dashboard?tab=profile"}>
//                 <DropdownItem>Profile</DropdownItem>
//               </Link>
//               <DropdownDivider />
//               <DropdownItem onClick={handleSignOut}>Sign Out</DropdownItem>
//             </Dropdown>
//           ) : (
//             <Link to="/sign-in">
//               <Button gradientDuoTone="purpleToBlue" outline>
//                 Sign In
//               </Button>
//             </Link>
//           )}
//           <Navbar.Toggle />
//         </div>
//       </div>
//     </Navbar>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  TextInput,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { getCartTotal } from "../redux/cart/cartSlice";
import './nav.css';

export default function Header() {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
    // Dispatch getCartTotal action to update cart total
    dispatch(getCartTotal());
  }, [dispatch, location.search]);

  const handleSignOut = async () => {
    try {
      await fetch("/api/user/signout");
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar
      className="border-b-2 font-extrabold py-4 flex flex-col"
      style={{ backgroundColor: "#151515" }}
    >
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="self-center flex-shrink-0">
          <img
            src={"/logo/black_logo.png"}
            alt="FloraShop Logo"
            className="w-20 h-auto md:w-36 lg:w-48"
          />
        </Link>

        <div>
          <Navbar.Collapse className="font-cinzel text-white text-lg lg:text-xl">
            <Navbar.Link
              active={path === "/"}
              as={"div"}
              className={`font-semibold text-white hover:text-primary custom-navbar-link ${
                path === "/" ? "active" : ""
              }`}
            >
              <Link to="/">Home</Link>
            </Navbar.Link>

            <Navbar.Link
              active={path === "/about"}
              as={"div"}
              className={`font-semibold text-white hover:text-primary custom-navbar-link ${
                path === "/about" ? "active" : ""
              }`}
            >
              <Link to="/about">About</Link>
            </Navbar.Link>

            <Navbar.Link
              active={path === "/events"}
              as={"div"}
              className={`font-semibold text-white hover:text-primary custom-navbar-link ${
                path === "/events" ? "active" : ""
              }`}
            >
              <Link to="/event-home">Events</Link>
            </Navbar.Link>

            <Navbar.Link
              active={path === "/products"}
              as={"div"}
              className={`font-semibold text-white hover:text-primary custom-navbar-link ${
                path === "/products" ? "active" : ""
              }`}
            >
              <Link to="/products">Products</Link>
            </Navbar.Link>
          </Navbar.Collapse>
          <form onSubmit={handleSubmit} className="w-full mt-2 lg:w-auto">
            <TextInput
              type="text"
              placeholder=""
              rightIcon={AiOutlineSearch}
              className="w-full lg:w-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          
        </div>

        <div className="flex items-center gap-4 md:order-2 font-cinzel">
          {currentUser && (
            <Link to="/cart">
              <div className="flex relative">
                <box-icon
                  type="solid"
                  name="shopping-bag"
                  color="#E437A1"
                  size="md"
                ></box-icon>
                <span className="rounded-xl absolute  left-8 bottom-6 px-2 bg-yellow-400 text-xs text-white font-extrabold">
                  {cartTotalQuantity}
                </span>
              </div>
            </Link>
          )}
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <box-icon
                  type="solid"
                  name="user"
                  color="#E437A1"
                  size="md"
                ></box-icon>
              }
            >
              <DropdownHeader>
                <span className="block text-sm">{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.email}
                </span>
              </DropdownHeader>
              <Link to={"/dashboard?tab=profile"}>
                <DropdownItem>Profile</DropdownItem>
              </Link>
              <DropdownDivider />
              <DropdownItem onClick={handleSignOut}>Sign Out</DropdownItem>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <Button gradientDuoTone="purpleToBlue" outline>
                Sign In
              </Button>
            </Link>
          )}
          <Navbar.Toggle />
        </div>
      </div>
    </Navbar>
  );
}
