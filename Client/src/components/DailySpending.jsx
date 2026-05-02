import React, {useMemo} from "react";
import { useAuth } from "../context/AuthContext";
import { LucideChartNoAxesColumnDecreasing, LucideChartColumnDecreasing } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function DailySpending() {
    const {expenses} = useAuth();

    const data = useMemo(() => {
        const map = new Map();
        for (const expense of expenses) {
            const spend = expense.amount;

            const date = new Date(expense.date);
            const useDate = date.toLocaleDateString("en-gb",{
                month:"short",
                day:"2-digit",
            });

            if (map.has(useDate)) {
                map.set(useDate, map.get(useDate) + spend);
            }
            else {
                map.set(useDate, spend);
            }
        }

        let d2 = [];
        for (const [date, spend] of map) {
            d2.push({ date: date, spend: spend });
        }
        return d2.sort().reverse();
    }, [expenses]);


    const format = (value) => {
        return [`Spent: ₹${value}`]
    }

    return (
        <div className="shadow-2xl w-[60%] rounded-lg p-6 min-h-80 max-md:w-full">
            <div className="flex">
                <div>

                </div>
                <div className="text-left flex gap-3 items-center">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-[#072b3a] to-[#0f6f5a]">
                        <LucideChartNoAxesColumnDecreasing className="w-6 h-6 text-white" />
                    </div>
                    <div className="">
                        <h1 className="text-xl text-gray-900 font-bold">Daily Spending Trend</h1>
                        <p className="opacity-80">Last 7 days</p>
                    </div>
                </div>
            </div>
            {/* show category only if something added by user */}
            {expenses.length == 0 ? 
                <div className=" pt-[20%] flex-col items-center justify-center gap-2">
                    <div className="flex items-center justify-center gap-2">
                        <LucideChartColumnDecreasing color="gray" size={32}/>
                        <h1 className="text-gray-500 font-semibold text-2xl"> Nothing to show</h1>
                    </div>
                    <p className="text-gray-500 pl-4">Add somthing to see Daily-Expense</p>
                </div>
                :
                <div className="pt-10 pr-4">
                    <BarChart

                        style={{ width: '100%', height: '100%', aspectRatio: '2.5' }}
                        responsive
                        data={data}
                    >
                        <XAxis dataKey="date" />
                        <YAxis dataKey="spend" />
                        <Bar dataKey="spend" fill="url(#colorGradient)" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#FFFBF5",
                                border: "1px solid #F7EFE5",
                                borderRadius: "12px",
                            }}
                            formatter={(value) => format(value)}
                        />
                        <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#059669" stopOpacity={1} />
                                <stop offset="95%" stopColor="#50ffb3" stopOpacity={0.6} />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </div>
            }
        </div>
    )
}

export default DailySpending;