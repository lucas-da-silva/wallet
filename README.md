<h1 align="center">Carteira digital</h1>

## Sobre o projeto

Aplicação para controle de gastos pessoais. O usuário pode adicionar, remover e editar gastos. A aplicação também mostra o total de gastos convertidos para real (BRL).

## Tecnologias utilizadas

- [React](https://pt-br.reactjs.org/) - Biblioteca JavaScript para criar interfaces de usuário
- [Redux](https://redux.js.org/) - Biblioteca JavaScript para gerenciar o estado da aplicação
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Biblioteca JavaScript para testes de componentes React
- [Jest](https://jestjs.io/) - Framework de testes em JavaScript
- [API de Cotações de Moedas](https://docs.awesomeapi.com.br/api-de-moedas) - API para cotações de moedas

## Funcionalidades

- Adicionar gasto
- Remover gasto
- Editar gasto
- Mostrar total de gastos em BRL

## Instalação

```bash
# Clonar Projeto
$ git clone git@github.com:lucas-da-silva/wallet.git

# Entrar no diretório
$ cd wallet

# Instalar dependências
$ npm install

# Subir a aplicação
$ npm start

# Executar testes
$ npm test 
```

## Estrutura do projeto

```
$PROJECT_ROOT
|   # Arquivos estáticos de imagem e configuração
├── public
|   # Código fonte da aplicação
└── src
    |   # Arquivos de React componentes
    ├── components
    |   # Arquivos de páginas
    ├── pages
    |   # Arquivos Redux
    ├── redux
    |   # Arquivos de serviços
    ├── services
    |   # Arquivos de estilos
    ├── styles
    |   # Arquivos de testes
    └── tests
```

## Autor

-   [@lucas-da-silva](https://github.com/lucas-da-silva)
