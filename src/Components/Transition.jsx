import { FaMicrosoft } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

export default function Transactions() {
  const transactions = [
    {
      id: 1,
      title: "Ordered Food",
      date: "20th May 2022",
      details: "Charges applied on credit card",
      amount: -150.5,
    },
    {
      id: 2,
      title: "Ticket Refund",
      date: "20th May 2022",
      details: "Amount credited on debit card",
      amount: 50.5,
    },
    {
      id: 3,
      title: "Interest credited",
      date: "20th May 2022",
      details: "Charges applied on credit card",
      amount: 5.5,
    },
    {
      id: 4,
      title: "Electricity bill paid",
      date: "20th May 2022",
      details: "Charges applied on credit card",
      amount: -1050.5,
    },
  ];

  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1">
          <FaMicrosoft />
          <h3>Today&apos;s Transition</h3>
        </div>
        <button className="text-[#00B0FF]">
          <div className=" bg-blue-200 text-blue-900 rounded-full p-1">
            <FiChevronDown />
          </div>
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="border-b border-gray-100 pb-4">
            <div className="flex items-start gap-4">
              <div className=" bg-blue-200 text-blue-900 rounded-full p-1">
                <FiChevronDown />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{transaction.title}</h3>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                    <p className="text-sm text-[#00B0FF] mt-1">
                      {transaction.details}
                    </p>
                  </div>
                  <span
                    className={`font-medium ${
                      transaction.amount > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""} ${" "}
                    {Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
