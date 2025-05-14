import React, { useEffect, useState } from 'react';
import { API_CONFIG } from '../config/api';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export default function CryptoInfo() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          `${API_CONFIG.COINGECKO.BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false`
        );
        
        if (!response.ok) {
          throw new Error('Falha ao carregar dados de criptomoedas');
        }

        const data = await response.json();
        setCryptoData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados de criptomoedas');
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="text-red-500 text-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-full">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Criptomoedas em Destaque
      </h2>
      
      <div className="space-y-3">
        {cryptoData.map((crypto) => (
          <div key={crypto.id} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {crypto.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {crypto.symbol.toUpperCase()}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                ${crypto.current_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <div className={`flex items-center text-xs ${
                crypto.price_change_percentage_24h >= 0 
                  ? 'text-green-500' 
                  : 'text-red-500'
              }`}>
                {crypto.price_change_percentage_24h >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 