# Cambio News

O Cambio News é uma aplicação web que fornece informações atualizadas sobre câmbio, notícias financeiras e análises de mercado. A aplicação permite aos usuários visualizar taxas de câmbio em tempo real, acompanhar notícias relevantes do mercado financeiro e obter análises detalhadas sobre tendências econômicas. Além disso, a aplicação oferece recursos de personalização.

---
## Dominio para a aplicaçao 
https://cambio-news-remix-app.vercel.app/

---
## Índice

- [Cambio News](#cambio-news)
  - [Índice](#índice)
  - [Visão Geral](#visão-geral)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Instalação](#instalação)
  - [Scripts Disponíveis](#scripts-disponíveis)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Estilização](#estilização)
  - [Deploy](#deploy)
  - [Contribuição](#contribuição)
  - [Licença](#licença)
  - [Referências](#referências)


## Visão Geral

O Cambio News é uma aplicação web desenvolvida com Remix, focada em fornecer uma base sólida para projetos modernos em Node.js.

## Tecnologias Utilizadas

- [Remix](https://remix.run/)
- [Node.js](https://nodejs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/cambio-news.git
   cd cambio-news
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera o build de produção.
- `npm start`: Executa a aplicação em modo produção.

## Estrutura do Projeto

- `app/`: Código-fonte principal da aplicação Remix.
- `build/`: Arquivos gerados após o build de produção.
  - `build/server`: Código do servidor.
  - `build/client`: Código do cliente.
- `public/`: Arquivos estáticos.
- `tailwind.config.js`: Configuração do Tailwind CSS.

## Estilização

O projeto utiliza Tailwind CSS para estilização. Para customizações, edite o arquivo `tailwind.config.js` ou adicione classes utilitárias diretamente nos componentes.

Mais informações: [Documentação do Tailwind CSS](https://tailwindcss.com/docs)

## Deploy

1. Gere o build de produção:
   ```bash
   npm run build
   ```

2. Execute a aplicação:
   ```bash
   npm start
   ```

3. Faça o deploy dos diretórios `build/server` e `build/client` conforme a necessidade do seu ambiente de hospedagem.

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Fork este repositório.
2. Crie uma branch para sua feature ou correção: `git checkout -b minha-feature`
3. Faça commit das suas alterações: `git commit -m 'Minha nova feature'`
4. Faça push para a branch: `git push origin minha-feature`
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Referências

- [Documentação do Remix](https://remix.run/docs)
- [Documentação do Vite](https://vitejs.dev/guide/)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)
