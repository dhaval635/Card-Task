import { useState } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { FiHome, FiCreditCard, FiSettings, FiLogOut } from "react-icons/fi";
import { IoMdArrowForward } from "react-icons/io";
import logo from "../assets/logo.png";
const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Cards");

  const sidebarItems = [
    { name: "Home", icon: <FiHome />, key: "Home" },
    { name: "Cards", icon: <FiCreditCard />, key: "Cards" },
    { name: "Transactions", icon: <FaMoneyBill />, key: "Transactions" },
    { name: "Settings", icon: <FiSettings />, key: "Settings" },
  ];

  return (
    <aside className="w-[440px] bg-blue-900 text-white p-6 min-h-screen flex flex-col justify-between items-center">
      <div>
        <div className="mb-6">
          <div>
            <img src={logo} className="w-[220px]  mt-10 mb-4" />
          </div>
          <p className="text-sm text-gray-300 mt-3 text-center">
            Software & Web Development Company - Umbraco Gold Partner
          </p>
        </div>
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <div
              key={item.key}
              onClick={() => setActiveItem(item.key)}
              className={`flex flex-col items-start justify-between px-4 py-2 rounded-md cursor-pointer transition-all 
            `}
            >
              <div
                className={`flex items-center justify-start space-x-2 ${
                  activeItem === item.key ? "text-blue-300" : "text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
                {activeItem === item.key && (
                  <IoMdArrowForward className="text-blue-300" />
                )}
              </div>
              <div className="w-full h-[1px] bg-gray-400 mt-1" />
            </div>
          ))}
        </nav>
      </div>
      <button className="mt-10 flex items-center space-x-2 text-red-400 bottom-0 ">
        <FiLogOut /> <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
