import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Review from '../../../api/models/review.model.js';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';
import { Link } from "react-router-dom";


export default function Reviews({review , onUpdate , onDelete}) {
    const [user,setUser] = useState({});
    const [isUpdating, setisUpdating] = useState(false);
    const [updatedContent,setupdatedContent] = useState(review.content,review.reviewimage);
    const {currentUser} = useSelector((state) => state.user);
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
    },[review]);

    const handleUpdate = () =>{
        setisUpdating(true);
        setupdatedContent(review.content);
        
    };

    const handleSave = async() => {
        try{
         const res = await fetch(`/api/reviews/UpdateReview/${review._id}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                content:updatedContent,
            }),

         });
         if(res.ok){
            setisUpdating(false);
            onUpdate(review,updatedContent);
            
         }

        }
        catch(error){
            console.log(error.message)
        }
    };

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

            {isUpdating ? (
                <>
                  <Textarea
                    className='mb-2 '
                    value={updatedContent}
                    onChange={(e) => setupdatedContent(e.target.value)}
                    />
                <div></div>

                    <div  className='flex justify-end gap-2 text-xs  '>
                        <Button type='button' gradientDuoTone='purpleToBlue' size='sm' 
                        onClick={handleSave} >
                            Save
                        </Button>

                        <Button  type='button' gradientDuoTone='purpleToBlue'outline='purpleToBlue' size='sm'  onClick={() => setisUpdating(false)} >
                            Cancel
                        </Button>
                    </div>  
                </>
                
              
            ):( 
            <>
            <p className='text-gray-500 pb-2'>{review.content}</p> 
            <div className='mt-2'>
                <img
                    src={review.reviewimage}
                    alt=''
                    className="w-20 h-10 object-fill bg-gray-500"
                />
                  
            </div>
            <div>
                {
                    currentUser && (currentUser._id === review.userId || currentUser.isAdmin) && (
                    <>
                        <button className='font-normal  text-gray-400 hover:text-blue-500'  type='button'
                        onClick={handleUpdate}>
                        Edit
                        </button>

                        <button className='font-normal p-3 text-gray-400 hover:text-red-500'  type='button'
                        onClick={() => onDelete(review._id)}>
                        Delete
                        </button>
                    </>
                        
                    )
                }
            </div>
            </> 
            )}
            
        </div>
    </div>
  )
}
