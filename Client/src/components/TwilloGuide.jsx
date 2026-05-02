import { CheckCircle, CircleArrowOutUpRightIcon, Copy, MessageCircle } from "lucide-react";
import React, { useState } from "react";

function TwilloGuide() {
    const [copy, setCopy] = useState("");
    const suggestions = ["Dinner for ₹45", "Kurkure for ₹5", "Netflix sub ₹499", "Spent ₹25 on lunch at McDonald's", "Groceries ₹120 at Walmart"];
    const phone = "+1 415 523 8886";
    const message = "Start tracking my Expenses";
    const url = `https://wa.me/${phone.replace(/\D/g, "")}?text=${message}`;

    const handleCopy = async(text, item) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopy(item);
            setTimeout(() => setCopy(""), 2000);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="bg-white py-5 space-y-10">
            <div className="flex gap-4 h-10 items-center">
                <div className="flex items-center justify-center w-10 h-full rounded-xl bg-linear-to-r from-green-600 via-green-500 to-green-400 shadow-2xl">
                    <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                    <h1 className="text-xl font-bold">WhatsApp Integration Guide</h1>
                    <p className="opacity-90">Connect your whatsapp for expense tracking</p>
                </div>
            </div>

            <ol className="text-left px-3 space-y-4">
                <li className="flex gap-4 items-center border border-green-300 p-3 rounded-lg justify-between max-md:flex-col max-md:items-start">
                    <div className="flex gap-4 items-center">
                    <div className="text-2xl text-white h-9 w-9 rounded-full bg-[#0f6f5a] flex items-center justify-center">1</div>
                    <div>
                        <h1 className="text-xl font-semibold">Send Join Message</h1>
                        <p className="opacity-90">copy and send this code from your whatsapp</p>
                    </div>
                    </div>
                    <div className="flex gap-3 items-center max-md:pl-[8%]">
                        <h1 className="inset-shadow-2xs text-lg bg-amber-100 rounded-lg p-2">{message}</h1>
                        {copy == "message" 
                            ?<CheckCircle color="green"/>
                            :<Copy className="cursor-pointer" onClick={() => handleCopy(message, "message")}/>
                        }
                    </div>
                </li>
                
                <li className="flex items-center border border-green-300 p-3 rounded-lg justify-between max-md:flex-col max-md:items-start max-md:gap-4">
                    <div className="flex gap-4 items-center">
                        <div className="text-2xl text-white h-9 w-9 rounded-full bg-[#0f6f5a] flex items-center justify-center">2</div>
                        <div>
                            <h1 className="text-xl font-semibold">WhatsApp Number</h1>
                            <p className="opacity-90">Send the message to this number</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center max-md:pl-[8%]">
                        <h1 className="inset-shadow-2xs text-lg bg-amber-100 rounded-lg p-2">{phone}</h1>
                        {copy == "phone" 
                            ?<CheckCircle color="green"/>
                            :<Copy className="cursor-pointer" onClick={() => handleCopy(phone, "phone")}/>
                        }
                        <a
                            className="hover:text-green-700 text-green-600" 
                            href={url}
                        >
                            <CircleArrowOutUpRightIcon/>
                        </a>
                    </div>
                </li>
                        
                {/* suggestions */}
                <li className=" border border-green-300 p-3 rounded-lg space-y-3 max-md:flex-col max-md:gap-4">
                    <div className=" flex gap-4 items-center">
                        <div className="text-2xl text-white h-9 w-9 rounded-full bg-[#0f6f5a] flex items-center justify-center">3</div>
                        <div>
                            <h1 className="text-xl font-semibold">Start Tracking</h1>
                            <p className="opacity-90">Send expense messages like these examples</p>
                        </div>
                    </div>
                    <div className="flex w-full justify-center gap-4 opacity-70 max-md:hidden">
                        {suggestions.map((it, index) =>(

                            <div key={index} className="border border-green-200 rounded-2xl py-1 px-3 bg-amber-100">
                                <h1>{it}</h1>
                            </div>
                        ))}
                    </div>
                    <div className="flex w-full justify-center gap-4 opacity-70 md:hidden">
                        {suggestions.slice(0, 3).map((it, index) =>(

                            <div key={index} className="border border-green-200 rounded-2xl py-1 px-3 bg-amber-100">
                                <h1>{it}</h1>
                            </div>
                        ))}
                    </div>
                </li>
            </ol>
        </div>
    )
}

export default TwilloGuide;