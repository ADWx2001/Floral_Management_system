import React from 'react'

export default function CallToAction() {
  return (
    <div className='p-8'>
        <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center ' >
            <div className='flex-1 justify-center flex flex-col'>
                <h2 className='text-2xl'>Do you want to plan flora event?</h2>
                <p className='text-gray-500 my-4'>hfwfjkwlbfvbef jk fb jvj jf bk bfk bfjkvvnasf jksbjvf</p>
                <button className='px-2 py-1 bg-gradient-to-r from-indigo-500 via purple-500 to-pink-500 justify-center items-center rounded-tl-xl rounded-br-xl font-medium' >
                    <a href={<Event/>}>Plan an event</a>
                </button>
               
            </div>
            <div className='p-7'>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOMcViysB6aV-QIudcaJRKvP0uMwXHbFYXjjRfTCF68w&s'/>
            </div>
        </div>
    </div>
  )
}
