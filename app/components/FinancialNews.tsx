import React, { useEffect, useState } from 'react';
import { API_CONFIG } from '../config/api';
import { Newspaper } from 'lucide-react';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface FinancialNewsProps {
  apiKey: string;
}

export default function FinancialNews({ apiKey }: FinancialNewsProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      if (!apiKey) {
        setError('Chave da API não configurada');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_CONFIG.NEWS_API.BASE_URL}/everything?q=(currency OR exchange OR finance)&language=pt&sortBy=publishedAt&pageSize=3&apiKey=${apiKey}`
        );
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Falha ao carregar notícias');
        }

        const data = await response.json();
        console.log('Resposta da API de notícias:', data);
        if (data.articles && Array.isArray(data.articles)) {
          setNews(data.articles.slice(0, 3));
        } else {
          throw new Error('Formato de dados inválido');
        }
      } catch (err) {
        console.error('Erro ao carregar notícias:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar notícias');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [apiKey]);

  if (!apiKey) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="text-yellow-500 text-sm">
          API de notícias não configurada
        </div>
      </div>
    );
  }

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

  if (news.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="text-gray-500 text-sm">
          Nenhuma notícia encontrada
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-full">
      <div className="flex items-center mb-4">
        <Newspaper className="w-5 h-5 text-primary-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Notícias Financeiras
        </h2>
      </div>
      
      <div className="space-y-3">
        {news.map((item, index) => (
          <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg p-2 transition-colors"
            >
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                {item.description}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>{item.source.name}</span>
                <span>
                  {new Date(item.publishedAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
} 