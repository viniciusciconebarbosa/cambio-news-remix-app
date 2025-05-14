import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    // URL da GNews API
    const apiUrl = "https://gnews.io/api/v4/search";
    
    // Parâmetros da URL
    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "economia"; // termo de busca
    const country = url.searchParams.get("country") || "br";
    const lang = url.searchParams.get("lang") || "pt";
    const max = url.searchParams.get("max") || "10";
    const sortby = url.searchParams.get("sortby") || "publishedAt";
    const inParam = url.searchParams.get("in") || "title,description";
    
    // Fazendo a requisição para a API
    const response = await fetch(
      `${apiUrl}?q=${query}&country=${country}&lang=${lang}&max=${max}&sortby=${sortby}&in=${inParam}&apikey=${process.env.GNEWS_API_KEY}`,
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