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
- **React Hook Form:** Biblioteca de alta performance para gerenciamento de estados, validações e submissão de formulários.
- **React Slick & Slick Carousel:** Para a criação de carrosséis dinâmicos e responsivos.
- **@react-oauth/google:** Biblioteca oficial do Google para implementar a funcionalidade de login social.
- **jwt-decode:** Utilitário para decodificar tokens JWT (JSON Web Tokens) recebidos após a autenticação.
- **React Icons:** Biblioteca extensa para a utilização de ícones populares e consistentes em toda a aplicação.
- **CSS3:** Estilização customizada com foco em responsividade e design moderno.

## 📂 Estrutura de Pastas

O projeto segue uma arquitetura organizada para facilitar a escalabilidade e manutenção:

```
/src
|-- /assets         # Imagens globais, logos e fontes
|-- /components     # Componentes reutilizáveis (Navbar, Footer, Button, etc.)
|-- /layout         # Componentes de layout principal (ex: com Navbar e Footer)
|-- /mocks          # Dados mocados para simular APIs
|-- /pages          # Componentes que representam as páginas (Home, Login, etc.)
|-- App.jsx         # Componente raiz com a configuração das rotas
|-- main.jsx        # Ponto de entrada da aplicação
```

## 🚀 Como Executar o Projeto

Para rodar este projeto em sua máquina local, siga os passos abaixo:

1.  **Clone o repositório**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO_AQUI]
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
| `Thierry`         | (https://github.com/Thierry-DV)   | `Home, NavBar, Footer e responvidade desses dois components`|
| `Gustavo`         | (https://github.com/usuario2)     | `Design UI/UX e Estilização com CSS`                       |
| `Marianna`        | (https://github.com/usuario3)     | `Lógica de Autenticação (Login/Cadastro) e Rotas`          |
| `Gabriel`         | (https://github.com/gabrielcrispim-c)     | `RedefinirSenha, NovaSenha, criação do protótipo da tela de detalhamento de item`                    |
| `Hudson`          | (https://github.com/usuario5)     | `Implementação de APIs e Gerenciamento de Estado`          |
| `Henrique`        | (https://github.com/usuario6)     | `Documentação Técnica e Testes`                            |

---

Agradecemos por visitar nosso projeto!
