import React, { useRef, useState, useEffect } from "react";
import api from "../services/api"
import { useAuth } from "../context/AuthContext";

function MonthlyLimit({ totalSpent }) {
    const [edit, setEdit] = useState(false);
    

    const {user} = useAuth();
    const budget = user?.budget;

    const [limit, setLimit] = useState(budget || "");
    // console.log(limit);

    const inputref = useRef(null);
    let spentPercent = limit ? Math.min((totalSpent / limit) * 100, 100) : 0;

    const handleClick = async () => {
        if (edit) {
            try {
                spentPercent = (totalSpent / limit) * 100;
                await api.post("/expense/setLimit", { budget: limit });
            }
            catch (error) {
                console.log(false);
                return;
            }
        }
        setEdit(!edit);
    }

    const handleChange = (e) => {
        // console.log(e.target.value);
        setLimit(e.target.value)
    }

    useEffect(() => {
        if (budget) {
            setLimit(budget);
        }
    }, [budget]);

    useEffect(() => {
        if (edit && inputref.current) {
            inputref.current.focus();
        }
    }, [edit])

    return (
        <div className="w-full shadow-2xl p-6 rounded-lg h-full">
            <div className="flex justify-between items-center">
                <div className="text-left">
                    <h1 className="font-bold opacity-70">Monthly Limit</h1>
                    <div className="flex gap-1 items-center">
                        <h1 className="font-bold text-3xl">₹</h1>
                        <input
                            ref={inputref}
                            disabled={!edit}
                            onChange={handleChange}
                            value={limit | 0}
                            type="number"
                            placeholder="click on button to edit limit"
                            className="font-bold text-3xl w-[80%] outline-0 rounded-lg p-1 focus:ring-1"
                        />
                    </div>
                </div>

                <button
                    onClick={handleClick}
                    className="text-white cursor-pointer bg-gray-900 rounded-2xl px-3 py-1 h-full font-bold w-[40%] active:bg-gray-800"
                >
                    {edit ? "Save Limit" : "Extend Limit"}
                </button>
            </div>

            <div className="pt-7">
                <div className="flex justify-between">
                    <h1 className=" opacity-65">Cureently Allocated</h1>
                    <h1 
                        className="font-medium" 
                        style={{color:spentPercent < 90 ? "#00a873" : "red"}}
                    >
                        ₹{totalSpent} ({Math.floor(spentPercent)}%)
                    </h1>
                </div>
                <div className="bg-[#4edea3] w-full rounded-full h-4 mt-4">
                    <div className="rounded-full h-full transition-all duration-700 ease-in" style={{ width: `${spentPercent}%` , backgroundColor:spentPercent < 90 ? "#006c49" : "red"}}>

                    </div>
                    {/* <p className="text-[#6cfed0]">{0}%</p> */}
                </div>
            </div>
        </div>
    )
}

export default MonthlyLimit;