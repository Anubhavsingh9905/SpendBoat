import { PieChartIcon } from "lucide-react";
import React, { useMemo } from "react";
import { Cell, PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";
import { useAuth } from "../context/AuthContext";
// import svg from '../assets/react.svg'

const colors = ["#072b3a", "#006057", "#065F46", "#10B981", "#34D399", "#6EE7B7", "#b0c7eb"];
// const colors = [" #3B82F6"," #10B981"," #F59E0B"," #EF4444"," #8B5CF6"," #EC4899"," #6B7280"]
function CategorySpent({ totalSpent }) {
    const { expenses } = useAuth();

    const data = useMemo(() => {
        const map = new Map();
        for (const expense of expenses) {
            const category = expense.category;
            const spend = expense.amount;

            if (map.has(category)) {
                map.set(category, map.get(category) + spend);
            }
            else {
                map.set(category, spend);
            }
        }

        let d2 = [];
        for (const [category, spend] of map) {
            d2.push({ category: category, spend: spend });
        }
        return d2
    }, [expenses]);

    const format = (value) => {
        return [`Spent: ₹${value}`]
    }

    return (
        <div className=" w-[60%] shadow-2xl rounded-lg p-6 min-h-90 max-md:w-full">
            <div className="text-left pb-4">
                <p className="text-md opacity-80">Total Monthly Spending</p>
                <h1 className="text-6xl font-bold text-gray-900">₹ {totalSpent}</h1>
            </div>

            <hr className="pb-4" />
            <div className="pt-2">
                {/* <img src={svg} alt="" className="m-auto size-60 pb-3 mix-blend-color-burn" /> */}
                <div className="text-lg pb-2 mt-1 m-auto text-center flex items-center gap-2">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-[#072b3a] to-[#0f6f5a]">
                        <PieChartIcon className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="font-medium">Spending by Category</h1>
                </div>

                {/* show category only if something added by user */}
                {expenses.length == 0 ? 
                    <div className=" pt-[20%] flex-col items-center justify-center gap-2">
                        <div className="flex items-center justify-center gap-2">
                            <PieChartIcon color="gray" size={32}/>
                            <h1 className="text-gray-500 font-semibold text-2xl"> Nothing to show</h1>
                        </div>
                        <p className="text-gray-500 pl-4">Add somthing to see category</p>
                    </div> 
                    :
                    <div className="h-full w-full">
                        <PieChart style={{ width: '100%', maxHeight: '60vh', aspectRatio: 1 }} responsive>
                            <Pie
                                cx="50%"
                                cy="50%"
                                data={data}
                                labelLine={false}
                                label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                                fill="#8884d8"
                                dataKey="spend"
                            >
                                {data.map((entry, index) => {
                                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                })}
                            </Pie>
                            <Tooltip formatter={(value) => format(value)} />
                        </PieChart>
                    </div>
                }
            </div>
        </div>
    )
}

export default CategorySpent;