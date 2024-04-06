import { Button, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ResetPassword() {
    const { id, token } = useParams();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");

    const userValid = async () => {
    try {
        const res = await fetch(`/api/user/resetpassword/${id}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        if (data.status === 201) {
            console.log("User is valid");
        } else {
            setError("Invalid user or token.");
            console.error("Invalid user or token.");
        }
    } catch (error) {
        console.error("An error occurred while checking user validity:", error);
        setError("An error occurred while checking user validity. Please try again later.");
    }
};

    useEffect(() => {
        userValid();
    }, []);

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,}$/;
        
        if (!passwordRegex.test(password)) {
            setError("Password must contain at least one uppercase letter, one number, one symbol, and be at least 5 characters long.");
            return;
        }

        try {
            const res = await fetch(`/api/user/updateResetPassword/${id}/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });

            const data = await res.json();

            if (data.status === 201) {
                setPassword("");
                setMessage("Password updated successfully.");
            } else {
                setError("Token expired. Please generate a new link.");
            }
        } catch (error) {
            console.error("An error occurred while updating password:", error);
            setError("An error occurred while updating password.");
        }
    };

    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-20">
                <div className="flex-1">
                    <Link to="/" className="text-5xl font-bold dark:text-white font-tangerine">
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via purple-500 to-pink-500 text-white rounded-lg size-10/12">Flora</span>Shop
                    </Link>
                    <p className="text-sm mt-5 font-cinzel font-gray font-semibold">Join with us to get beautiful flowers to your doorstep and let us decorate for you with your favorite flowers.</p>
                </div>
                <div className="flex-1">
                    <p className="text-center text-2xl font-cinzel font-semibold">Enter New Password</p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
                        <div>
                            <Label value="Enter Your Password" />
                            <TextInput type="password" placeholder="**********" id="password" onChange={handleChange} value={password} />
                        </div>
                        <Button gradientDuoTone="purpleToBlue" type="submit">
                            Submit
                        </Button>
                    </form>
                    {error && <p className="text-red-600 mt-3">{error}</p>}
                    {message && <p className="text-green-600 mt-3">{message}</p>}
                </div>
            </div>
        </div>
    );
}
