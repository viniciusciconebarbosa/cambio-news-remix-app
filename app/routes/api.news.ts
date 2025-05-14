import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    // URL da API de notícias (substitua pela sua API)
    const apiUrl = "https://newsapi.org/v2/top-headlines";
    
    // Parâmetros da URL
    const url = new URL(request.url);
    const country = url.searchParams.get("country") || "br";
    const category = url.searchParams.get("category") || "business";
    
    // Fazendo a requisição para a API
    const response = await fetch(
      `${apiUrl}?country=${country}&category=${category}`,
      {
        headers: {
          "X-Api-Key": process.env.NEWS_API_KEY || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }

    const data = await response.json();
    return json(data);
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return json(
      { error: "Erro ao buscar notícias" },
      { status: 500 }
    );
  }
}; 