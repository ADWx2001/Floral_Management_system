import { Alert, Button, Label, TextInput ,Spinner, Carousel } from "flowbite-react";
import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import OAuthenticate from "../components/OAuthenticate";

export default function SignUp() {
    const [formData , setFormData] = useState({});
    const [error , setError] = useState(false);
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]:e.target.value.trim()});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.username || !formData.email || !formData.password || !formData.mobile || !formData.adress) {
            return setError('Please Fill all Fields');
        }

        try {
            setLoading(true);
            setError(false);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);
            setLoading(false);
            if(data.success === false) {
                setError(data.message);
                return;
            }
            navigate('/sign-in');
        } catch(error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-20">
                {/* left */}
                <div className="flex-1 w-100 screen mt-35" >
                    
                    <div className="h-150 sm:h-96 xl:h-96 2xl:h-200">
                        <Carousel
                            autoplay={true}
                            autoplaySpeed={2000}
                            showDots={true}
                            infinite={true}
                            slidesToShow={1}
                            slidesToScroll={1}
                        >
                            <img className="w-full h-full object-cover" src="https://www.marthastewart.com/thmb/XNtl-ybaFAiVz6RvU6ORwlYcrM0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-planners-tara-guerard-gayle-brooker-1120-13ec6eea36ae4b2e99d970aaeafa952f.jpg" alt="Photo 1" />
                            <img className="w-full h-full object-cover" src="https://pizzazzerie.com/wp-content/uploads/2021/04/enchanted-gardening-party-01.jpg" alt="Photo 2" />
                            <img className="w-full h-full object-cover" src="https://images.ctfassets.net/6m9bd13t776q/2BaFhJ3BKg2McW2OAU2MW2/8ea81f814abcfa35a05d5242fffeb754/baby-shower-etiquette-food-display-950x1152.jpg?h=979" alt="Photo 3" />
                            <img className="w-full h-full object-cover" src="https://www.bhg.com/thmb/QmH33Aup6SRpqdv_XcsAh1yYOLY=/1244x0/filters:no_upscale():strip_icc()/tall-pink-red-flower-arrangement-white-vase-dc7b0794-f385af55d23e47e4b4d954ee98ec6d21.jpg" alt="Photo 4" />
                            <img className="w-full h-full object-cover" src="https://images.squarespace-cdn.com/content/v1/60a473fd57b5c705f28888ff/1693088485377-94SXBLTF0HGO67CKYO5Q/IMG_8007.jpg" alt="Photo 5" />
                        </Carousel>
                    </div>
                </div>
                {/* right */}
                <div className="flex-1">
                    <p className="text-center text-2xl font-cinzel font-semibold ">Sign Up</p>
                    <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit}>
                        <div>
                            <Label value="Your username"/>
                            <TextInput type="text" placeholder="Username" id="username" onChange={handleChange}/>
                        </div>
                        <div>
                            <Label value="Your email"/>
                            <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange}/>
                        </div>
                        <div>
                            <Label value="Your Address"/>
                            <TextInput type="text" placeholder="Address" id="adress" onChange={handleChange}/>
                        </div>
                        <div>
                            <Label value="Your mobile number"/>
                            <TextInput type="text" placeholder="Mobile Number" id="mobile" onChange={handleChange}/>
                        </div>
                        <div>
                            <Label value="Your password"/>
                            <TextInput type="password" placeholder="Password" id="password" onChange={handleChange}/>
                        </div>
                        <Button disabled={loading} gradientDuoTone='purpleToPink' type="submit">
                            {loading ? (
                                <>
                                    <Spinner size='sm'/>
                                    <span className="pl-3">Loading</span>
                                </>
                            ) : 'Sign Up'}
                        </Button>
                        <OAuthenticate/>
                    </form>
                    <div className="flex gap-2 text-sm mt-5 ">
                        <span>Have an Account?</span>
                        <Link to='/sign-in' className="text-blue-500">Sign In</Link>
                    </div>
                    {
                        error && (
                            <Alert className="mt-5" color='failure'>
                                {error} 
                            </Alert>
                        )
                    }
                </div>
            </div>
        </div>
    )
}