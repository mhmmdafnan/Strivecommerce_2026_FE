import {
  Utensils,
  Shirt,
  Scissors,
  Leaf,
  Wrench,
  Laptop,
  ShoppingCart,
  LayoutGrid,
} from "lucide-react";
import { useState } from "react";

const categories = [
  { id: 1, name: "Kuliner", icon: Utensils, color: "bg-red-100 text-red-600" },
  { id: 2, name: "Fashion", icon: Shirt, color: "bg-pink-100 text-pink-600" },
  {
    id: 3,
    name: "Kriya",
    icon: Scissors,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 4,
    name: "Agribisnis",
    icon: Leaf,
    color: "bg-green-100 text-green-600",
  },
  { id: 5, name: "Jasa", icon: Wrench, color: "bg-blue-100 text-blue-600" },
  { id: 6, name: "Digital", icon: Laptop, color: "bg-gray-100 text-gray-600" },
  {
    id: 7,
    name: "Perdagangan",
    icon: ShoppingCart,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 8,
    name: "Lainnya",
    icon: LayoutGrid,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function KategoriUMKM({ onSelectCategory }) {
  const [active, setActive] = useState(null);

  const handleClick = (id) => {
    setActive(id);
    onSelectCategory(id);
  };
  const handleClearFilter = () => {
    onSelectCategory(null);
    setActive(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">Kategori UMKM</h2>
        <button
          onClick={() => handleClearFilter()}
          className="text-sm text-gray-500 hover:underline"
        >
          Clear Filter
        </button>
      </div>

      <div className="flex space-x-4 overflow-x-auto scrollbar-hide py-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = active === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className={`flex-shrink-0 w-40 flex flex-col items-center p-4 bg-white rounded-2xl shadow-md cursor-pointer transition transform
                ${
                  isActive
                    ? "bg-gradient-to-l from-[#ed4c4c] to-[#990808] text-[#f4f2ef] scale-105"
                    : "hover:scale-105 hover:shadow-lg text-gray-800"
                }
              `}
            >
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-full mb-3 ${cat.color}`}
              >
                <Icon size={32} />
              </div>
              <p className="font-medium ">{cat.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
