import { Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, TextInput } from "flowbite-react";
import { Link , useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon , FaSun} from 'react-icons/fa';
import { useSelector , useDispatch } from 'react-redux';
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOut } from "../redux/user/userSlice";


export default function Header() {
    const {currentUser} = useSelector((state) => state.user);  
    const {theme} = useSelector((state) => state.theme); 

    const dispatch = useDispatch()
    const path = useLocation().pathname;
    const handleSignOut = async ()=>{
        try {
          await fetch('api/user/signout');
          dispatch(signOut());
          
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <Navbar className="border-b-2 font-extrabold "  >
        <Link to ="/" className="self-center whitespace-nowrap text-3xl 3xl:text-xl font-semibold dark:text-white font-tangerine">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via purple-500 to-pink-500  text-white rounded-lg  size-10/12" >Flora</span>Shop
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
            <AiOutlineSearch/>
        </Button>
        <div className="flex gap-2 md:order-2 font-cinzel">
            <Button className="w-12 h-10 hidden sm:inline" color="gray" pill onClick={()=>dispatch(toggleTheme())}>
                {theme === 'light' ? <FaSun/>: <FaMoon/>}
               
            </Button>
            {currentUser ? (
                <Dropdown 
                arrowIcon={false} 
                inline
                label={
                    <Avatar
                        alt="user"
                        img ={currentUser.profilePicture} 
                        rounded
                    />

                }
                > 
                    <DropdownHeader>
                        <span className="block text-sm">{currentUser.username}</span>
                        <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                    </DropdownHeader>
                    <Link to={'/dashboard?tab=profile'}>
                        <DropdownItem>Profile</DropdownItem>

                    </Link>
                    <DropdownDivider/>
                    <DropdownItem onClick={handleSignOut}>Sign Out</DropdownItem>
                </Dropdown>
            ):(
                     <Link to='/sign-in'>
                     <Button gradientDuoTone='purpleToBlue'outline  >
                        Sign In
                     </Button>
                    </Link>
            )}

           
            <Navbar.Toggle/>
     </div>

        <Navbar.Collapse  className="font-extrabold font-serif  text-neutral-950 dark:text-neutral-200" >
                <Navbar.Link active={path==='/'} as={'div'}>
                    <Link to="/">Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path==='/about'} as={'div'}>
                    <Link to="/about">About</Link>
                </Navbar.Link>
                <Navbar.Link active={path==='/events'} as={'div'}>
                    <Link to="/events">Events</Link>
                </Navbar.Link>
            </Navbar.Collapse>

    </Navbar>
    
  )
}
