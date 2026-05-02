import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, DotIcon, SendHorizonal, Sparkles } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import BoatUserCard from "../components/BotUserCard";
import api from "../services/api"

function AddExpense() {
    const [message, setMessage] = useState("");
    const [send, setSend] = useState([]);
    const [error, setError] = useState(null);
    const bottomRef = useRef(null)
    const suggestions = ["Dinner for ₹45", "Kurkure for ₹5", "Netflix sub ₹499"];

    const Navigate = useNavigate();

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSend = async (e) => {
        e.preventDefault();
        const index = send.length;

        // this for laoding **
        setSend([...send, {
            original: message,
            parsed: null,
            loading: true,
        }]);

        try {
            const res = await api.post("/expense/parseexpense", { message });
            const parsedData = res.data;
            // ** for loading
            setSend((prev) => {
                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    parsed: parsedData,
                    loading: false
                }

                return updated;
            });
            console.log(parsedData);
            setMessage("");
        }
        catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "Something went wrong");
            // ** for loading
            setSend((prev) => {
                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    loading: false
                }
                return updated;
            });
            setMessage("");
        }
    }

    useEffect(() => {
        bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }, [send]);

    return (
        <div className="w-full h-screen bg-radial-[at_77%_20%] from-green-100 to-gray-50 to-50% flex flex-col ">
            {/* NavBar */}
            <div className="top-0 w-full sticky h-[15%] shadow-xs z-10 flex items-center justify-between p-7 max-md:py-3 max-md:h-[9%]">
                <div className="flex items-center gap-5">
                    <ArrowLeft onClick={() => Navigate(-1)} className="cursor-pointer max-md:hidden"/>
                    <div>
                        <h1 className="font-bold">Add Expense</h1>
                        <p className="text-sm opacity-70">Spend Wise AI</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Sparkles fill="#0f6f5a" color="#0f6f5a" />
                    <h1 className="text-[#026e4a]">AI Mode Active</h1>
                </div>
            </div>

            <div className="h-[85%] w-full flex flex-col justify-end">
                {/* All chats */}
                <div className="h-full pl-[15%] pr-[15%] pb-[2%] mb-[14%] space-y-1 overflow-y-auto snap-y snap-mandatory max-md:pl-[5%] max-md:pr-[5%] max-md:pb-35">
                    {send.map((item, index) => (
                        <BoatUserCard
                            key={index}
                            message={item?.original}
                            parsed={item?.parsed}
                            loading={item?.loading}
                            error={error}
                        />
                    ))}
                    <div ref={bottomRef}></div>
                </div>

                {/* Expenses Input */}
                <div className=" fixed flex flex-col bottom-0 h-[30%] shadow-2xl/300 w-full items-center justify-center gap-5 bg-white z-50 max-md:gap-8 max-md:h-[25%]">
                    <form
                        onSubmit={handleSend}
                        className="flex items-center w-[50%] h-[30%] inset-shadow-2xs bg-gray-200 px-5 py-7 rounded-2xl max-md:w-[90%] max-md:h-[25%]"
                    >
                        <input
                            name="message"
                            id="message"
                            type="text"
                            value={message}
                            onChange={handleChange}
                            placeholder="Type your Expenses here..."
                            className="w-full h-10 text-lg outline-0"
                        />
                        <button
                            type="submit"
                            className="flex items-center justify-center w-9 h-9 rounded-xl cursor-pointer bg-black active:bg-gray-950 "
                        >
                            <SendHorizonal color="black" fill="white" />
                        </button>
                    </form>

                    {/* Suggestions */}
                    <div className="flex w-full justify-center gap-4 opacity-70 max-md:gap-2">
                        {suggestions.map((it, index) => (

                            <div key={index} className="border rounded-2xl py-1 px-3 cursor-alias hover:bg-gray-100" onClick={() => (setMessage(it))}>
                                <h1>{it}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddExpense;