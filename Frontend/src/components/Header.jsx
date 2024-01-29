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
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2 font-extrabold ">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-3xl 3xl:text-xl font-semibold dark:text-white font-tangerine"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via purple-500 to-pink-500  text-white rounded-lg  size-10/12">
          Flora
        </span>
        Shop
      </Link>
      <form className="font-cinzel">
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-10 md:order-2 font-cinzel mx-28">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>

        <Link to="/sign-in">
          <Button gradientDuoTone="purpleToBlue" outline>
            Sign In
          </Button>
        </Link>

        <Link to="/cart">
          <div className="flex relative">
            <box-icon name="cart" size="lg"></box-icon>
            {cart.cartItems?.map((cartItem) => (
              <span
                key={cartItem._id}
                className="rounded-xl absolute top-0 right-0 px-1 bg-yellow-300 text-black text-sm"
              >
                {cartItem.cartTotalQuantity}
              </span>
            ))}
          </div>
        </Link>
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse className="font-extrabold font-serif  text-neutral-950 dark:text-neutral-200">
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/" className="text-xl">
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about" className="text-xl">
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/events"} as={"div"}>
          <Link to="/events" className="text-xl">
            Events
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
