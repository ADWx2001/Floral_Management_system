import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AddProducts() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Add Products</h1>
        <form className="flex flex-col  gap-4">
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text'placeholder='Title'required id='title'className='flex-1'/>
          <Select>
            <option value='uncategorized'>Select a category</option>
            <option value='arrangements'>Arrangements</option>
            <option value='bouquets'>Bouquets</option>
            <option value='singleflowers'>Single Flowers</option>
          </Select>
         </div>
         <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
            <FileInput type='file'accept='image/*'/>
            <Button type='button'gradientDuoTone='purpleToBlue'size='sm' outline>Upload Image</Button>
        </div>
        <ReactQuill theme="snow" placeholder="Description..." className="h-52 mb-12"/>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput type="number" placeholder="Price" id="price"/>
            <TextInput type="number" placeholder="Quantity" id="stockQuantity"/>
            <TextInput type="text" placeholder="Delivery Time" id="deliveryTime"/>
            <TextInput type="text" placeholder="Supplier" id="supplier"/>
        </div>
        <Button type='submit' gradientDuoTone='purpleToBlue'>Add</Button>
        </form>
    </div>
  )
}
