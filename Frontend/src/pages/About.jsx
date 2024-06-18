export default function About() {

  return (
    <div className="w-full flex flex-wrap  ">

    <div className="w-full md:w-1/2 flex flex-col p-10 bg-gray-100 dark:bg-slate-800">
      <h1 className="font-semibold text-xl" style={{color:"#D63096"}}>Customer & order inquiries</h1>
      <p className="text-md pt-5">We always appreciate your feedback to improve our service. If you wish to get in touch, please do not hesitate to contact a member of the SODURUMAMAL team at:</p>
      <div className="font-semibold pt-2">
        <span>+94 71 365 9800</span><br />
        <span>support@sodurumamal@gmail.com</span>
      </div>

      <h1 className="font-semibold text-xl mt-10 " style={{color:"#D63096"}}>Bussiness & Inquries</h1>
      
      <div className="font-semibold pt-2">
        <span>+94 71 365 9800</span><br />
        <span>support@sodurumamal@gmail.com</span>
      </div>

      <h1 className="font-semibold text-xl mt-10" style={{color:"#D63096"}}>Event & Wedding Inquiries</h1>
      
      <div className="font-semibold pt-2">
        <span>+94 71 365 9800</span><br />
        <span>support@sodurumamal@gmail.com</span>
      </div>

    </div>

    

    <div className="w-full md:w-1/2 flex justify-center items-center">
      <img src="/event/2.jpg" alt="" className="max-w-full h-auto rounded-lg" />
      
    </div>
    
    {/* <div className="flex justify-center py-8">
      <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
      
        <img
          className="w-full h-56 object-cover"
          src="https://i5.walmartimages.com/seo/Pond-s-Dry-Skin-Face-Moisturizer-Cream-Daily-Facial-Moisturizing-10-1-oz_55227e41-ecf5-48f2-8c52-8038d490741d_1.c0d83fae8668961ab4bd1c583d1a9da1.jpeg"
          alt="Pond's Dry Skin Cream"
        />

        <div className="p-4 text-center">
          <h5 className="font-bold">Fancy Product</h5>
          <p className="text-gray-700">$40.00 - $80.00</p>
        </div>
        
        <div className="px-4 pb-4">
          <a
            href="#"
            className="block w-full text-center py-2 mt-2 bg-white border border-gray-400 text-gray-700 hover:bg-gray-100 rounded"
          >
            View options
          </a>
        </div>
      </div>
    </div> */}

  </div>


  )
}
