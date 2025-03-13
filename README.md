# PIB Brasil

Uma aplicação web moderna para visualização da evolução do PIB brasileiro, utilizando dados da API do IBGE.

## 🚀 Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e dev server moderno
- **TailwindCSS** - Framework CSS utility-first
- **React Query** - Gerenciamento de estado e cache para dados da API
- **ApexCharts** - Biblioteca para visualização de dados
- **React Router DOM** - Roteamento da aplicação
- **Axios** - Cliente HTTP para requisições à API

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn ou bun

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/pib-brasil.git
cd pib-brasil
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
bun install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
bun dev
```

A aplicação está disponível em `https://pib-brasil.vercel.app/`

## 🏗️ Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
# ou
yarn build
# ou
bun run build
```

## 🎨 Decisões de Design

- **Arquitetura Moderna**: Utilização do Vite como build tool para um desenvolvimento mais rápido e eficiente.
- **UI/UX**: 
  - Design system baseado em TailwindCSS para estilização flexível e manutenível
  - Interface responsiva e intuitiva
- **Gerenciamento de Dados**:
  - React Query para cache e gerenciamento eficiente dos dados da API
  - Axios para requisições HTTP com interceptors e configurações centralizadas
- **Visualização de Dados**:
  - Utilização do ApexCharts para gráficos interativos e informativos
  - Múltiplas opções de visualização dos dados do PIB

## 📈 Funcionalidades

- Visualização da evolução do PIB brasileiro ao longo dos anos
- Gráficos interativos com diferentes perspectivas dos dados
- Filtros por período e setores econômicos
- Exportação de dados em diferentes formatos
- Interface responsiva para acesso em diferentes dispositivos
