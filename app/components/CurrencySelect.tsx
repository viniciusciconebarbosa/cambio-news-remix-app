import React from 'react';
import { Currency } from '../types/types';
import { getCurrencyByCode } from '../data/currencies';

interface CurrencySelectProps {
  currencies: Currency[];
  selectedCurrency: string;
  onChange: (currencyCode: string) => void;
  label: string;
  id: string;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  currencies,
  selectedCurrency,
  onChange,
  label,
  id,
}) => {
  const selectedCurrencyData = getCurrencyByCode(selectedCurrency);

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <span className="text-lg">{selectedCurrencyData.flag}</span>
        </div>
        <select
          id={id}
          value={selectedCurrency}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 appearance-none cursor-pointer shadow-sm input-focus-ring transition-all-ease"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg 
            className="h-4 w-4 text-gray-500 dark:text-gray-400" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CurrencySelect;