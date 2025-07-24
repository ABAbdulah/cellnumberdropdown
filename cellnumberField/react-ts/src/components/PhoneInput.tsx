import React, { useState } from "react";

type Country = {
  code: string; 
  dialCode: string;
  flag?: string;
  validLength: number[]; 
};

type PhoneInputProps = {
  allowedCountries?: Country[];
  showFlags?: boolean;
  defaultCountry?: string;
  className?: string;
  fullWidth?: boolean;
  heightClass?: string;
  onChange: (value: string) => void;
};


const defaultCountries: Country[] = [
  { code: "PK", dialCode: "+92", flag: "https://flagcdn.com/w40/pk.png", validLength: [12] },
  { code: "US", dialCode: "+1", flag: "https://flagcdn.com/w40/us.png", validLength: [10] },
  { code: "CA", dialCode: "+1", flag: "https://flagcdn.com/w40/ca.png", validLength: [10] },
];


const PhoneInput: React.FC<PhoneInputProps> = ({
allowedCountries,
  showFlags = false,
  defaultCountry = "",
  className = "",
  fullWidth = true,
  heightClass = "h-12",
  onChange,
}) => {

  const countryList = allowedCountries && allowedCountries.length > 0
    ? allowedCountries
    : defaultCountries;

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countryList.find((c) => c.code === defaultCountry) || countryList[0]
  );


  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

    const handleInputChange = (val: string) => {
    const cleaned = val.replace(/[^0-9-]/g, "");
    const digitsOnly = cleaned.replace(/-/g, "");
    if (selectedCountry.code === "PK" && digitsOnly.startsWith("0")) {
        return;
    }
    let validationError = "";

    if (!selectedCountry.validLength.includes(digitsOnly.length)) {
        validationError = `Number should be ${selectedCountry.validLength.join(" or ")} digits.`;
    }

    // For Pakistan, check if starts with 0
    if (selectedCountry.code === "PK" && digitsOnly.startsWith("0")) {
        validationError = "number cannot start with 0.";
    }

    setError(validationError);
    setNumber(cleaned);
    onChange(`${selectedCountry.dialCode}${cleaned}`);
    };


  const handleCountryChange = (code: string) => {
    const newCountry = countryList.find((c) => c.code === code);

    
    if (!newCountry) return;
    setSelectedCountry(newCountry);
    setNumber("");
    onChange(""); 
  };

  return (
    <>
    
    <div
      className={`flex items-center border border-gray-300 rounded-md px-2 ${heightClass} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      <div className="flex items-center">
        {showFlags && (
            <img
            src={selectedCountry.flag}
            alt={selectedCountry.code}
            className="w-5 h-4 mr-1"
            />
        )}
        <select
            value={selectedCountry.code}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="outline-none bg-transparent pr-2 text-sm"
        >
            {countryList.map((country) => (
            <option key={country.code} value={country.code}>
                {country.dialCode}
            </option>
            ))}
        </select>
        </div>


      <span className="mx-1">|</span>
      <input
        type="text"
        placeholder="Enter phone number"
        value={number}
        maxLength={Math.max(...selectedCountry.validLength) + 2} // +2 for dashes if needed
        onChange={(e) => handleInputChange(e.target.value)}
        className="flex-1 bg-transparent outline-none text-sm"
      />
    </div>
    {error && <p className="text-sm text-red-500">{error}</p>}
</>
  );
};

export default PhoneInput;
