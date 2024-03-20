import React, { useEffect, useState } from 'react';
import moment from 'moment'

export default function Reviews({review}) {
    const [user,setUser] = useState({});
    console.log(user);
    useEffect(() =>{
        const getUser = async() => {
            try{
                const res = await fetch(`/api/user/${review.userId}`);
                const data = await res.json();
                if(res.ok){
                    setUser(data);
                }
            }
            catch(error){
                console.log(error.message);
            }
        }
        getUser();
    },[review])
  return (
    <div className='text-sm flex p-4 border-b dark border-gray-400'>
        <div className='flex-shrink-0 mr-3'>
            <img className='w-10 h-10 rounded-full bg-gray-300' src={user.profilePicture} alt={user.username}/>

        </div>
        <div className='flex-1'>
            <div className='flex items-center mb-3'>
                <span className='font-semibold mr-1 text-xs truncate'>{user ? `@${user.username}` :'Anonymous user'}</span>
                <span className='text-gray-250 text-xs '>{moment(review.createdAt).fromNow()}</span>
            </div>
            <p className='text-gray-500 pb-2'>{review.content}</p> 
        </div>
    </div>
  )
}
