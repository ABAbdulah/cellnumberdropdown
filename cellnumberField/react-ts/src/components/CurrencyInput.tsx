import React, { useState } from "react";

type CurrencyInputProps = {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
};

const formatNumber = (value: string) => {
  return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatCurrency = (val: string, onBlur?: boolean) => {
  if (!val) return "";

  const hasDecimal = val.includes(".");
  let [left, right = ""] = val.split(".");

  left = formatNumber(left);
  if (onBlur) right = (right + "00").slice(0, 2);
  else right = right.slice(0, 2);

  return hasDecimal || onBlur ? `${left}.${right}` : left;
};

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  placeholder = "Enter amount",
  value = "",
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, "");
    setInputValue(rawValue);
    onChange?.(rawValue);
  };

  const handleBlur = () => {
    const formatted = formatCurrency(inputValue, true);
    setInputValue(formatted);
  };

  return (
    <div className="flex justify-between px-2 py-1 border border-gray-300 rounded-sm w-full gap-2">
      <input
        type="text"
        inputMode="decimal"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="grow focus:outline-0"
      />
      <span className="">$</span>
    </div>

  );
};

export default CurrencyInput;
