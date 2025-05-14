import React from 'react';
import { popularPairs } from '../data/currencies';

interface PopularPairsProps {
  onSelectPair: (fromCurrency: string, toCurrency: string) => void;
  currentFrom: string;
  currentTo: string;
}

const PopularPairs: React.FC<PopularPairsProps> = ({
  onSelectPair,
  currentFrom,
  currentTo,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Os pares de moedas mais populares
      </h3>
      <div className="flex flex-wrap gap-2">
        {popularPairs.map((pair, index) => {
          const isActive = pair.from === currentFrom && pair.to === currentTo;
          
          return (
            <button
              key={index}
              onClick={() => onSelectPair(pair.from, pair.to)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                isActive
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {pair.from} → {pair.to}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PopularPairs;