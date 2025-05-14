import React from 'react';
import { ArrowDownUp, RefreshCw } from 'lucide-react';
import { formatNumber } from '../utils/formatters';

interface ExchangeRateInfoProps {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  lastUpdated: string;
  onRefresh: () => void;
  isLoading: boolean;
}

const ExchangeRateInfo: React.FC<ExchangeRateInfoProps> = ({
  fromCurrency,
  toCurrency,
  rate,
  lastUpdated,
  onRefresh,
  isLoading,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-sm">
      <div className="flex items-center mb-2 sm:mb-0">
        <ArrowDownUp size={16} className="text-primary-500 mr-2" />
        <span className="font-medium text-gray-700 dark:text-gray-300">
          1 {fromCurrency} = {formatNumber(rate, 4)} {toCurrency}
        </span>
      </div>
      
      <div className="flex items-center space-x-3">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Updated: {lastUpdated}
        </span>
        
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        >
          <RefreshCw
            size={14}
            className={`mr-1 ${isLoading ? 'animate-spin' : ''}`}
          />
          <span className="text-xs">Refresh</span>
        </button>
      </div>
    </div>
  );
};

export default ExchangeRateInfo;