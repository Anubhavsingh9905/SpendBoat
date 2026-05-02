import React, { useState } from "react";
import { EyeIcon, EyeClosedIcon, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
function Login() {
    const [visiblity, setVisiblity] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [loginCredentials, setLoginCredentials] = useState({ email: "", password: "" });

    const { login } = useAuth();

    const toggleVisiblity = () => {
        setVisiblity(!visiblity);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginCredentials({
            ...loginCredentials,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(loginCredentials);
        setIsLoading(true);

        const response = await login(loginCredentials);
        // console.log(response);
        if (response) {
            setError("");
            setIsLoading(false);
        }
        else {
            setError("Wrong credentials please try again.");
            setIsLoading(false);
        }
    }

    return (
        <div className="text-left w-[40%] rounded-br-2xl rounded-tr-2xl pl-[5%] shadow-2xl pt-[5%] max-md:w-full max-md:rounded-2xl max-md:pb-5">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="pt-2 opacity-50 font-medium">Sign in to your sorveign ledger</p>

            <form onSubmit={handleSubmit} className="pt-[7%]">

                {/* email field */}
                <div>
                    <label htmlFor="email" className="text-gray-600 font-medium">Email Address</label><br />
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="name@company.com"
                        onChange={handleChange}
                        className="outline-1 outline-gray-500 w-[85%] h-10 mt-2 rounded-xl bg-gray-200 px-5 py-7 font-medium text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#0f6f5a]"
                    />
                </div>

                {/* password field */}
                <div className="mt-5">
                    <label htmlFor="password" className="text-gray-600 font-medium">Password</label><br />
                    <div className="w-full flex">
                        <input
                            type={visiblity ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder=". . . . . . . . . . ."
                            onChange={handleChange}
                            className="outline-1 outline-gray-500 w-[85%] h-10 mt-2 rounded-xl bg-gray-200 pl-5 pr-8 py-7 font-medium blacky-600 focus:outline-none hover:ring-1 hover:ring-[#0f6f5a] focus:ring-2 focus:ring-[#0f6f5a]"
                        />
                        <div className="bg-transparent flex items-center h-10 relative top-4 right-7 cursor-pointer" onClick={toggleVisiblity}>
                            {visiblity ? <EyeClosedIcon color="gray" /> : <EyeIcon color="gray" />}
                        </div>
                    </div>
                </div>

                {/* button field */}
                <button
                    type="submit"
                    className="w-[85%] mt-8 bg-[#031b2f] text-white font-bold h-14 rounded-xl hover:bg-[#072b3a] active:bg-[#031b2f]"
                >
                    {isLoading ?
                        <>
                            <Loader2 className="animate-spin m-auto" />
                            <p className="text-sm opacity-70">Loging In</p>
                        </>
                        : "Sign In"
                    }
                </button>

                <h1 className="text-red-500 font-semibold text-lg">{error}</h1>
            </form>


            <div className="mt-5 text-left w-full text-gray-700 font-medium flex">
                New to Spend Boat?  &nbsp; <a href="/register" className="text-[#0f6f5a] font-bold cursor-pointer hover:text-[#138e74]">Create Account</a>
            </div>
        </div>
    )
}

export default Login;