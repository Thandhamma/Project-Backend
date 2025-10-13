import { useState } from 'react';

// ✍️ สร้าง Interface สำหรับ Props ที่ Component นี้จะรับ
interface FilterSidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

// 🎛️ Component สำหรับแถบ Filter ด้านข้าง
const FilterSidebar = ({ isCollapsed, onToggle }: FilterSidebarProps) => {
    // 💡 ในแอปจริง State ทั้งหมดนี้ควรถูกจัดการโดย Redux หรือ Form Library
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(5000);

    return (
        <aside className={`filter-sidebar bg-white text-black border border-gray-200 rounded-lg shadow-sm flex flex-col transition-all duration-300 ${isCollapsed ? 'w-0 p-0 border-0' : 'w-64 p-3'}`}>
            <div className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Filter</h3>
                    <button onClick={onToggle} className="p-1 rounded-full hover:bg-gray-100" aria-label="Close filter">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-auto pr-2">
                    {/* Search */}
                    <label className="block mb-4">
                        <span className="text-sm text-gray-700">Search</span>
                        <input type="search" placeholder="Product name..." className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pink-400 text-sm" />
                    </label>
                    {/* Category */}
                    <label className="block mb-4">
                        <span className="text-sm text-gray-700">Category</span>
                        <select className="mt-1 block w-full border rounded-md shadow-sm text-sm p-2 accent-pink-500 focus:ring-1 focus:ring-pink-400">
                            <option value="all">All</option>
                            <option value="plush">Plush</option>
                            <option value="cloths">Cloths</option>
                        </select>
                    </label>

                    {/* Price Range */}
                    <div className="mb-4">
                        <span className="text-sm text-gray-700">Price Range (THB)</span>
                        <div className="flex gap-2 mt-2">
                            <input type="number" value={priceMin} onChange={e => setPriceMin(Number(e.target.value))} className="w-full px-2 py-2 border rounded text-sm" />
                            <input type="number" value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} className="w-full px-2 py-2 border rounded text-sm" />
                        </div>
                    </div>
                    {/* ... Add other filters here ... */}
                </div>
            </div>
        </aside>
    );
}

export default FilterSidebar;
