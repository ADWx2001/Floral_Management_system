import { Carousel } from "flowbite-react";

export default function Home() {

  return (
    
    <div className="mx-auto">
        <div className="mx-auto sm:h-96 xl:h-96 2xl:h-96" style={{height:"600px"}}>
          <Carousel className="w-full">
            <img src="/img/1.png" alt="..."/>
            <img src="/img/2.png"  alt="..." />
            <img src="/img/3.png" alt="..." />
            <img src="/img/4.png"  alt="..." />
            <img src="/img/5.png"   alt="..." />
          </Carousel>
        </div>
      {/* <div className="relative w-full bg-red-200 h-96 rounded-xl overflow-hidden pb-10">
        <img src="/sample/3.jpg" alt="" className="w-full h-full object-cover absolute inset-0" />

        <div className="absolute inset-0 bg-black opacity-30"></div>
        
        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-20">
            <div>
              <h1 className="font-semibold text-3xl text-white">We want every event to be as unique as our last</h1><br />
              <span className="text-white text-lg">Capture the beauty of every special occation with handcrafted <br />floral arrangements.</span>

            </div>

            {/* <form className="w-full max-w-lg p-4  rounded-xl">
                <div>
                    <div className="mb-2 block">
                        <label htmlFor="email1" className="font-bold text-white">Your email</label>
                    </div>
                    <input id="email1" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" placeholder="yourname@gmail.com" required />
                </div>
                <div>
                    <div className="mb-2 block pt-3">
                        <label htmlFor="password1" className="font-bold text-white">Your Full Name</label>
                    </div>
                    <input id="password1" type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
                </div>
                <div>
                    <div className="mb-2 block pt-3">
                        <label htmlFor="subject" className="font-bold text-white">Brief Message</label>
                    </div>
                    <textarea id="subject" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required />
                </div>
                
                <button type="submit" className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 ease-in-out">Submit</button>
            </form> 

      </div>
    
    
    
      </div> */}




    </div>
  )
}


        