# GitHub Explorer

Aplicação client-side que consulta a API do GitHub e exibe perfis de usuários e seus repositórios, com listagem ordenável e página de detalhes por repositório.

Projeto desenvolvido como **desafio front-end** da **Desbravador Software**.

**[Ver online (produção)](https://github-repos-viewer-three.vercel.app/)** · deploy na Vercel

---

## Tecnologias

| Stack        | Uso                          |
|-------------|------------------------------|
| **React 18** | UI + hooks                   |
| **TypeScript** | Tipagem estática            |
| **Vite**     | Build e dev server           |
| **React Router v6** | Rotas (data router)   |
| **Axios**    | Cliente HTTP para a API      |
| **Bootstrap 5** | Layout e componentes      |
| **Bootstrap Icons** | Ícones (CDN)           |

---

## Requisitos

- **Node.js** 18+
- **npm** ou **yarn**

---

## Instalação

```bash
git clone <url-do-repositorio>
cd github-repos-viewer
npm install
```

> Se aparecer erro de permissão no cache do npm (`EPERM`), execute antes:  
> `sudo chown -R $(whoami) ~/.npm`

---

## Como rodar

### Desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

### Build para produção

```bash
npm run build
```

Saída em `dist/`.

### Preview do build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Home: busca por usuário do GitHub e card de destaque |
| `/:username` | Perfil do usuário + listagem de repositórios (ordenável e paginada) |
| `/:username/:reponame` | Detalhes do repositório (nome, descrição, estrelas, linguagem, link GitHub) |
| `*` | Página 404 |

---

## Funcionalidades

- [x] Buscar usuário do GitHub pela barra de pesquisa
- [x] Ver perfil do usuário (avatar, nome, login, bio, seguidores, seguindo, e-mail quando público)
- [x] Listar repositórios com ordenação (estrelas, nome, data de atualização) e direção (asc/desc)
- [x] Paginação da listagem de repositórios
- [x] Cards de repositório com nome, descrição, linguagem, estrelas, forks e data de atualização
- [x] Página de detalhes do repositório com link para o GitHub
- [x] Tratamento de erros (404, 403 rate limit, rede) com mensagens em português
- [x] Atalho de teclado para foco na busca (na home)

---

## Estrutura do projeto

```
src/
├── api/              # Cliente Axios e serviços da API GitHub
│   ├── client.ts     # Instância do axios + interceptor de erro
│   ├── github.ts     # fetchUser, fetchUserRepos, fetchRepo
│   └── errorMessages.ts
├── components/       # Componentes reutilizáveis
│   ├── Layout/
│   ├── Header/
│   ├── SearchBar/
│   ├── ErrorMessage/
│   └── Pagination/
├── hooks/            # useGitHubUser, useRepo, useKeyShortcut
├── pages/
│   ├── Home/         # Busca + QuickTry + DeveloperCard
│   ├── UserProfile/  # Sidebar do usuário + RepoList (RepoCard, RepoSortOptions)
│   ├── RepoDetail/   # RepoDetailCard, SkeletonDetail
│   └── NotFound/
├── types/            # Tipos da API GitHub (github.ts)
├── utils/            # format, languageColors, getInitials, constants
├── routes.tsx
├── App.tsx
├── main.tsx
└── index.css
```

---

## API GitHub

- **Documentação:** [REST API v3](https://docs.github.com/en/rest)
- **Base URL:** `https://api.github.com`
- **Rate limit (não autenticado):** 60 requisições/hora por IP. Em 403, a aplicação exibe mensagem orientando tentar mais tarde.

**Endpoints utilizados:**

| Método | Endpoint | Uso |
|--------|----------|-----|
| GET | `/users/:username` | Dados do perfil |
| GET | `/users/:username/repos` | Lista de repositórios |
| GET | `/repos/:owner/:repo` | Detalhes de um repositório |

Não é necessário token; a aplicação roda apenas com o limite anônimo.

---

## Boas práticas

- **Segurança:** sanitização de `username`/`owner`/`repo` (trim + encodeURIComponent no path), timeout no cliente HTTP, sem credenciais no front.
- **Arquitetura:** camada de API isolada, hooks para estado e side effects, componentes presentacionais e memo quando útil.
- **Acessibilidade:** labels, atributos `aria`, roles, foco na busca.
- **Performance:** code splitting (manualChunks no Vite), lazy de rotas possível via React Router.

---

## Licença

Projeto de desafio técnico. Uso livre para avaliação.
