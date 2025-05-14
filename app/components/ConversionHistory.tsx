import React from 'react';
import { ConversionHistoryItem } from '../types/types';
import { formatCurrency, formatDate } from '../utils/formatters';
import { getCurrencyByCode } from '../data/currencies';

interface ConversionHistoryProps {
  history: ConversionHistoryItem[];
  onClear: () => void;
}

const ConversionHistory: React.FC<ConversionHistoryProps> = ({ history, onClear }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Conversões recentes
        </h3>
        <button
          onClick={onClear}
          className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
        >
          Clear History
        </button>
      </div>
      
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {history.map((item) => {
          const fromCurrency = getCurrencyByCode(item.fromCurrency);
          const toCurrency = getCurrencyByCode(item.toCurrency);
          
          return (
            <div
              key={item.id}
              className="flex justify-between items-center p-2.5 rounded-lg bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 text-sm"
            >
              <div className="flex items-center space-x-1.5">
                <span>{fromCurrency.flag}</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {formatCurrency(item.fromAmount, item.fromCurrency)}
                </span>
                <span className="text-gray-500 dark:text-gray-400">→</span>
                <span>{toCurrency.flag}</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {formatCurrency(item.toAmount, item.toCurrency)}
                </span>
              </div>
              
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(item.timestamp)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversionHistory;