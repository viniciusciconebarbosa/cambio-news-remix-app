import React from 'react';
import { getCurrencyByCode } from '../data/currencies';

interface AmountInputProps {
  amount: string;
  onChange: (value: string) => void;
  currencyCode: string;
  label: string;
  id: string;
}

const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  onChange,
  currencyCode,
  label,
  id,
}) => {
  const currency = getCurrencyByCode(currencyCode);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and one decimal point
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '') {
      onChange(value);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <span className="text-gray-500 dark:text-gray-400">{currency.symbol}</span>
        </div>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={handleChange}
          placeholder="0.00"
          className="w-full pl-8 pr-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 shadow-sm input-focus-ring transition-all-ease"
        />
      </div>
    </div>
  );
};

export default AmountInput;