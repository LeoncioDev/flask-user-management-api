# flask-user-management-api

API RESTful desenvolvida em Flask para gerenciamento completo de usuários, integrada com banco Supabase via SQLAlchemy. Suporta operações CRUD com tratamento de erros e estrutura modularizada.

---

## 🛠 Tecnologias Utilizadas

- Python 3.11+
- Flask
- Flask-CORS
- SQLAlchemy
- python-dotenv
- Supabase (PostgreSQL)

---

## 🚀 Funcionalidades

- Listar todos os usuários
- Criar novos usuários
- Atualizar usuários existentes
- Deletar usuários
- Interface web simples para visualização dos usuários

---

## 📁 Estrutura do Projeto

flask-user-management-api/
├── app.py # Ponto de entrada da aplicação
├── extensions.py # Inicialização da extensão SQLAlchemy
├── models.py # Definição do modelo User
├── routes.py # Definição das rotas da API
├── requirements.txt # Dependências do projeto
├── .env # Variáveis de ambiente (não versionar)
├── .gitignore # Arquivos e pastas ignorados pelo git
├── static/ # Arquivos estáticos (CSS, JS)
│ ├── main.js
│ └── style.css
└── templates/ # Templates HTML
└── users.html

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

