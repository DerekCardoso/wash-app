# Wash App

Aplicativo mobile para gerenciamento de lava-rápidos, permitindo que clientes encontrem e agendem serviços de lavagem de veículos, e que proprietários gerenciem seus estabelecimentos.

## Tecnologias

- React Native
- Expo
- TypeScript
- Firebase (Auth & Firestore)
- Expo Router

## Pré-requisitos

- Node.js 18+
- npm ou yarn
- Expo CLI
- Um dispositivo móvel ou emulador

## Instalação

1. Clone o repositório
```bash
git clone [URL_DO_REPOSITÓRIO]
cd wash
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações do Firebase.

4. Inicie o projeto
```bash
npm start
```

## Estrutura do Projeto

```
wash/
├── app/                    # Código fonte principal
│   ├── (auth)/            # Rotas de autenticação
│   ├── (customer)/        # Rotas do cliente
│   ├── (owner)/          # Rotas do proprietário
│   ├── components/        # Componentes compartilhados
│   ├── providers/         # Providers da aplicação
│   └── hooks/            # Hooks personalizados
├── assets/               # Recursos estáticos
├── constants/           # Constantes e configurações
└── types/              # Definições de tipos
```

## Convenções

Este projeto segue o padrão de [Conventional Commits](./COMMIT_CONVENTION.md) para mensagens de commit.

## Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm run android`: Inicia o app no Android
- `npm run ios`: Inicia o app no iOS
- `npm run web`: Inicia o app na web
- `npm test`: Executa os testes
- `npm run lint`: Executa o linter

## Contribuição

1. Crie uma branch a partir da `dev`
2. Faça suas alterações seguindo as convenções de commit
3. Envie um Pull Request para a branch `dev`

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
