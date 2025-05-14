import { ExchangeRateResponse } from '../types/types';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

export const fetchExchangeRates = async (baseCurrency: string): Promise<ExchangeRateResponse> => {
  try {
    const response = await fetch(`${API_URL}${baseCurrency}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching exchange rates: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};