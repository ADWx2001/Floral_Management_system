import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-20">
            {/* left */}
            <div className="flex-1">
                <Link to ="/" className="text-5xl font-bold dark:text-white font-tangerine">
                    <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via purple-500 to-pink-500  text-white rounded-lg  size-10/12" >Flora</span>Shop
                </Link>
                <p className="text-sm mt-5 font-cinzel font-gray font-semibold">Join with us to get beautiful flowers to your door step and let us to decorate you from your favourite flowers</p>
            </div>
            {/* right */}
            <div className="flex-1">
                <p className="text-center text-2xl font-cinzel font-semibold ">Sign Up</p>
                <form className="flex flex-col gap-4 mt-5">
                    <div>
                        <Label value="Your username"/>
                        <TextInput type="text" placeholder="Username" id="username"/>
                    </div>
                    <div>
                        <Label value="Your email"/>
                        <TextInput type="text" placeholder="Emai" id="email"/>
                    </div>
                    <div>
                        <Label value="Your password"/>
                        <TextInput type="text" placeholder="Password" id="password"/>
                    </div>
                    <Button gradientDuoTone='purpleToPink' type="submit">Sign Up</Button>
                </form>
                <div className="flex gap-2 text-sm mt-5 ">
                    <span>Have an Account?</span>
                    <Link to='/sign-in' className="text-blue-500">Sign In</Link>
                </div>
            </div>
        </div>
    </div>
  )
}
