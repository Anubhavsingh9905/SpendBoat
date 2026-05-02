import React, { useEffect, useState } from "react";
import { BadgeCheck, Calendar, DotIcon } from "lucide-react";
import api from "../services/api";

function BoatUserCard({ message, parsed, loading, error }) {
    const [amount, setAmount] = useState(parsed?.amount || "");
    const [category, setCategory] = useState(parsed?.category || "");
    const [note, setNote] = useState(parsed?.note || "");
    const [date, setDate] = useState(new Date(parsed?.date) || "");
    // confirm the expense
    const [confirm, setConfirm] = useState(null);

    // on changing parsed data set all things
    useEffect(() => {
        if (parsed) {
            setAmount(parsed.amount);
            setCategory(parsed.category);
            setNote(parsed.note);
            setDate(parsed.date == "unknown" ? new Date() : new Date(parsed.date));
        }
    }, [parsed]);

    const useDate = date.toLocaleDateString("en-gb", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        timeZone: "UTC"
    });

    // Adding expense to database
    const handleClick = async (confirm) => {
        if (confirm) {
            try {
                await api.post("/expense/addexpenses", {
                    note,
                    category,
                    amount,
                    date
                })
                setConfirm(true);
            } catch (error) {
                console.log(error);
                setConfirm(false);
            }
        }
        else {
            setConfirm(false);
        }
    }

    return (
        <div>
            {message.length == 0 ? null :
                <div>

                    {/* your message */}
                    <div className="ml-auto w-fit">
                        <h1 className="text-sm opacity-70 text-right">you</h1>
                        <div className="bg-gray-950 px-5 py-4 rounded-l-2xl rounded-b-2xl">
                            <p className="text-white">{message}</p>
                        </div>
                    </div>

                    {/* Boat reply*/}
                    <div className="w-[60%] mr-auto max-md:w-full">
                        <h1 className="text-sm opacity-70 text-left pl-2">SpendBoat</h1>

                        {/* if loading show loading otherwise show the boat reply */}
                        {loading ? (
                            <div className="bg-gray-200 px-5 py-4 rounded-2xl animate-pulse">
                                <p className="text-gray-600">Parsing your expense...</p>
                            </div>
                        ) : error ? (
                            <div className="flex text-lg font-semibold items-center text-red-500">
                                <DotIcon />
                                {error}
                            </div>
                        ) : (
                            <div className={`shadow-lg rounded-2xl w-full ${confirm === null ? "bg-white" : confirm ? "bg-green-100" : "bg-red-50"}`}>

                                {/* Transiction symbol */}
                                <div className="bg-[#d2fce9] flex justify-between px-3 py-5 rounded-t-2xl">
                                    <div className="flex gap-1 items-center">
                                        <BadgeCheck color="white" fill="#006b49" className="max-md:size-5" />
                                        <h1 className="text-[#006b49] font-bold">Transaction Confirmed</h1>
                                    </div>

                                    <h1 className="text-[#006b49] max-sm:hidden">Manual Edit Available</h1>
                                    <h1 className="text-[#006b49] max-sm:hidden">Edit Available</h1>
                                </div>

                                <div className="py-5 px-7 w-full">

                                    {/* Amount and category */}
                                    <div className="flex justify-between w-full">
                                        <div className="text-left w-[55%]">
                                            <h1 className="opacity-75 ">AMOUNT</h1>

                                            <div className="w-full flex">
                                                <h1 className="text-4xl font-bold">₹</h1>
                                                <input
                                                    type="number"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    className="outline-none text-4xl rounded-lg font-bold field-sizing-content min-w-[20%] max-w-full focus:inset-shadow-2xs focus:bg-gray-200 focus:ring-1"
                                                />
                                            </div>

                                        </div>

                                        <div className="text-right flex flex-col items-center justify-center w-[35%]">
                                            <h1 className="opacity-75 ">CATEGORY</h1>
                                            <input
                                                type="text"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="text-xl field-sizing-content min-w-[20%] max-w-full font-bold rounded-4xl p-2 bg-gray-200 text-[#016445]"
                                            />
                                        </div>
                                    </div>

                                    <hr className="my-5 opacity-20" />

                                    {/* date */}
                                    <div className="flex flex-col text-left gap-1">
                                        <h1 className="opacity-75 ">DATE</h1>

                                        <div className="text-xl font-bold flex gap-1 items-center">
                                            <Calendar size={20} />
                                            <h1>{useDate}</h1>
                                        </div>
                                    </div>

                                    {/* confirming or canceling expenses */}
                                    {confirm === null ?
                                        <>
                                            <button
                                                onClick={() => handleClick(true)}
                                                className="w-full mt-8 cursor-pointer bg-[#031b2f] text-white font-bold h-14 rounded-xl hover:bg-[#072b3a] active:bg-[#031b2f]"
                                            >
                                                Confirm Exepense
                                            </button>
                                            <button
                                                onClick={() => handleClick(false)}
                                                className="w-full mt-3 cursor-pointer bg-red-200 text-red-700 font-bold h-14 rounded-xl hover:bg-red-100 active:bg-red-200"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                        : confirm ?
                                            <div

                                                className="w-full mt-8 cursor-not-allowed flex items-center justify-center bg-[#016445] text-white font-bold h-14 rounded-xl hover:bg-[#00a16e]"
                                            >
                                                Exepense Confirmed
                                            </div>
                                            :
                                            <div

                                                className="w-full mt-8 cursor-not-allowed flex items-center justify-center bg-red-200 text-red-700 font-bold h-14 rounded-xl hover:bg-red-100"
                                            >
                                                Cancelled
                                            </div>
                                    }
                                </div>

                            </div>
                        )
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default BoatUserCard;