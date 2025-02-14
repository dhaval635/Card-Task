import { useEffect, useState } from "react";
import { FaMicrosoft, FaPlus } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import Card from "./Card";
import Transactions from "./Transition";
import Form from "./Form";
import { toast } from "react-toastify";

const Home = () => {
  const [show, setShow] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem("cards")) || [];
    setCards(storedCards);

    if (show) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [show]);

  const handleLock = (cardId) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, locked: !card.locked } : card
    );
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));

    const card = updatedCards.find((card) => card.id === cardId);
    if (card.locked) {
      toast.success("Card locked successfully.");
    } else {
      toast.success("Card unlocked successfully.");
    }
  };

  const handleArchive = (cardId) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, archived: !card.archived } : card
    );
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));

    const card = updatedCards.find((card) => card.id === cardId);
    if (card.archived) {
      toast.success("Card archived successfully.");
    } else {
      toast.success("Card unarchived successfully.");
    }
  };

  const handleSetDefault = (cardId, cardType) => {
    const existingDefaultCard = cards.find(
      (card) => card.cardType === cardType && card.isDefault
    );

    if (existingDefaultCard) {
      const updatedCards = cards.map((card) => {
        if (card.id === existingDefaultCard.id) {
          return {
            ...card,
            isDefault: false,
          };
        }
        if (card.id === cardId) {
          return {
            ...card,
            isDefault: true,
          };
        }
        return card;
      });

      setCards(updatedCards);
      localStorage.setItem("cards", JSON.stringify(updatedCards));
    } else {
      const updatedCards = cards.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            isDefault: true,
          };
        }
        return card;
      });
      setCards(updatedCards);
      localStorage.setItem("cards", JSON.stringify(updatedCards));
    }
  };

  const handleGPay = (cardId) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, isGPay: !card.isGPay } : card
    );
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));

    const card = updatedCards.find((card) => card.id === cardId);
    if (card.isGPay) {
      toast.success("Card add to Gpay successfully.");
    } else {
      toast.success("Card remove from Gpay successfully.");
    }
  };

  return (
    <>
      <div className="p-4 bg-gray-100 h-full">
        <div className="text-gray-500 text-sm mb-4">Home &gt; Cards</div>
        <div className="m-2 border-2 border-gray-400 p-3 rounded-sm h-full">
          <div className="bg-white p-4  flex gap-4 border-b-black border-solid justify-between">
            <div className="flex gap-2">
              <div className="border-b-2 border-blue-500 pb-2 text-blue-500 font-semibold cursor-pointer">
                Saved Cards
              </div>
              <div className="text-gray-500 cursor-pointer">GD Cards</div>
            </div>
            <div className=" flex justify-between items-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                onClick={() => setShow(true)}
              >
                <FaPlus /> Add Card
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-row justify-between items-start gap-6">
            <div className="flex flex-col max-w-sm justify-between w-full text-blue-400 max-w-lg mx-auto bg-white p-6 gap-[23px]">
              <div className="flex  flex-row justify-between "> 
                <div className="flex items-center gap-1">
                  <FaMicrosoft />
                  <h3>Card Details</h3>
                </div>
                <div className="bg-blue-200 text-blue-900 rounded-full p-1">
                  <FiChevronDown />
                </div>
              </div>
              <div>
                <Transactions />
              </div>
            </div>
            <div className="flex flex-col">
              {cards.map((card, index) => (
                <Card
                  key={index}
                  card={card}
                  onLock={handleLock}
                  onArchive={handleArchive}
                  onSetDefault={handleSetDefault}
                  onGPay={handleGPay}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Form show={show} onClose={() => setShow(false)} />
    </>
  );
};

export default Home;
