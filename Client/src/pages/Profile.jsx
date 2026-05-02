import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Edit, Mail, Phone, Save, Settings, UserRound } from "lucide-react";
import TwilloGuide from "../components/TwilloGuide";
import api from "../services/api";

function Profile(){
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");

    const handleClick = async() => {
        if(edit){
            if(name.length > 0 || email.length > 0 || number.length > 0){
                const res = await api.post("/user", {name, email, number});
                console.log(res.data)
                setName(""); setEmail(""); setNumber("");
            }
        }
        setEdit(!edit);
    }

    return(
        <div className="bg-linear-to-r from-white to-green-50">
            <div className="h-30 w-full ">
                <NavBar/>
            </div>

            <div className="px-20 pb-6 space-y-10 max-md:px-0">
                <div className="h-20 rounded-lg flex gap-4 text-left items-center bg-white shadow-lg px-8 py-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-[#072b3a] to-[#0f6f5a]">
                        <Settings className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold max-md:text-xl">Account Setting</h1>
                        <p className="opacity-60 max-md:text-sm">Manage your personal information and security preferences</p>
                    </div>
                </div>

                {/* Edit Name, Phone, Email */}
                <div className="shadow-lg bg-white text-left px-8 py-5 space-y-10 rounded-lg">
                    <div className="h-9 w-full flex justify-between items-center">
                        <div className="flex items-center gap-4 h-full">
                            <div className="flex items-center justify-center w-9 h-full rounded-xl bg-linear-to-br from-[#072b3a] to-[#0f6f5a]">
                                <UserRound className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">Profile information</h1>
                                <p className="opacity-60 max-md:text-sm">your personal account details</p>
                            </div>
                        </div>
                        {!edit
                            ?<div className="flex gap-2 bg-green-100 px-4 py-2 rounded-2xl hover:bg-green-50 cursor-pointer" onClick={handleClick}>
                                <Edit color="#0f6f5a"/>
                                <h1 className="text-[#0f6f5a]">Edit</h1>
                            </div>
                            : <div className="flex gap-2 bg-green-100 px-4 py-2 rounded-2xl hover:bg-green-50 cursor-pointer" onClick={handleClick}>
                                <Save color="#0f6f5a"/>
                                <h1 className="text-[#0f6f5a]">Save</h1>
                            </div>
                        }
                    </div>
                    <div className="pl-5 space-y-5 max-md:pl-1">
                        <div className="flex h-18 bg-gray-100 gap-4 items-center p-3">
                            <div className="flex items-center justify-center w-12 h-full rounded-xl bg-green-200">
                                <UserRound className="w-6 h-6 text-[#0f6f5a]" />
                            </div>
                            <div className="w-full space-y-2 py-2">
                                <h1 className="font-bold opacity-80">Full Name</h1>
                                {edit && <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-white w-[80%] outline-1 rounded-lg text-lg px-2 py-1 outline-green-600 focus:ring-2 focus:ring-green-200 hover:ring-green-200"/>}
                            </div>
                        </div>
                        <div className="flex h-18 bg-gray-100 gap-4 items-center p-3">
                            <div className="flex items-center justify-center w-12 h-full rounded-xl bg-green-200">
                                <Mail className="w-6 h-6 text-[#0f6f5a]" />
                            </div>
                            <div className="w-full space-y-2 py-2">
                                <h1 className="font-bold opacity-80">E-Mail</h1>
                                {edit && <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white w-[80%] outline-1 rounded-lg text-lg px-2 py-1 outline-green-600 focus:ring-2 focus:ring-green-200 hover:ring-green-200"/>}
                            </div>
                        </div>
                        <div className="flex h-18 bg-gray-100 gap-4 items-center p-3">
                            <div className="flex items-center justify-center w-12 h-full rounded-xl bg-green-200">
                                <Phone className="w-6 h-6 text-[#0f6f5a]" />
                            </div>
                            <div className="w-full space-y-2 py-2">
                                <h1 className="font-bold opacity-80">Phone Number</h1>
                                {edit && <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} className="bg-white w-[80%] outline-1 rounded-lg text-lg px-2 py-1 outline-green-600 focus:ring-2 focus:ring-green-200 hover:ring-green-200"/>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pl-5 shadow-lg rounded-lg h-full">
                    <TwilloGuide/>
                </div>
            </div>
        </div>
    )
}

export default Profile;