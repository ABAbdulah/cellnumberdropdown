import { useState } from "react";
import PhoneInput from "./components/PhoneInput";

const App = () => {
  const [phone, setPhone] = useState("");

  return (
    <>
    <div className="p-4 max-w-md mx-auto space-y-4">
      <PhoneInput
        showFlags={true}
        defaultCountry="PK" // make sure this code matches allowedCountries
        onChange={(value) => setPhone(value)}
        heightClass="h-14"
        className=""
        allowedCountries={[
           { code: "PK", dialCode: "+92", flag: "https://flagcdn.com/w40/pk.png", validLength: [12] },
            { code: "US", dialCode: "+1", flag: "https://flagcdn.com/w40/us.png", validLength: [10] },
            // { code: "CA", dialCode: "+1", flag: "https://flagcdn.com/w40/ca.png", validLength: [10] },
        ]}
      />

      <p className="text-sm text-gray-600">Phone: {phone}</p>
    </div>
    </>
  );
};

export default App;
