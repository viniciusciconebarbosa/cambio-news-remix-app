import React from 'react';
import { useLoaderData } from "@remix-run/react";
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

export default function FinancialNews() {
  const { articles } = useLoaderData<{ articles: NewsItem[] }>();

  if (!articles || articles.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <Newspaper className="w-5 h-5 text-primary-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Notícias Financeiras
          </h2>
        </div>
        <div className="text-gray-500 dark:text-gray-400 text-center py-8">
          Nenhuma notícia encontrada no momento.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Newspaper className="w-5 h-5 text-primary-500 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Notícias Financeiras
        </h2>
      </div>
      
      <div className="space-y-4">
        {articles.map((noticia, index) => (
          <a
            key={index}
            href={noticia.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg p-4 transition-colors duration-200"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {noticia.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                {noticia.description}
              </p>
              
              <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span>{noticia.source.name}</span>
                <span>
                  {new Date(noticia.publishedAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
} 