import React, { useMemo } from "react";
import { CarFront, DotIcon, LucideHistory, TagIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function RecentActivity() {
    const { expenses } = useAuth();

    const Activity = useMemo(() => {
        // console.log(expenses);

        let d2 = [];
        for (let i = 0; i < Math.min(6, expenses?.length); i++) {
            const spend = expenses[i].amount;
            const note = expenses[i].note;
            let category = expenses[i].category;
            category = category.charAt(0).toUpperCase() + category.slice(1);

            const date = new Date(expenses[i].date);
            const useDate = date.toLocaleDateString("en-gb", {
                month: "short",
                day: "2-digit",
                timeZone: "UTC"
            });

            const time = new Date(expenses[i].date).toLocaleTimeString("en-US", {
                timeZone: "UTC",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            });


            // d2.push({spend:`Spend ₹${spend} on ${category}`, date: useDate});
            d2.push({ note: note, category: category, spend: spend, date: useDate, time: time });
        }

        return d2;
    }, [expenses]);

    return (
        <div className="w-[40%] shadow-2xl pt-4 px-6 pb-6 rounded-lg h-143 max-md:w-full">
            <div className="h-[10%] flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-[#072b3a] to-[#0f6f5a]">
                        <LucideHistory className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="font-semibold text-xl">Recent Activity</h1>
                </div>

                {/* See the full History */}
                <a href="/history" className="text-[#138e74] text-lg">view all</a>
            </div>

            {/* show category only if something added by user */}
            {expenses.length == 0 ? 
                <div className=" pt-[50%] flex-col items-center justify-center gap-2">
                    <div className="flex items-center justify-center gap-2">
                        <LucideHistory color="gray" size={32}/>
                        <h1 className="text-gray-500 font-semibold text-2xl"> Nothing to show</h1>
                    </div>
                    <p className="text-gray-500 pl-4">Add somthing to see History</p>
                </div>
                :
                <div className="pt-1 h-[90%] space-y-4 overflow-y-auto snap-y snap-mandatory">
                    {Activity.map((item, index) => (

                        <div key={index} className="bg-gray-100 rounded-lg border border-gray-200 flex items-center gap-3 p-2 ">
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-300">
                                <LucideHistory className="text-gray-800" />
                            </div>
                            <div className="text-gray-800 text-left w-full flex justify-between items-center">
                                <div className="text-left">

                                    {/* Category */}
                                    <h1 className="text-lg font-semibold">{item.note}</h1>

                                    {/* Date and time */}
                                    <div className="flex items-center gap-4 ">
                                        <div className="flex text-sm gap-1 items-center opacity-95">
                                            <TagIcon size={14} />
                                            <p>{item.category}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <p className="text-sm opacity-85">{item.date}</p>
                                            <DotIcon size={18} className="opacity-95 font-extrabold" />
                                            <p className="text-sm opacity-90">{item.time}</p>
                                        </div>
                                    </div>

                                </div>

                                <h1 className="text-lg font-semibold">-₹{item.spend}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default RecentActivity;