import React, { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LucideHistory, DotIcon, Search, ArrowDownWideNarrow, ArrowUpNarrowWide, CalendarSearch, TagIcon, X, Filter } from "lucide-react";
import NavBar from "../components/NavBar";


function History() {
    const [sort, setSort] = useState(null);
    const [filter, setFilter] = useState(false);
    const [filterMenu, setFilterMenu] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedCat, setSelectedCat] = useState("");
    const { expenses } = useAuth();

    let Activity = useMemo(() => {
        // console.log(expenses);
        let d2 = [];
        for (let i = 0; i < expenses?.length; i++) {
            const spend = expenses[i].amount;
            const note = expenses[i].note;
            const category = expenses[i].category;

            const date = new Date(expenses[i].date);
            const useDate = date.toLocaleDateString("en-gb", {
                month: "short",
                day: "2-digit",
                year: "numeric",
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

    const categories = useMemo(() => {
        const c = [];
        for (let i = 0; i < expenses?.length || 0; i++) {
            c.push(expenses[i].category);
        }

        return [...new Set(c)];
    }, [expenses])


    const handleChange = (e) => {
        const date = e.target.value
        const selectedDate1 = date ? new Date(e.target.value).toLocaleDateString("en-gb", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            timeZone: "UTC"
        }) : "";

        setSelectedDate(selectedDate1);
    }

    const handleSort = (cross) => {
        if (cross == true) setSort(null);
        else if (sort == null || sort == "dec") setSort("inc");
        else setSort("dec");

        console.log(sort);
    }

    const handleFilter = (x) => {
        setFilter(x);
        setFilterMenu(x);
        if(!x) setSelectedCat("");
    }

    const handleFilterData = (e) => {
        console.log(e.target.innerHTML)
        setSelectedCat(e.target.innerHTML);
        setFilterMenu(false);
    }


    return (
        <div className=" w-full min-h-screen">
            <NavBar />

            <div className="w-full shadow-2xl p-6 rounded-lg h-full ">
                <div className="flex justify-between items-center h-15 max-md:flex-col max-md:gap-3">
                    <div className="flex items-center gap-2 max-md:justify-start max-md:w-full">
                        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-[#072b3a] to-[#0f6f5a]">
                            <LucideHistory className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="font-semibold text-2xl">History</h1>
                    </div>

                    <div className="flex w-[90%] justify-end gap-5 h-10 items-center max-md:w-full max-md:gap-3 max-md:justify-start">
                        <div className="search-bar items-center flex rounded-lg gap-2 inset-shadow-2xs bg-gray-100 pl-2 pr-1 h-full">
                            <div className="flex">
                                <Search size={16} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search expenses..."
                                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                                className="w-full outline-0 opacity-90"
                            />
                        </div>

                        <div className="relative w-fit space-y-1">
                            <div className="bg-green-100 rounded-lg p-2 flex gap-1 items-center text-green-800 cursor-pointer hover:bg-green-50 active:bg-green-100">
                                {filter ? <X size={20} onClick={() => handleFilter(false)} /> : null}
                                <div
                                    className="flex items-center gap-1"
                                    onClick={() => handleFilter(true)}
                                >
                                    <Filter size={20} />
                                    <h1 className="text-sm font-semibold">{selectedCat ? selectedCat : "Category"}</h1>
                                </div>
                            </div>
                            {filterMenu &&
                                <div className="absolute top-full shadow-2xl rounded-2xl w-fit px-4 py-3 bg-green-100 border space-y-2 border-green-800">
                                    {categories.map((item, index) => (
                                        <div 
                                            key={index} 
                                            onClick={handleFilterData}
                                            className="text-green-800 text-left bg-white px-2 py-1 cursor-pointer rounded-2xl hover:bg-gray-100 hover:text-green-950 active:bg-white" 
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>

                        <div className="rounded-lg p-2 flex items-center h-full gap-1 bg-green-100 text-green-800 hover:bg-green-50 active:bg-green-100">
                            <input
                                onChange={handleChange}
                                type="date"
                                placeholder="Search by date"
                            />
                        </div>

                        <div className="bg-green-100 rounded-lg p-2 flex gap-1 items-center text-green-800 cursor-pointer hover:bg-green-50 active:bg-green-100">
                            {sort === "inc" || sort === "dec" ? <X size={20} onClick={() => handleSort(true)} /> : null}
                            <div
                                onClick={handleSort}
                                className="flex gap-1"
                            >
                                {sort === null || sort === "dec"
                                    ? <ArrowUpNarrowWide size={20} />
                                    : <ArrowDownWideNarrow size={20} />
                                }
                                <h1 className="text-sm font-semibold max-md:hidden">Expense</h1>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="pt-6 space-y-4 max-md:pt-15">
                    {Activity.filter((acitvity) =>
                        acitvity.date.includes(selectedDate) && acitvity.category.includes(selectedCat)
                    )
                        .map((item, index) => (

                            <div key={index} className="bg-gray-100 rounded-lg border border-gray-200 flex items-center gap-3 p-2">
                                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-300">
                                    <LucideHistory className="text-gray-800" />
                                </div>
                                <div className="text-gray-800 text-left w-full flex justify-between items-center">
                                    <div className="text-left">

                                        {/* Category */}
                                        <h1 className="text-lg font-semibold">{item.note}</h1>

                                        <div className="flex items-center gap-4 pt-1">
                                            <div className="flex text-sm gap-1 items-center opacity-95">
                                                <TagIcon size={14} />
                                                <p>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                                            </div>

                                            {/* Date and time */}
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
            </div>

        </div>
    )
}

export default History;