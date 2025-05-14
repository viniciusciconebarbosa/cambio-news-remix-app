import React, { useState, useEffect } from 'react';
import { useCurrencyData } from '../hooks/useCurrencyData';
import { currencies } from '../data/currencies';
import { formatDate, generateId } from '../utils/formatters';
import { ConversionHistoryItem } from '../types/types';

import CurrencySelect from './CurrencySelect';
import AmountInput from './AmountInput';
import ConversionResult from './ConversionResult';
import ExchangeRateInfo from './ExchangeRateInfo';
import PopularPairs from './PopularPairs';
import ConversionHistory from './ConversionHistory';
import { RefreshCw, ArrowDownUp } from 'lucide-react';

interface CurrencyConverterProps {
  exchangeRateApiKey: string;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ exchangeRateApiKey }) => {
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('BRL');
  const [amount, setAmount] = useState<string>('1');
  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);

  const { data, loading, error, convert, getExchangeRate, refreshRates } = useCurrencyData(fromCurrency);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('conversionHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse conversion history', e);
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('conversionHistory', JSON.stringify(history));
  }, [history]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
  };

  const handleFromCurrencyChange = (currencyCode: string) => {
    setFromCurrency(currencyCode);
  };

  const handleToCurrencyChange = (currencyCode: string) => {
    setToCurrency(currencyCode);
  };

  const handleSelectPair = (from: string, to: string) => {
    setFromCurrency(from);
    setToCurrency(to);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const saveToHistory = () => {
    if (!data || amount === '' || parseFloat(amount) === 0) return;
    
    const numericAmount = parseFloat(amount);
    const convertedAmount = convert(numericAmount, toCurrency);
    const rate = getExchangeRate(toCurrency);
    
    const newEntry: ConversionHistoryItem = {
      id: generateId(),
      fromAmount: numericAmount,
      fromCurrency,
      toAmount: convertedAmount,
      toCurrency,
      rate,
      date: data.date,
      timestamp: Date.now(),
    };
    
    setHistory((prev) => [newEntry, ...prev.slice(0, 9)]); // Keep only the 10 most recent
  };

  // Save current conversion to history when rates or currencies change
  useEffect(() => {
    if (data && amount !== '' && parseFloat(amount) > 0) {
      saveToHistory();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, fromCurrency, toCurrency]);

  // Calculate the converted amount
  const convertedAmount = data && amount !== '' ? convert(parseFloat(amount), toCurrency) : 0;
  const exchangeRate = data ? getExchangeRate(toCurrency) : 0;
  const lastUpdated = data ? formatDate(data.time_last_updated * 1000) : '';

  return (
    <div className="w-[70%] rounded-xl bg-white dark:bg-gray-900 shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800 currency-card">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Currency Converter
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Converter entre moedas com taxas de câmbio em tempo real.
        </p>
        
        <PopularPairs
          onSelectPair={handleSelectPair}
          currentFrom={fromCurrency}
          currentTo={toCurrency}
        />
        
        <div className="mb-4">
          <AmountInput
            amount={amount}
            onChange={handleAmountChange}
            currencyCode={fromCurrency}
            label="Valor"
            id="amount-input"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-6 relative">
          <CurrencySelect
            currencies={currencies}
            selectedCurrency={fromCurrency}
            onChange={handleFromCurrencyChange}
            label="De"
            id="from-currency"
          />
          
          <div className="hidden sm:flex items-center justify-center w-12 h-12 z-10">
            <button
              onClick={handleSwapCurrencies}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-3 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Swap currencies"
            >
              <ArrowDownUp size={18} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          
          <CurrencySelect
            currencies={currencies}
            selectedCurrency={toCurrency}
            onChange={handleToCurrencyChange}
            label="Para"
            id="to-currency"
          />
          
          <button
            onClick={handleSwapCurrencies}
            className="flex items-center justify-center py-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 sm:hidden"
          >
            <ArrowDownUp size={16} className="mr-1" />
            Swap currencies
          </button>
        </div>
        
        {error ? (
          <div className="p-4 mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
            Failed to load exchange rates. Please try again.
            <button
              onClick={refreshRates}
              className="ml-2 underline"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {loading ? (
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                <RefreshCw className="animate-spin mr-2 text-primary-500" size={18} />
                <span className="text-gray-600 dark:text-gray-300">
                  Fetching latest rates...
                </span>
              </div>
            ) : (
              <>
                <ConversionResult
                  fromAmount={parseFloat(amount) || 0}
                  fromCurrency={fromCurrency}
                  toAmount={convertedAmount}
                  toCurrency={toCurrency}
                  rate={exchangeRate}
                  date={data?.date || ''}
                />
                
                <div className="mt-4">
                  <ExchangeRateInfo
                    fromCurrency={fromCurrency}
                    toCurrency={toCurrency}
                    rate={exchangeRate}
                    lastUpdated={lastUpdated}
                    onRefresh={refreshRates}
                    isLoading={loading}
                  />
                </div>
              </>
            )}
          </>
        )}
        
        <ConversionHistory
          history={history}
          onClear={handleClearHistory}
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;