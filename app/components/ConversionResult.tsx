import React from 'react';
import { getCurrencyByCode } from '../data/currencies';
import { formatCurrency, formatNumber } from '../utils/formatters';

interface ConversionResultProps {
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  rate: number;
  date: string;
}

const ConversionResult: React.FC<ConversionResultProps> = ({
  fromAmount,
  fromCurrency,
  toAmount,
  toCurrency,
  rate,
  date,
}) => {
  const fromCurrencyData = getCurrencyByCode(fromCurrency);
  const toCurrencyData = getCurrencyByCode(toCurrency);

  return (
    <div className="flex flex-col p-4 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-100 dark:border-teal-800/30 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <div className="text-gray-500 dark:text-gray-400 text-sm">Valor convertido        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {date}
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <span className="text-2xl font-semibold text-gray-900 dark:text-white">
          {formatCurrency(toAmount, toCurrency)}
        </span>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center space-x-1">
          <span>{formatNumber(fromAmount)} {fromCurrencyData.code}</span>
          <span>=</span>
          <span>{formatNumber(toAmount)} {toCurrencyData.code}</span>
        </div>
        
        <div className="px-2 py-1 rounded-md bg-white/50 dark:bg-gray-800/50 text-xs font-medium">
          1 {fromCurrencyData.code} = {formatNumber(rate, 4)} {toCurrencyData.code}
        </div>
      </div>
    </div>
  );
};

export default ConversionResult;