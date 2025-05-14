import { useState, useEffect, useCallback } from 'react';
import { fetchExchangeRates } from '../api/currencyApi';
import { ExchangeRateResponse } from '../types/types';

export const useCurrencyData = (baseCurrency: string) => {
  const [data, setData] = useState<ExchangeRateResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchExchangeRates(baseCurrency);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, [baseCurrency]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const convert = useCallback(
    (amount: number, targetCurrency: string): number => {
      if (!data || !data.rates[targetCurrency]) return 0;
      return amount * data.rates[targetCurrency];
    },
    [data]
  );

  const getExchangeRate = useCallback(
    (targetCurrency: string): number => {
      if (!data || !data.rates[targetCurrency]) return 0;
      return data.rates[targetCurrency];
    },
    [data]
  );

  const refreshRates = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    convert,
    getExchangeRate,
    refreshRates,
  };
};