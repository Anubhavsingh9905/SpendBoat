import React, { useEffect, useState, useMemo } from "react";;
import { Award, Calendar, RefreshCw, Sparkles } from "lucide-react";
import CategorySpent from "../components/CategoryBox";
import RecentActivity from "../components/RecentActivity";
import MonthlyLimit from "../components/MonthlyLimit";
import DailySpending from "../components/DailySpending";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import PreviousMonthCard from "../components/PreviousMonthCard";


function Dashboard() {
    const [refresh, setRefresh] = useState(false)
    const currentDate = new Date();

    const { user, expenses, getExpenses} = useAuth();
    // console.log(user);
    const userName = user?.name;

    const handleRefresh = async () => {
        setRefresh(true);
        setTimeout(async () => {

            try {
                getExpenses();
            }
            catch (error) {
                console.error(error, "failed to fetch");
            }
            finally {
                setRefresh(false);
            }
        }, 1000)
    }

    // calculate total spend in a month
    const totalSpent = useMemo(() => {

        return expenses.reduce((sum, expenses) => sum + expenses.amount, 0);
    }, [expenses]);

    const avgDailySpending = useMemo(() => {
        if (!expenses.length) return 0;

        const total = totalSpent;

        // Get current month days passed
        const today = new Date();
        const daysPassed = today.getDate();

        return (total / daysPassed).toFixed(2);
    }, [expenses]);

    const topCategory = useMemo(() => {
        const map = {};

        expenses.forEach((exp) => {
            map[exp.category] = (map[exp.category] || 0) + exp.amount;
        });

        let max = 0;
        let category = "";

        for (let key in map) {
            if (map[key] > max) {
                max = map[key];
                category = key;
            }
        }

        return { name: category, amount: max };
    }, [expenses]);

    return (

        <div className="w-full h-full">
            <div className="w-full h-30">
                <NavBar />
            </div>
            <div className="w-full h-full pb-6 px-6 flex flex-col gap-4">
                <div className="w-full flex justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 text-left max-md:text-2xl">
                            Welcome Back {userName?.charAt(0).toUpperCase() + userName?.split(' ')[0].slice(2)} !
                        </h1>
                        <div className="flex font-medium opacity-70 pt-3">
                            <div className="pl-1 pr-2"><Calendar /></div>
                            <h1>{currentDate.toDateString()}</h1>
                        </div>
                    </div>

                    <button
                        onClick={handleRefresh}
                        disabled={refresh}
                        className={`shadow-xl rounded-2xl flex border-2 border-green-400 items-center justify-center gap-4 px-4 w-fit h-15 ${refresh ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        <h1 className="text-lg font-semibold text-[#0f6f5a]">Refresh</h1>
                        <RefreshCw
                            color="#0f6f5a"
                            className={`h-6 w-6 ${refresh ? "animate-spin" : ""}`}
                        />
                    </button>
                </div>

                <div className="w-full shadow-xl rounded-lg bg-white flex justify-between h-20 p-5 mt-4 items-center">
                    <div className="w-[87%] h-full flex items-center gap-4 max-md:justify-between max-md:w-[50%]">
                        <Sparkles fill="#0f6f5a" color="#0f6f5a" />
                        <input
                            type="text"
                            className="w-full h-full text-xl outline-0 max-md:hidden"
                            placeholder="Add Expenses: 'Dinner ₹150 at resturant yesterday' "
                        />
                    </div>
                    <a
                        href="/addexpenses"
                        className="text-white bg-gray-900 rounded-3xl w-fit px-3 py-1 h-full font-bold flex items-center justify-center max-md:text-sm max-md:w-[30%]"
                    >
                        Quick Add
                    </a>
                </div>

                <div className="mt-[3%] pb-15">
                    <div className="h-full flex gap-10 max-md:flex-col">    
                        <CategorySpent totalSpent={totalSpent} />
                        <RecentActivity />
                    </div>

                    <div className="pt-7 flex gap-10 h-full max-md:flex-col">
                        <DailySpending />
                        <div className="w-[40%] h-full space-y-10 max-md:w-full">
                            <div className="w-full h-full flex gap-2">
                                <div className="w-[50%] shadow-2xl px-2 py-5 rounded-lg">
                                    <div className="w-full flex gap-2 items-center justify-center">
                                        <Award fill="#ffdf0d" color="#ffdf0d" size={38} />
                                        <h1 className="text-xl font-bold text-amber-500 max-md:text-lg">Top Category</h1>
                                    </div>


                                    <p className="text-sm text-gray-500 pt-2 max-md:pt-1">
                                        ₹{topCategory?.amount} this month on
                                    </p>

                                    <h1 className="text-2xl font-bold pt-3 ">
                                        {topCategory?.name?.charAt(0).toUpperCase() + topCategory?.name?.slice(1) || "No data"}
                                    </h1>
                                </div>

                                <div className="w-[50%] shadow-2xl px-2 py-5 rounded-lg h-full ">
                                    <div className="w-full flex gap-2 justify-center items-center">
                                        <Calendar color="#4f46e5" size={36} />
                                        <h1 className="text-xl font-bold text-indigo-600 max-md:text-lg">
                                            Daily Average
                                        </h1>
                                    </div>

                                    <p className="text-sm text-gray-500 pt-2 max-md:text-xs">
                                        Your average spending per day
                                    </p>

                                    <h1 className="text-2xl font-bold pt-3 w-full">
                                        ₹{avgDailySpending}
                                    </h1>
                                </div>
                            </div>

                            <MonthlyLimit totalSpent={totalSpent} />
                        </div>
                    </div>
                </div>

                {/* Previous Months summary */}
                <div className="w-full">

                    <PreviousMonthCard />
                </div>
            </div>
        </div>
    )
}

export default Dashboard