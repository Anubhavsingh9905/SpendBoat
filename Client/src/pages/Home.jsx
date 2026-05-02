import React, { useState } from "react";
import { BarChart3, CheckCircle, MessageSquare, MessageSquareText, Wallet, Zap, MoveRight, LogIn} from 'lucide-react';
import Login from "../components/Login";
import Register from "../components/Register";
import { useAuth } from "../context/AuthContext";
import TwilloGuide from "../components/TwilloGuide";
import message from "../assets/message.png";
import animate from "../assets/animated.gif";
import NavBar from "../components/NavBar";

function Home() {
    const { isAuthenticated } = useAuth();

    const Example = ["Spent ₹120 on groceries at Walmart", "Coffee ₹4.50", "Gas station ₹45", "Dinner with friends ₹85"];

    const Instruction = [
        { heading: "Register with your WhatsApp number", info: "Create your account using the phone number you'll use for WhatsApp", logo: <CheckCircle color="white" strokeWidth={3}/> },
        { heading: "Join our WhatsApp sandbox", info: "Send 'join local-carry' to +1 415 523 8886 to connect your WhatsApp", logo: <MessageSquare color="white" strokeWidth={3}/> },
        { heading: "Start tracking expenses", info: "Send messages like 'Spent ₹25 on lunch' or 'Uber ride ₹15' via WhatsApp", logo: <Zap color="white" strokeWidth={3}/> },
        { heading: "View your insights", info: "Check your dashboard for spending analytics and expense history", logo: <BarChart3 color="white" strokeWidth={3}/> }
    ];

    return (
        <div className="min-h-screen bg-radial-[at_77%_20%] from-green-100 to-white to-50% shadow-2xl">
            {isAuthenticated &&
                <div className="w-full h-25">
                    <NavBar />
                </div>
            }

            {/* login and logo */}
            <div id="login" className="flex px-[1em] py-[2em] min-h-screen shadow-2xl bg-radial-[at_77%_20%] from-green-100 to-white to-50% max-md:flex-col">
                <div
                    className={`text-left bg-linear-to-br from-[#031b2f] via-[#072b3a] to-[#0f6f5a] rounded-bl-2xl rounded-tl-2xl pl-[5%] pt-[5%] w-full max-md:rounded-2xl max-md:pb-5 ${!isAuthenticated ? "md:w-[60%]" : "" }`}
                >
                    <div className="text-white flex">
                        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#016445]">
                            <Wallet className="w-6 h-6 text-white" />
                        </div>

                        <span className="text-white font-medium pl-3 pt-1">Spend Boat</span>
                    </div>

                    <div
                        style={{ width: isAuthenticated ? "100%" : "70%" }}
                        className="text-white mt-[5%] text-5xl font-medium"
                    >
                        Master your <span className="text-[#6cfed0]">capital</span> with architectural precision
                    </div>

                    <div className="mt-[15%] flex gap-15">
                        <div className="text-white w-[35%]">
                            <div className="opacity-50 text-xs tracking-widest font-stretch-200%">
                                AUTOMATED INSIGHTS
                            </div>
                            <div className="pt-2 opacity-90 font-light">
                                Let AI decode your spending patterns while you focus on growth.
                            </div>
                        </div>

                        <div className="text-white w-[35%]">
                            <div className="opacity-50 text-xs tracking-widest font-stretch-200%">
                                SECURE VAULT
                            </div>
                            <div className="pt-2 opacity-90 font-light">
                                Enterprise-grade encryption for your personal expenses.
                            </div>
                        </div>
                    </div>
                </div>
                {!isAuthenticated &&
                    <Login />
                }
            </div>
            
            {/* How it works intructions */}
            <div className="m-auto w-full pt-[1em] pb-[0.5em] text-5xl font-bold"> How It Works </div>
            <div className="w-full px-[1em] py-[2em] flex justify-center gap-10 max-md:flex-col ">
                {Instruction.map((item, index) => (
                    <div key={index} className="group w-[20%] bg-white px-7 py-5 shadow-2xl rounded-xl flex flex-col gap-6 transform ease-in duration-300 hover:-translate-y-3 max-md:w-full">
                        <div className="flex justify-between">
                            <div className="flex items-center justify-center bg-linear-to-br from-[#0f7b39] to-[#89f2b0] w-13 h-13 rounded-xl transform ease-in duration-300 group-hover:scale-115">
                                {item.logo}
                            </div>
                            <div className="text-white font-bold w-8 h-8 bg-linear-to-br from-[#0f7b39] to-[#89f2b0] rounded-full flex items-center justify-center px-3 py-2 text-sm">
                                {index + 1}
                            </div>
                        </div>
                        <div className="text-left flex flex-col gap-6">
                            <h1 className="text-xl font-bold">{item.heading}</h1>
                            <p className="text-gray-500">{item.info}</p>
                        </div>
                        {index != 3 &&
                            <div className="transform ease-in-out duration-400 group-hover:translate-x-10">
                                <MoveRight size={40} color="#0f7b39" />
                            </div>
                        }
                    </div>
                ))}
            </div>
            
            {/* Expenses structure through whatsapp */}
            <div className="w-full px-[1em] py-[2em] flex max-md:flex-col">
                <div className="w-[70%] pl-10 flex flex-col p-5 text-left gap-8 bg-white shadow-2xl rounded-bl-2xl rounded-tl-2xl max-md:w-full">
                    <div className="border border-green-500 rounded-full flex items-center gap-3 bg-amber-50 px-3 py-2 text-sm w-fit">
                        <MessageSquare size={16} />
                        <h1>Wathsapp Integration</h1>
                    </div>

                    <h1 className="text-4xl font-bold">
                        Send expenses via chat, we'll handle the rest
                    </h1>

                    <p className="text-xl text-gray-600">
                        Simply send your expenses via WhatsApp and our AI will automatically parse, categorize, and track them for you. No need to open the web app every time!
                    </p>

                    <div className="bg-amber-50 border border-green-500 p-10 text-left rounded-xl">
                        <h1>Example Messages: </h1>
                        <div className="space-y-4 pt-5 text-left">
                            {Example.map((items, index) => (
                                <div key={index} className="bg-white w-[90%] shadow-2xl px-4 py-2 rounded-2xl flex items-center gap-4">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 ">
                                        <MessageSquareText size={15} color="#072b3a" />
                                    </div>
                                    <h1 className="font-semibold text-sm">{items}</h1>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
                <div className="w-[30%] flex items-center bg-white rounded-br-2xl rounded-tr-2xl max-md:hidden">
                    {/* <img src={message} alt=""  className="bg-white w-full h-[95%]"/> */}
                    <img
                        src={animate}
                        alt="animation"
                        className="w-full h-[95%] object-contain"
                    />
                </div>
            </div>
            
            {/* Some features of this website */}
            <div className="w-full px-[1em] py-[2em] flex justify-center gap-2 max-md:flex-col">
                <div className="w-[32%] px-10 py-5 bg-white shadow-2xl rounded-2xl flex flex-col justify-start items-start p-4 gap-4 transform ease-in duration-300 hover:-translate-y-3 max-md:w-full max-md:hover:translate-x-3">
                    <div className="flex items-center justify-center w-15 h-15 rounded-xl bg-green-100 ">
                        <Zap size={30} color="#072b3a" />
                    </div>
                    <h1 className="text-xl font-bold">AI-Powered</h1>
                    <p className="text-left text-gray-600">
                        Advanced AI understands natural language and automatically categorizes your expenses
                    </p>
                </div>

                <div className="w-[32%] px-10 py-5 bg-white shadow-2xl rounded-2xl flex flex-col justify-start items-start p-4 gap-4 transform ease-in duration-300 hover:-translate-y-3 max-md:w-full max-md:hover:translate-x-3">
                    <div className="flex items-center justify-center w-15 h-15 rounded-xl bg-green-100 ">
                        <MessageSquareText size={30} color="#072b3a" />
                    </div>
                    <h1 className="text-xl font-bold">WhatsApp Ready</h1>
                    <p className="text-left text-gray-600">
                        Track expenses directly from WhatsApp without opening any additional apps
                    </p>
                </div>

                <div className="w-[32%] px-10 py-5 bg-white shadow-2xl rounded-2xl flex flex-col justify-start items-start p-4 gap-4 transform ease-in duration-300 hover:-translate-y-3 max-md:w-full max-md:hover:translate-x-3">
                    <div className="flex items-center justify-center w-15 h-15 rounded-xl bg-green-100 ">
                        <BarChart3 size={30} color="#072b3a" />
                    </div>
                    <h1 className="text-xl font-bold">Smart Analytics</h1>
                    <p className="text-left text-gray-600">
                        Get insights into your spending patterns with beautiful charts and reports
                    </p>
                </div>
            </div>

            
            <div className="w-full flex justify-center py-[2em] ">
                {isAuthenticated ?
                    <a 
                        href="/dashboard"
                        className="text-white font-bold text-2xl px-3 py-4 flex items-center gap-3 w-fit rounded-xl bg-linear-to-br from-[#0a5125] via-[#1ac25a] to-[#bdf4d1] "
                    > 
                        Dashboard
                        <MoveRight color="white" strokeWidth={3}/>
                    </a>
                    :
                    <a 
                        href={"#login"}
                        className="text-white font-bold text-2xl px-3 py-4 flex items-center gap-3 w-fit rounded-xl bg-linear-to-br from-[#0a5125] via-[#1ac25a] to-[#bdf4d1] "
                    > 
                        Login
                        <LogIn color="white" strokeWidth={3}/>
                    </a>
                }
            </div>
        </div>
    )
}

export default Home