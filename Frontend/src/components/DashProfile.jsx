import { Button, TextInput } from "flowbite-react";
import {useSelector } from "react-redux" ;

export default function DashProfile() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className="mx-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="self-center h-32 w-32 cursor-pointer shadow-md overflow-hidden rounded-full">
          <img src={currentUser?.profilePicture} alt="User" className="rounded-full object-cover w-full h-full border-8 border-[Lightgray]" />
         
         </div>
         <div className="flex flex-col mx-w-lg mx-auto w-full max-w-md gap-4">
          <TextInput type='text' id="username" placeholder="username" defaultValue={currentUser.username}/>
          <TextInput type='email' id="email" placeholder="email" defaultValue={currentUser.email}/>
          <TextInput type='password' id="password" placeholder="Password" />
          <Button type="submit" gradientDuoTone='purpleToBlue' outline>Update Account</Button>
        </div>
         
      </form>
      <div className="text-red-500 flex mx-w-lg mx-auto w-full max-w-md mt-5 justify-between">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}
