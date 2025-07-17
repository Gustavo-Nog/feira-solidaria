# Feira Solidária 🛍️

## 📖 Sobre o Projeto

**Feira Solidária** é uma aplicação web front-end desenvolvida como parte do programa **Capacita Brasil**. O projeto tem como missão conectar pequenos produtores e consumidores, facilitando a troca e o acesso a alimentos frescos e de qualidade de forma justa e solidária.

A plataforma oferece uma interface moderna, intuitiva e totalmente responsiva, permitindo que os usuários naveguem pelos produtos, conheçam os produtores e gerenciem suas contas de forma simples e eficiente.

## ✨ Funcionalidades Principais

- **Interface Responsiva:** Layout que se adapta perfeitamente a desktops, tablets e celulares.
- **Navegação Completa:** Barra de navegação com menu "hambúrguer" para dispositivos móveis, garantindo acesso a todas as seções.
- **Autenticação de Usuário:** Sistema completo com páginas para Login e Cadastro, utilizando validações eficientes de formulário.
- **Login com Google:** Opção de autenticação rápida e segura utilizando o Google OAuth.
- **Gerenciamento de Formulários:** Validação de dados e gerenciamento de estado dos formulários de forma otimizada.
- **Componentes Dinâmicos:** Uso de carrossel para exibição de conteúdo de forma interativa.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias e ferramentas:

- **React:** Biblioteca JavaScript para a construção da interface de usuário.
- **Vite:** Ferramenta de build moderna e extremamente rápida para o desenvolvimento front-end.
- **React Router DOM:** Para o gerenciamento de rotas e navegação entre as páginas da aplicação.
```bash
npm install react react-dom
```
- **React Hook Form:** Biblioteca de alta performance para gerenciamento de estados, validações e submissão de formulários.
```bash
npm install react-hook-form
```
- **React Slick & Slick Carousel:** Para a criação de carrosséis dinâmicos e responsivos.
```bash
npm install react-slick slick-carousel
```
- **@react-oauth/google:** Biblioteca oficial do Google para implementar a funcionalidade de login social.
```bash
npm install @react-oauth/google
```
- **jwt-decode:** Utilitário para decodificar tokens JWT (JSON Web Tokens) recebidos após a autenticação.
```bash
npm install jwt-decode
```
- **React Icons:** Biblioteca extensa para a utilização de ícones populares e consistentes em toda a aplicação.
```bash
npm install react-icons
```
- **React Toastify:** Notificações elegantes e personalizáveis.
```bash
npm install react-toastify

```
- **CSS3:** Estilização customizada com foco em responsividade e design moderno.
- **Bootstrap:** Framework CSS para responsividade e layout moderno.


## 📂 Estrutura de Pastas

O projeto segue uma arquitetura organizada para facilitar a escalabilidade e manutenção:

```bash
/src
|-- /assets
|-- /components
|   |-- /Button
|   |-- /EquipeCarrosel
|   |-- /Footer
|   |-- /LoginGoogle
|   |-- /Navbar
|-- /context
|-- /layout
|-- /mocks
|-- /pages
|   |-- /Cadastro
|   |-- /Cadastro-item
|   |-- /Carrinho
|   |-- /Contato
|   |-- /Home
|   |-- /ItemDetalhe
|   |-- /Login
|   |-- /NovaSenha
|   |-- /Produtos
|   |-- /RedefinirSenha
|   |-- /Sobre-nos
|   |-- /Perfil
|-- App.jsx
|-- main.jsx
|-- ... (outros arquivos de configuração)

```

## 🚀 Como Executar o Projeto

Para rodar este projeto em sua máquina local, siga os passos abaixo:

1.  **Clone o repositório**
    ```bash
    git clone https://github.com/Gustavo-Nog/feira-solidaria.git

    ```

2.  **Navegue até a pasta do projeto**
    ```bash
    cd frontend 
    ```

3.  **Instale todas as dependências do projeto**
    (Este comando instalará React, Vite, e todas as bibliotecas listadas acima)
    ```bash
    npm install
    ```

4.  **Execute o servidor de desenvolvimento**
    ```bash
    npm run dev
    ```

5.  Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada no seu terminal).

## 👥 Contribuidores

Este projeto foi desenvolvido com dedicação pela seguinte equipe de alunos do programa **Capacita Brasil**. Nossas sinceras gratidões a todos que fizeram parte desta jornada.

| Nome Completo     | GitHub                            | Contribuição Principal                                     |
| :---------------- | :---------------------------------| :--------------------------------------------------------- |
| `Gabriel`         | (https://github.com/gabrielcrispim-c)     | `RedefinirSenha, NovaSenha e Produtos, criação do protótipo da tela de detalhamento de item`                    |
| `Gustavo`         | (https://github.com/Gustavo-Nog)     | `Login, Cadastro, Sobre nos, Contato e Produtos`                       |
| `Henrique`        | (https://github.com/HenriqueAdriel)     | `Perfil do usuário`                            |
| `Hudson`          | (https://github.com/Hudson2207)     | `Implementação de APIs e Gerenciamento de Estado`          |
| `Marianna`        | (https://github.com/Marionofree)     | `Cadastro de Item`          |
| `Thierry`         | (https://github.com/Thierry-DV)   | `Home, NavBar, Footer e responvidade desses dois components`|


---

Agradecemos por visitar nosso projeto!
