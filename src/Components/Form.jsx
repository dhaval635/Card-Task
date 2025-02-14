/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Form({ show, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    bankName: "",
    cardType: "",
    cardNumber: "",
    validTill: "",
    cvv: "",
    isDefault: false,
    addToGPay: false,
  });

  const [errors, setErrors] = useState({
    name: false,
    bankName: false,
    cardType: false,
    cardNumber: false,
    validTill: false,
    cvv: false,
  });

  if (!show) return null;

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name || formData.name.length > 35) {
      valid = false;
      newErrors.name = "Name is required and must be less than 35 characters";
    }

    if (!formData.bankName) {
      valid = false;
      newErrors.bankName = "Bank name is required";
    }

    if (!formData.cardType) {
      valid = false;
      newErrors.cardType = "Card type is required";
    }

    const cardNumberRegex = /^\d{16}$/; 
    if (!formData.cardNumber || !cardNumberRegex.test(formData.cardNumber)) {
      valid = false;
      newErrors.cardNumber =
        "Card number is required and must be a valid 16-digit number";
    }

    const validTillRegex = /^(0[1-9]|1[0-2])\/\d{4}$/; 
    if (!formData.validTill || !validTillRegex.test(formData.validTill)) {
      valid = false;
      newErrors.validTill =
        "Valid Till is required and must be in MM/YYYY format";
    } else {
      const [month, year] = formData.validTill.split("/");
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1;

      if (
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        valid = false;
        newErrors.validTill = "Valid Till must be a future date";
      }
    }

    if (!formData.cvv || formData.cvv.length !== 3) {
      valid = false;
      newErrors.cvv = "CVV is required and must be 3 digits";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const storedCards = JSON.parse(localStorage.getItem("cards")) || [];
      if (formData.isDefault) {
        const hasDefaultCard = storedCards.some(
          (card) => card.cardType === formData.cardType && card.isDefault
        );

        if (hasDefaultCard) {
          toast.error("The selected card type already has a default card");
          return;
        }
      }

      const newCard = { ...formData, id: storedCards.length };

      storedCards.push(newCard);

      localStorage.setItem("cards", JSON.stringify(storedCards));

      toast.success("Card added successfully");

      setFormData({
        name: "",
        bankName: "",
        cardType: "",
        cardNumber: "",
        validTill: "",
        cvv: "",
        isDefault: false,
        isGPay: false,
      });

      onClose();
    }
  };

  const Close = () => {
    onClose();
    setFormData({
      name: "",
      bankName: "",
      cardType: "",
      cardNumber: "",
      validTill: "",
      cvv: "",
      isDefault: false,
      isGPay: false,
    });
  };

  return (
    <>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#0A2A4A]">New Card</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <FiX size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-[#0A2A4A] mb-1">Name:</label>
                <input
                  type="text"
                  placeholder="i.e. James Carlon"
                  className={`w-full px-3 py-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setErrors({ ...errors, name: false });
                  }}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-[#0A2A4A] mb-1">Bank Name:</label>
                <input
                  type="text"
                  placeholder="i.e. HDFC BANK"
                  className={`w-full px-3 py-2 border ${
                    errors.bankName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  value={formData.bankName}
                  onChange={(e) => {
                    setFormData({ ...formData, bankName: e.target.value });
                    setErrors({ ...errors, bankName: false });
                  }}
                />
                {errors.bankName && (
                  <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>
                )}
              </div>

              <div>
                <label className="block text-[#0A2A4A] mb-1">Card Type:</label>
                <select
                  className={`w-full px-3 py-2 border ${
                    errors.cardType ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  value={formData.cardType}
                  onChange={(e) => {
                    setFormData({ ...formData, cardType: e.target.value });
                    setErrors({ ...errors, cardType: false });
                  }}
                >
                  <option value="">Select Card Type</option>
                  <option value="Credit">Credit</option>
                  <option value="Debit">Debit</option>
                </select>
                {errors.cardType && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardType}</p>
                )}
              </div>

              <div>
                <label className="block text-[#0A2A4A] mb-1">
                  Card Number:
                </label>
                <input
                  type="text"
                  placeholder="i.e. 7754 1542 6584 4875"
                  className={`w-full px-3 py-2 border ${
                    errors.cardNumber ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  value={formData.cardNumber}
                  onChange={(e) => {
                    setFormData({ ...formData, cardNumber: e.target.value });
                    setErrors({ ...errors, cardNumber: false });
                  }}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[#0A2A4A] mb-1">
                    Valid Till:
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YYYY"
                    className={`w-full px-3 py-2 border ${
                      errors.validTill ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    value={formData.validTill}
                    onChange={(e) => {
                      setFormData({ ...formData, validTill: e.target.value });
                      setErrors({ ...errors, validTill: false });
                    }}
                  />
                  {errors.validTill && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.validTill}
                    </p>
                  )}
                </div>
                <div className="w-24">
                  <label className="block text-[#0A2A4A] mb-1">CVV:</label>
                  <input
                    type="password"
                    placeholder="---"
                    maxLength={3}
                    className={`w-full px-3 py-2 border ${
                      errors.cvv ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    value={formData.cvv}
                    onChange={(e) => {
                      setFormData({ ...formData, cvv: e.target.value });
                      setErrors({ ...errors, cvv: false });
                    }}
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={() =>
                    setFormData({ ...formData, isDefault: !formData.isDefault })
                  }
                  className="form-checkbox"
                />
                <label className="text-sm">Set this card to default</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isGPay}
                  onChange={() =>
                    setFormData({ ...formData, isGPay: !formData.isGPay })
                  }
                  className="form-checkbox"
                />
                <label className="text-sm">Add this card to Gpay ?</label>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
                  onClick={Close}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-[#0A2A4A] rounded-md hover:bg-[#0A2A4A]/90 focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
