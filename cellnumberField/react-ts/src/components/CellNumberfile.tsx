import React from 'react'

type CustomInputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

const CellNumberfile:  React.FC<CustomInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};


export default CellNumberfile
