export interface ExchangeRateResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
  time_last_updated: number;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export interface ConversionResult {
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  rate: number;
  date: string;
}

export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export interface ConversionHistoryItem extends ConversionResult {
  id: string;
  timestamp: number;
}