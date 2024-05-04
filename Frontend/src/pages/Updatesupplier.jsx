import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";



import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate , useParams} from "react-router-dom";



export default function Updatesuppliers() {

    const {id} = useParams();
    const[file,setFile]=useState(null);
    const[imageUploadProgress,setImageUploadProgress] = useState(null);
    const[imageUploadError,setImageUploadError] = useState(null);
    const [formData , setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const[name,setname]=useState();
    const[companyname,setcname]=useState();
    const[Email,setemail]=useState();
    const[address,setaddress]=useState();
    const[paymenttype,setpaytype]=useState();
    const[cat,setcategory]=useState();
    const[number,setnumber]=useState();

    const[count,setcount]=useState();

    const[cmethod,setcmethod]=useState();
    const[image,setimage]=useState();
    const[accnum,setaccnum]=useState();
    const[bankname,setbankname]=useState();
    const [isValid, setIsValid] = useState(true);
  


    


    const navigate = useNavigate();
    const validateMobileNumber = (number) => {
      const mobileRegex = /^(0|071|076|077|075|078|070|074|072)\d{7}$/;
      return mobileRegex.test(number);
  };

  const handleChange = (e) => {
    const newMobileNumber = e.target.value;
    const isValidMobile = validateMobileNumber(newMobileNumber);
    setIsValid(isValidMobile);
   
};
   
    const handleUploadImage = () =>{
      try {
        if(!file){
          setImageUploadError('please select an image');
          return;
        }
        setImageUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime()+'-'+file.name;
        const storageRef = ref(storage,fileName);
        const uploadTask = uploadBytesResumable(storageRef,file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUploadProgress(progress.toFixed(0));
          },
          
          (error) => {
            setImageUploadError("Image upload failed");
            console.error("Upload error:", error);
            setImageUploadProgress(null);
           
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
              setImageUploadProgress(null);
              setImageUploadError(null);
              setFormData({...formData, image: downloadURL});
              setimage(downloadURL)
              console.log(image)
            }
             
            );
          }
        );
  
      } catch (error) {
        setImageUploadError('Failed to upload image');
        setImageUploadProgress(null);
        console.log(error);
      }
    }
  


 



      useEffect(() => {
        try {
          const fetchsupplier= async () => {
            const res = await fetch(`/api/suppliers/getsupplier/${id}`);
            const data = await res.json();
            if (!res.ok) {
              console.log("error")
          
              return;
            }
            if (res.ok) {
             setname(data.suppliername)
             setcname(data.comapnyname)
             setaddress(data.address)
             setcategory(data.category)
             setcmethod(data.communicationmethod)
             setnumber(data.phonenumber)
             setpaytype(data.paymenttype)
             setemail(data.email)
             setimage(data.profilePicture)
             setbankname(data.Bankname)
             setaccnum(data.bankaccnumber)
             console.log(number)

              setcount(data.damageditemcount)

             setFile(data.profilePicture)
             console.log(data.paymenttype)
            
             console.log(data.category)
             console.log(data.communicationmethod)

        
             
            
           
            
            
            }
          };
    
          fetchsupplier();
        } catch (error) {
          console.log(error.message[0]);
        }
      }, [id]);
     

      const handleSubmit = async (e) => {
        e.preventDefault();
      
    if(isValid==true){
    setFormData({ ...formData, PhoneNumber: e.target.value })
 
        try {
            const res = await fetch(`/api/suppliers/updatesupplier/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (!res.ok) {
            setPublishError(data.message);
            return;
          }
    
          if (res.ok) {
            setPublishError(null);
            navigate('/dashboard?tab=suppliers');
          }
        } catch (error) {
          setPublishError('Something went wrong');
        }
      }
      else{
        setPublishError('Invalid mobile number')
      } };








  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Update Supplier</h1>
        <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
      <h5>Payment method:</h5>
          <Select  onChange={(e) =>setFormData({ ...formData, Paymentmethod: e.target.value })
            } defaultValue={paymenttype} >
            <option value={paymenttype}>{paymenttype}</option>
            <option value='Bank transfer'>Bank transfer</option>
            <option value='Card'>Card</option>
            <option value='Check'>Check</option>
          </Select>
          <h5>category:</h5>
          <Select  onChange={(e) =>setFormData({ ...formData, category: e.target.value })
            }  defaultValue={cat}>
            <option value={cat}>{cat}</option>
            <option value='arrangements'>Arrangements</option>
            <option value='bouquets'>Bouquets</option>
            <option value='singleflowers'>Single Flowers</option>
          </Select>
          <h5>Communication Method:</h5>
          <Select  onChange={(e) =>setFormData({ ...formData, CommunicationMethod: e.target.value })
            }  defaultValue={cmethod}>
            <option value={cmethod}>{cmethod}</option>
            <option value='Phone call'>Phone call</option>
            <option value='Email'>Email</option>
            
          </Select>
         </div>
       
         <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
            <FileInput type='file'accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
            <Button onClick={handleUploadImage} type='button'gradientDuoTone='purpleToBlue'size='sm' outline disabled={imageUploadProgress}>
              {
                imageUploadProgress ?(
                <div className="w-16 h-16" >
                  <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}`}/>
                </div>
                ) :('Upload Image')

              }
            </Button>
        </div>
        {imageUploadError && (
          <Alert color='failure'>{imageUploadError}</Alert>
        )}
        {image && (
          <img src={image} alt="upload" className="w-full h-82 object-cover"/>
        )}
        <TextInput type='text'placeholder='Supplier Name'required id='Name'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, SupplierName: e.target.value })
            }  defaultValue={name} />

<TextInput type='text'placeholder='Company Name'required id='Company Name'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, CompanyName: e.target.value })
            } defaultValue={companyname}/>
            <TextInput type='text'placeholder='Address'required id='Address'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, Address: e.target.value } )
            }  defaultValue={address}/>
            <TextInput type='text'placeholder='Phone Number:' id='Phone Number'className='flex-1'   onChange={handleChange}  defaultValue={number}/>

            <TextInput type='email'placeholder='Email Address:'required id='Email Address:'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, EmailAddress: e.target.value })
            } defaultValue={Email}/>
            <TextInput type='number'placeholder='Damaged item count' id='count'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, Damageditem: e.target.value })
            } defaultValue={count} />

            <TextInput type='email'placeholder='Email Address:'required id='Email Address:'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, EmailAddress: e.target.value })
            } defaultValue={Email}/>
             <Select  onChange={(e) =>setFormData({ ...formData, bankname: e.target.value })
            } required >
            <option value={bankname}>{bankname}</option>
            <option value='Bank of ceylon'>Bank of ceylon</option>
            <option value='Peoples Bank'>Peoples Bank</option>
            <option value='Commercial Bank'>Commercial Bank</option>
            <option value='Sampath Bank'>Sampath Bank</option>
            <option value='HNB Bank'>HNB Bank</option>
            
          </Select>
          <TextInput type='number'placeholder='Acc number:'required id='Acc number:'className='flex-1'  onChange={(e) =>
              setFormData({ ...formData, accnum: e.target.value })
            } defaultValue={accnum}/>

        <Button type='submit' gradientDuoTone='purpleToBlue'>Update</Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
        </form>
    </div>
  )

}


