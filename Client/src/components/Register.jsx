import React, { useState } from "react";
import { Wallet, MessageCircle, Award, Loader2, EyeIcon, EyeClosedIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";


function Register() {
    const [userData, setUserData] = useState({name:"", email:"", phone:"", password:""});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [visiblity, setVisiblity] = useState(false);

    const {register} = useAuth();

    const phone = "+1 415 523 8886";
    const message = "Start tracking my Expenses";

    const handleChange = (e) => {
        const {value, name} = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
        // console.log(userData);
    }

    const togleVisiblity = () => {
        setVisiblity(!visiblity);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        console.log(userData);
        setIsLoading(true);

        const response = await register(userData);

        if(response){
            setError("");
            setIsLoading(false);
        }
        else{
            setError("Some thing went wrong __ Try again");
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full h-full bg-radial-[at_50%_30%] from-white to-[#016445] to-250% py-[2%]">
            <div className="text-white flex w-full pl-[4%]">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-[#072b3a] to-[#0f6f5a]">
                    <Wallet className="w-6 h-6 text-white" />
                </div>

                <span className="text-black font-bold pl-3 pt-1">Spend Boat</span>
            </div>

            <div className="w-full flex flex-col gap-4 items-center justify-center ">
                <h1 className="text-4xl font-bold">Join Our Platform</h1>
                <p className="">Start Tracking Your Daily Expenses with AI Powered Insight</p>
            </div>

            {/* user data field*/}
            <div className="ml-auto mt-[2%] mr-auto h-full text-left w-[40%] rounded-2xl rounded-tr-2xl pl-[5%] pb-[2%] shadow-2xl bg-white">

                <form onSubmit={handleSubmit} className="pt-[6%]">
                    {/* name field */}
                    <div>
                        <label htmlFor="fullname" className="text-gray-600 font-medium">Full Name</label><br />
                        <input  type="text"
                            name="name"
                            id="fullname"
                            value={userData.name}
                            placeholder="Name"
                            onChange={handleChange}
                            className="outline-1 outline-gray-500 w-[85%] h-10 mt-2 rounded-xl bg-gray-200 px-5 py-7 font-medium text-black focus:outline-none hover:ring-1 hover:ring-[#0f6f5a] focus:ring-2 focus:ring-[#0f6f5a]"
                        />
                    </div>

                    {/* email address field */}
                    <div className="mt-5">
                        <label htmlFor="email" className="text-gray-600 font-medium">Email Address</label><br />
                        <input  type="email"
                            name="email"
                            id="email"
                            value={userData.email}
                            placeholder="name@company.com"
                            onChange={handleChange}
                            className="outline-1 outline-gray-500 w-[85%] h-10 mt-2 rounded-xl bg-gray-200 px-5 py-7 font-medium text-black focus:outline-none hover:ring-1 hover:ring-[#0f6f5a] focus:ring-2 focus:ring-[#0f6f5a]"
                        />
                    </div>

                    {/* phone number field */}
                    <div className="mt-5">
                        <label htmlFor="phonenumber" className="text-gray-600 font-medium">Phone Number</label><br />
                        <input  type="tel"
                            name="phone"
                            id="phonenumber"
                            value={userData.phone}
                            placeholder="+1 (555) 1234-5555"
                            onChange={handleChange}
                            className="outline-1 outline-gray-500 w-[85%] h-10 mt-2 rounded-xl bg-gray-200 px-5 py-7 font-medium text-black focus:outline-none hover:ring-1 hover:ring-[#0f6f5a] focus:ring-2 focus:ring-[#0f6f5a]"
                        />
                    </div>

                    {/* password field */}
                    <div className="mt-5">
                        <label htmlFor="password" className="text-gray-600 font-medium">Password</label><br />
                        <div className="w-full flex">
                            <input  
                                type= {visiblity ? "text": "password"}
                                name="password"
                                id="password"
                                value={userData.password}
                                placeholder=". . . . . . . . . . ."
                                onChange={handleChange}
                                className="outline-1 outline-gray-500 w-[85%] h-10 mt-2 rounded-xl bg-gray-200 pl-5 pr-8 py-7 font-medium blacky-600 focus:outline-none hover:ring-1 hover:ring-[#0f6f5a] focus:ring-2 focus:ring-[#0f6f5a]"
                            />
                            <div className="bg-transparent flex items-center h-10 relative top-4 right-7 cursor-pointer" onClick={togleVisiblity}>
                                {visiblity ? <EyeClosedIcon color="gray" /> : <EyeIcon color="gray" />}
                            </div>
                        </div>
                    </div>

                    {/* button field */}
                    <button type="submit" className="w-[85%] mt-8 bg-[#031b2f] text-white font-bold h-14 rounded-xl hover:bg-[#072b3a] active:bg-[#031b2f]">
                        {isLoading ?
                            <>
                            <Loader2 className="animate-spin m-auto"/>
                            <p className="text-sm opacity-70">Creating account</p>
                            </>
                            :"Register"
                        }
                    </button>
                    
                    <h1 className="text-red-500 font-semibold text-lg">{error}</h1>

                </form>
                
                {/* tawilno guide */}
                <div className="my-10 p-5 bg-green-50  w-[85%] space-y-4 mr-10 rounded-lg border border-green-600">
                    <div className="flex gap-4 h-10 items-center">
                        <div className="flex items-center justify-center w-10 h-full rounded-xl bg-green-300">
                            <MessageCircle className="w-7 h-7 text-[#138e74]" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-lg font-bold">WhatsApp Integration Guide</h1>
                            <p className="opacity-90 text-sm">Connect your whatsapp for expense tracking</p>
                        </div>
                    </div>

                    <ol className="text-left space-y-4">
                        <li className="flex gap-4 items-center border border-green-300 p-3 rounded-lg">
                            <div className="text-sm text-white h-7 w-7 rounded-full bg-[#0f6f5a] flex items-center justify-center">1</div>
                            <h1 className="text-xs font-semibold">Send Join Message "{message}" to {phone}</h1>        
                        </li>

                        <li className="flex gap-4 items-center border border-green-300 p-3 rounded-lg">
                            <div className="text-sm text-white h-7 w-7 rounded-full bg-[#0f6f5a] flex items-center justify-center">2</div>
                            <h1 className="text-xs font-semibold">Wait for verification message</h1>
                        </li>

                        <li className="flex gap-4 items-center border border-green-300 p-3 rounded-lg">
                            <div className="text-sm text-white h-7 w-7 rounded-full bg-[#0f6f5a] flex items-center justify-center">3</div>
                            <h1 className="text-xs font-semibold">Start sending expenses like "Dinner for ₹45"</h1>
                        </li>

                    </ol>

                    <div className="flex gap-4 items-center border border-green-300 p-3 rounded-lg bg-green-200">
                        <Award className="text-[#138e74]" fill="#138e74"/>
                        <h1 className="text-xs font-semibold">Set monthly limit for better experience</h1>
                    </div>

                </div>

                <div className=" w-[89%] text-center text-gray-700 font-medium flex ml-auto mr-auto">
                    Already have an Account?  &nbsp; <a href="/" className="text-[#0f6f5a] font-bold cursor-pointer hover:text-[#138e74]">Create Account</a>
                </div>
            </div>

        </div>
    )
}

export default Register;