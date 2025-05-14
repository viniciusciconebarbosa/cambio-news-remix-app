import React from "react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CurrencyConverter from "../components/CurrencyConverter";
import ThemeToggle from "../components/ThemeToggle";
import { ThemeProvider } from "../context/ThemeContext";
import { DollarSign } from "lucide-react";
import FinancialNews from "../components/FinancialNews";
import CryptoInfo from "../components/CryptoInfo";

export const loader: LoaderFunction = async () => {
  return json({
    EXCHANGE_RATE_API_KEY: process.env.EXCHANGE_RATE_API_KEY,
    NEWS_API_KEY: process.env.NEWS_API_KEY,
    ALPHA_VANTAGE_KEY: process.env.ALPHA_VANTAGE_KEY,
  });
};

export default function Index() {
  const { EXCHANGE_RATE_API_KEY, NEWS_API_KEY, ALPHA_VANTAGE_KEY } = useLoaderData<typeof loader>();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-teal-700 to-teal-900 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300">
                <DollarSign size={24} className="text-white" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900 dark:text-white font-manrope">
                CambioNews
              </h1>
            </div>
            <ThemeToggle />
          </header>
          
          <div className="flex flex-col space-y-6">
            <main className="flex flex-col items-center justify-center py-6">
              <CurrencyConverter exchangeRateApiKey={EXCHANGE_RATE_API_KEY} />
            </main>
            
            <div className="flex flex-col items-center justify-center py-6">
            <div className="w-[70%]">
                <CryptoInfo />
              </div>
              <div className="w-[70%] mt-6">
                <FinancialNews apiKey={NEWS_API_KEY} />
              </div>
            </div>
          </div>
     

          <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              API provided by{' '}
              <a 
                href="https://www.exchangerate-api.com"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                ExchangeRate-API
              </a>
            </p>
            <p className="mt-1">© 2025 CambioNews. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
} 