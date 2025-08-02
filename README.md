# Projeto de Gerenciamento Financeiro com Microfrontends

Este projeto tem como proposta **aprimorar e escalar** uma aplicação de **gerenciamento financeiro**, utilizando uma arquitetura baseada em **microfrontends com Module Federation**, garantindo **integração eficiente** entre os módulos e **deploys otimizados** em ambientes cloud.

## Arquitetura Microfrontend

A aplicação é composta por três repositórios distintos que se integram via **Module Federation**:

- [`fiap_mf_consumer_root`](https://github.com/AndreMqs/fiap_mf_consumer_root): container principal e orquestrador de rotas
- [`fiap_mf_home`](https://github.com/AndreMqs/fiap_mf_home): landing page (home)
- [`fiap_mf_main`](https://github.com/AndreMqs/fiap_mf_main): área logada do sistema

---

## Executando Localmente

### Pré-requisitos

Antes de iniciar, verifique se você possui o **Node.js** instalado:

```bash
node -v
```

Se não estiver instalado, baixe e instale a versão LTS através do site oficial:  
https://nodejs.org/

---
### 1. fiap_mf_consumer_root (Container Principal)

Responsável por integrar os microfrontends e gerenciar as rotas da aplicação.

**Passos para rodar localmente:**

```bash
git clone https://github.com/AndreMqs/fiap_mf_consumer_root
cd fiap_mf_consumer_root
npm install
```

1. No arquivo `vite.config.ts`:
   - **Comente** a linha dos remotes para EC2
   - **Descomente** a linha dos remotes para build local

```ts
// remotes: {
//   home: `http://${elastic_ip}:3001/assets/remoteEntry.js`,
//   main: `http://${elastic_ip}:3002/assets/remoteEntry.js`,
// }

remotes: {
  home: 'http://localhost:3001/assets/remoteEntry.js',
  main: 'http://localhost:3002/assets/remoteEntry.js',
}
```

```bash
npm run build
npm run serve
```

---

### 2. fiap_mf_home (Landing Page)

Microfrontend responsável pela tela inicial da aplicação.

**Passos para rodar localmente:**

```bash
git clone https://github.com/AndreMqs/fiap_mf_home
cd fiap_mf_home
npm install
```

1. No arquivo `vite.config.ts`, altere a constante `isDevEnv` para `true`:

```ts
const isDevEnv = true;
```

```bash
npm run build
npm run serve
```

**Tecnologias utilizadas:**

- React
- TypeScript
- `module.scss`

---

### 3. fiap_mf_main (Área Logada)

Microfrontend responsável pela área logada da aplicação, onde ficam as features e gráficos financeiros.

**Passos para rodar localmente:**

```bash
git clone https://github.com/AndreMqs/fiap_mf_main
cd fiap_mf_main
npm install
npm run build
npm run serve
```

**Tecnologias utilizadas:**

- React
- TypeScript
- Zustand (gerenciamento de estado)
- Recharts (gráficos)
- `module.scss`

---

## Observações Finais

- Todos os microfrontends devem estar rodando **simultaneamente** para a aplicação funcionar corretamente.
- A porta padrão para cada módulo é:
  - `fiap_mf_consumer_root`: `3000`
  - `fiap_mf_home`: `3001`
  - `fiap_mf_main`: `3002`

