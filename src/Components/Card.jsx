/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaLock, FaArchive } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import hdfcimg from "../assets/image 1.png";
import masterimg from "../assets/image 3.png";

const Card = ({ card, onLock, onArchive, onSetDefault, onGPay }) => {
  const [showNumber, setShowNumber] = useState(false);

  return (
    <div>
      <div className="mt-10">
        <span className="font-semibold text-blue-500 text-xl border-b border-b-blue-500 w-[90%]">
          {card.cardType} Cards
        </span>
      </div>
      <div className="w-full flex justify-center pr-[175px]">
        <button
          className="bg-[#0FA1DB30] w-fit text-sm flex items-center p-1 rounded-sm gap-2 mt-5 cursor-pointer"
          onClick={() => setShowNumber(!showNumber)}
        >
          {showNumber ? <IoMdEyeOff /> : <IoMdEye />}{" "}
          {showNumber ? "Hide" : "Show"} Card Number
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-6">
        <div
          className={`bg-[#0C3F62] px-6 py-4 rounded-md w-96 relative flex flex-col text-white shadow-md 
          ${card.locked ? "bg-[#6A94A5]" : ""} ${
            card.isDefault ? "bg-[#18A2D9]" : ""
          } ${card.isGPay ? "bg-[#4088F0]" : ""} ${
            card.archived ? "bg-[#6A94A5]" : ""
          } `}
        >
          {card.locked && (
            <div className="absolute top-2 left-2 text-xl text-white  transition-opacity duration-500 ease-in-out opacity-100">
              <FaLock />
            </div>
          )}

          {card.archived && (
            <div className="absolute top-2 left-2 text-xl text-white transition-opacity duration-500 ease-in-out opacity-100">
              <FaArchive />
            </div>
          )}

          {card.isGPay && (
            <div className="absolute top-2 left-2 text-xl text-white transition-opacity duration-500 ease-in-out opacity-100">
              <FcGoogle />
            </div>
          )}

          {card.isDefault && (
            <div className="absolute top-2 left-2 text-xl text-white transition-opacity duration-500 ease-in-out opacity-100">
              ✓    
            </div>
          )}
          <img
            src={hdfcimg}
            alt="HDFC Bank"
            className="object-contain absolute right-4 w-[100px]"
          />
          <div className="flex justify-between flex-col mt-20">
            <span className="font-semibold text-xl">{card.name}</span>
            <p className="text-xl tracking-widest mt-4">
              {showNumber
                ? card.cardNumber
                : "•••• •••• •••• " + card.cardNumber.slice(-4)}
            </p>
            <div className="flex justify-start gap-8 text-sm mt-2">
              <span>Valid Till: {card.validTill}</span>
              <span>CVV: {showNumber ? card.cvv : "•••"}</span>
            </div>
          </div>
          <div className="absolute bottom-4 right-4">
            <img src={masterimg} alt="Mastercard" className="w-[70px]" />
          </div>
        </div>

        <div className="bg-[#C2E2EC] p-4 rounded-md w-[200px] grid grid-cols-2 grid-rows-2 items-center w-xs h-fit gap-4">
          <div className="flex flex-col items-center gap-2 text-blue-500">
            <span
              className={`text-white w-[34px] h-[34px] rounded-full flex justify-center items-center cursor-pointer ${
                card.locked ? "bg-[#0C3F62]" : "bg-[#0FA1DB]"
              }`}
              onClick={() => onLock(card.id)}
            >
              <FaLock />
            </span>
            Lock Card
          </div>

          <div className="flex flex-col items-center gap-2 text-blue-500">
            <span
              className={`text-white w-[34px] h-[34px] rounded-full flex justify-center items-center cursor-pointer ${
                card.archived ? "bg-[#0C3F62]" : "bg-[#0FA1DB]"
              }`}
              onClick={() => onArchive(card.id)}
            >
              <FaArchive />
            </span>
            Archive
          </div>

          <div className="flex flex-col items-center gap-2 text-blue-500">
            <span
              className={` text-white w-[34px] h-[34px] rounded-full flex justify-center items-center cursor-pointer ${
                card.isDefault ? "bg-[#0C3F62]" : "bg-[#0FA1DB]"
              }`}
              onClick={() => onSetDefault(card.id, card.cardType)}
            >
              ✓
            </span>
            {card.isDefault ? "Default" : "Set As Default"}
          </div>

          <div className="flex flex-col items-center gap-2 text-blue-500">
            <span
              className={`text-white w-[34px] h-[34px] rounded-full flex justify-center items-center cursor-pointer ${
                card.isGPay ? "bg-[#0C3F62]" : "bg-[#0FA1DB]"
              }`}
              onClick={() => onGPay(card.id)}
            >
              <FcGoogle />
            </span>
            Add to GPay
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
