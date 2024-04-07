import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";


export default function Search() {
    
    const[sideBarData , setSideBarData] = useState({
        searchTerm : '',
        sort : 'desc',
        category : 'uncategorized', 
    });

    console.log(sideBarData);

    const[products , setProducts] = useState([]);
    const[loading , setLoading] = useState([]);
   

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');
        if(searchTermFromUrl || sortFromUrl || categoryFromUrl){
            setSideBarData({
                ...sideBarData,
                searchTerm:searchTermFromUrl,
                sort:sortFromUrl,
                category: categoryFromUrl 
            })
        }
        const fetchProducts = async  () =>{
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/products/getproducts?${searchQuery}`)
            if(!res.ok){
                setLoading(false);
                return
            }
            if(res.ok){
                const data = await res.json();
                setProducts(data.products);
                setLoading(false);
                
            }

        }
        fetchProducts();
    } , [location.search]);

    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
          setSideBarData({ ...sideBarData, searchTerm: e.target.value });
        }
        if (e.target.id === 'sort') {
          const order = e.target.value || 'desc';
          setSideBarData({ ...sideBarData, sort: order });
        }
        if (e.target.id === 'category') {
          const category = e.target.value || 'uncategorized';
          setSideBarData({ ...sideBarData, category });
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sideBarData.searchTerm);
        urlParams.set('sort', sideBarData.sort);
        urlParams.set('category', sideBarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
      };

  return (
    <div className="flex flex-col md:flex-row">
        <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                    <label className="whitespace-nowrap font-cinzel">Searched Product:</label>
                    <TextInput placeholder="search..." id="searchTerm" type="text" value={sideBarData.searchTerm}  onChange={handleChange}/>

                </div>
                <div className="flex items-center gap-2">
                    <label className="whitespace-nowrap font-cinzel">Sort:</label>
                    <Select onChange={handleChange} value={sideBarData.sort} id='sort'>
                        <option value='desc'>Latest</option>
                        <option value='asc'>Older</option>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <label className="whitespace-nowrap font-cinzel">Category:</label>
                    <Select onChange={handleChange} value={sideBarData.category} id='category'>
                        <option value='uncategorized'>Uncategorized</option>
                        <option value='arrangements'>Arrangements</option>
                        <option value='singleFlower'>SingleFlower</option>
                        <option value='boquets'>Boquets</option>
                    </Select>
                </div>
                <Button type="submit" outline gradientDuoTone='purpleToBlue'>Filter Products</Button>
            </form>
        </div>
        <div className="w-full">
            <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">Product Results</h1>
            <div className="p-7 flex flex-wrap gap-4">
                {
                    !loading && products.length ===0 &&(
                      <p className="text-xl text-gray-500" >
                        No Product Found.
                      </p>
                    ) 
                }
                {
                    loading && (
                        <p className="text-xl text-gray-500" >
                        Loading....
                      </p>
                    )
                }
                {
                    !loading && products && products.map((products)=>

                        <PostCard key={products._id} product={products}/> 
                        
                    )
                }
            </div>
        </div>
    </div>
  )
}