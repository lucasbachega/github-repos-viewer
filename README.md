# GitHub Repos Viewer

Desafio Front-End da **Desbravador Software**: aplicação client-side que consulta a API do GitHub e exibe os repositórios mais populares de um usuário.

## Tecnologias

- **React 18** + **TypeScript**
- **Vite** (build e dev server)
- **React Router v6** (rotas)
- **Axios** (chamadas à API)
- **Bootstrap 5** (layout responsivo)

## Requisitos

- Node.js 18+
- npm ou yarn

## Instalação

```bash
cd github-repos-viewer
npm install
```

> Se aparecer erro de permissão no cache do npm (`EPERM`), execute antes:  
> `sudo chown -R $(whoami) ~/.npm`

## Executar em desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

## Build para produção

```bash
npm run build
```

Artefatos em `dist/`.

## Preview do build

```bash
npm run preview
```

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Busca por usuário do GitHub |
| `/user/:username` | Perfil do usuário + listagem de repositórios (ordenável) |
| `/repo/:owner/:repo` | Detalhes de um repositório |

## Funcionalidades (requisitos de negócio)

- [x] Buscar por usuário do GitHub
- [x] Ver detalhes do usuário (seguidores, seguindo, avatar, e-mail, bio)
- [x] Ver listagem de repositórios ordenada por estrelas (decrescente)
- [x] Alterar ordem da listagem (campo e direção)
- [x] Ver página de detalhes do repositório (nome, descrição, estrelas, linguagem, link para o GitHub)

## Estrutura do projeto

```
src/
  api/           # Cliente Axios e serviços da API GitHub
  components/    # Componentes reutilizáveis (Layout, Loading, etc.)
  hooks/         # useGitHubUser, useRepo
  pages/         # SearchPage, UserPage, RepoPage
  types/         # Tipos TypeScript (GitHub API)
  routes.tsx     # Definição das rotas
  App.tsx
  main.tsx
```

## API GitHub

- [Documentação v3](https://developer.github.com/v3/)
- **Rate limit (não autenticado):** 60 requisições/hora por IP. Em caso de 403, a aplicação exibe mensagem orientando tentar mais tarde.
- Endpoints utilizados:
  - `GET /users/:username`
  - `GET /users/:username/repos`
  - `GET /repos/:owner/:repo`

## Boas práticas aplicadas

- **Segurança:** sanitização de `username`/`owner`/`repo` (trim, encodeURIComponent), timeout no cliente HTTP, sem exposição de credenciais.
- **Arquitetura:** camada de API isolada, hooks para estado e side effects, componentes presentacionais.
- **Acessibilidade:** labels, aria, roles, breadcrumbs.
- **Performance:** lazy de imagens, code splitting (manualChunks no Vite).

## Licença

Projeto de desafio técnico. Uso livre para avaliação.
