import React, { useState } from "react";
import { ChevronDown, ChevronUp, LayoutDashboard, LogOut, Settings, UserRound, Wallet } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
    const [setting, setSetting] = useState(false);

    const {user, logout} = useAuth();
    
    return (
        <div className="sticky top-0 w-full h-20 shadow-xl bg-white z-50 flex items-center justify-between p-7 max-md:pl-3">
            <div className="flex items-center w-[20%] max-md:w-[50%]">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-[#072b3a] to-[#0f6f5a]">
                    <Wallet className="w-6 h-6 text-white" />
                </div>
                <div className="pl-4 text-left">
                    <h1 className="text-black font-bold max-md:text-sm">Spend Boat</h1>
                    <p className="text-gray-600 text-sm font-medium max-md:text-xs">personal finanace</p>
                </div>
            </div>

            <div className="flex w-[80%] justify-end items-center gap-5 max-md:gap-1 max-md:w-[50%]">
                <div className="pr-4 pl-[12%] max-md:pr-1 max-md:pl-1">

                    <a
                        href="/dashboard"

                        className="flex bg-green-100 hover:bg-green-200 h-10 items-center rounded-xl px-2 group"
                    >
                        <LayoutDashboard strokeWidth={3} className="text-[#0f6f5a]" />
                        <span className="pl-4 font-bold text-[#0f6f5a] max-md:hidden">Dashboard</span>
                    </a >
                </div>

                <div className="flex hover:bg-gray-50 py-2 pr-3 pl-1 rounded-lg max-md:pl-0">
                    <div className="rounded-xl bg-linear-to-br from-[#3eeec8] to-[#d9fdf5] h-8 w-8 p-1 flex items-center justify-center">
                        <UserRound color="#0f6f5a" size={22} />
                    </div>
                    <div 
                        className="pl-3 flex items-center gap-2 cursor-pointer " 
                        onClick={() => (setSetting(!setting))}
                    >
                        <h1 className="opacity-80 max-md:text-sm">Account</h1>
                        {setting ? <ChevronUp /> : <ChevronDown />}
                    </div>
                    
                    {setting &&
                        <div className="absolute top-19 right-3 w-[20%] rounded-2xl shadow-2xl bg-white p-4 flex flex-col z-50 cursor-pointer max-md:w-[70%]">
                            <ul className="flex items-center gap-4 hover:bg-gray-50 h-13 pl-2 rounded-lg w-full">
                                <div className="rounded-xl bg-linear-to-br from-[#3eeec8] to-[#d9fdf5] h-8 w-8 p-1 flex items-center justify-center">
                                    <UserRound color="#0f6f5a" size={22} />
                                </div>
                                <h1>{user?.name}</h1>
                            </ul>
                            <a 
                                href="/profile"
                                className="flex gap-3 opacity-80 hover:bg-gray-50 h-13 items-center pl-2 rounded-lg w-full"
                            >
                                <div ><Settings /></div>
                                <h1>Account Setting</h1>
                            </a>
                            <ul className="flex gap-3 text-red-700 hover:bg-gray-50 h-13 items-center pl-2 rounded-lg w-full" onClick={() => logout()}>
                                <div><LogOut/></div>
                                <h1 >Sign Out</h1>
                            </ul>
                        </div>
                    }
                </div>
            </div>
            
            
        </div>
    )
}

export default NavBar