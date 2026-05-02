import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Banknote, Award, Calendar } from "lucide-react";

const monthsArray = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

function PreviousMonthCard() {
    const [month, setMonth] = useState(monthsArray[(new Date().getMonth() - 1 + 12) % 12]);
    const [previousMonthData, setPreviousMonthData] = useState({});

    const getPreviousMonthData = async (e) => {
        try {
            const month2 = e || new Date().getMonth() - 1;
            // console.log(month2);
            const year = new Date().getFullYear();

            const res = await api.get(`/expense/monthlyExpense?month=${month2}&year=${year}`);
            setPreviousMonthData(res.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleChange = async (e) => {
        setMonth(e.target.value);
        getPreviousMonthData(e.target.selectedIndex);
    };

    useEffect(() => {
        getPreviousMonthData();
    }, []);

    return (
        <div className="bg-gray-100 w-full rounded-2xl px-5 pt-8 pb-20 mb-20">
            <div className="w-full flex justify-between items-center">
                <div className="text-left">
                    <h1 className="text-xl font-bold text-gray-950">Previous Months Summary</h1>
                    <p className="text-sm text-gray-500">Review your historic spending pattern</p>
                </div>
                <form className="w-fit px-5 py-2 border rounded-4xl bg-white cursor-pointer">
                    <select
                        value={month}
                        onChange={handleChange}
                        className="outline-none cursor-pointer bg-transparent"
                    >
                        {monthsArray.map((item, index) => (
                            <option key={index} value={item}>
                                {item} {new Date().getFullYear()}
                            </option>
                        ))}
                    </select>
                </form>
            </div>

            <div className="pt-7 flex gap-10 h-full justify-center max-md:flex-col">

                {/* Total spend previous month */}
                <div className="w-[30%] shadow-2xl px-2 py-5 rounded-lg h-full max-md:w-full">
                    <div className="w-full flex gap-2 justify-center items-center">
                        <Banknote color="#00c951" size={36} />
                        <h1 className="text-xl font-bold text-green-500">
                            Total Spending
                        </h1>
                    </div>

                    <p className="text-sm text-gray-500 pt-2">
                        Your total spending in {month}
                    </p>

                    <h1 className="text-2xl font-bold pt-3 w-full">
                        ₹{previousMonthData?.total || 0}
                    </h1>
                </div>

                {/* Top category */}
                <div className="w-[30%] shadow-2xl px-2 py-5 rounded-lg h-full max-md:w-full">
                    <div className="w-full flex gap-2 items-center justify-center">
                        <Award fill="#ffdf0d" color="#ffdf0d" size={38} />
                        <h1 className="text-xl font-bold text-amber-500">Top Category</h1>
                    </div>


                    <p className="text-sm text-gray-500 pt-2">
                        ₹{previousMonthData?.topCategory?.amount || 0} {month} month on
                    </p>

                    <h1 className="text-2xl font-bold pt-3 ">
                        {previousMonthData?.topCategory?.name?.charAt(0).toUpperCase() + previousMonthData?.topCategory?.name?.slice(1) || "No data"}
                    </h1>
                </div>

                {/* average daily spending */}
                <div className="w-[30%] shadow-2xl px-2 py-5 rounded-lg h-full max-md:w-full">
                    <div className="w-full flex gap-2 justify-center items-center">
                        <Calendar color="#4f46e5" size={36} />
                        <h1 className="text-xl font-bold text-indigo-600">
                            Daily Average
                        </h1>
                    </div>

                    <p className="text-sm text-gray-500 pt-2">
                        Your average spending per day
                    </p>

                    <h1 className="text-2xl font-bold pt-3 w-full">
                        ₹{previousMonthData?.dailyAverage || 0}
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default PreviousMonthCard