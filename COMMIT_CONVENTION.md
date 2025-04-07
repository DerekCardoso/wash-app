# Convenção de Commits

Este projeto segue a especificação do [Conventional Commits](https://www.conventionalcommits.org/), que define um conjunto de regras para criar mensagens de commit explícitas.

## Formato da Mensagem

Cada mensagem de commit consiste em:
- **tipo(escopo)**: descrição
- [corpo opcional]
- [rodapé(s) opcional(is)]

### Tipos

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alterações na documentação
- `style`: Alterações que não afetam o significado do código (espaços em branco, formatação, etc)
- `refactor`: Alterações no código que não corrigem bugs nem adicionam funcionalidades
- `perf`: Alterações que melhoram a performance
- `test`: Adicionando ou corrigindo testes
- `chore`: Alterações em arquivos de configuração, build, etc
- `ci`: Alterações nos arquivos de CI
- `revert`: Reverte um commit anterior

### Escopos

O escopo deve ser o nome do módulo ou funcionalidade que está sendo alterada. Por exemplo:
- `auth`
- `customer`
- `owner`
- `ui`
- `api`

### Exemplos

```
feat(auth): adiciona autenticação com Google
fix(customer): corrige exibição do histórico de pedidos
docs(readme): atualiza instruções de instalação
style(ui): ajusta espaçamento nos cards
refactor(api): melhora estrutura das rotas
test(auth): adiciona testes para login social
```

### Regras

1. A mensagem deve ser em português
2. O tipo e o escopo devem ser em minúsculas
3. Não deve haver ponto final na descrição
4. A descrição deve usar o verbo no presente do indicativo ("adiciona", não "adicionado")
5. A descrição deve ter no máximo 72 caracteres
6. O corpo e rodapé devem ter no máximo 100 caracteres por linha

### Commits de Breaking Changes

Quando houver uma mudança que quebra a compatibilidade, você deve:
1. Adicionar um `!` após o escopo
2. Adicionar um rodapé começando com `BREAKING CHANGE:`

Exemplo:
```
feat(api)!: remove endpoint deprecated de pagamentos

BREAKING CHANGE: O endpoint /api/v1/payments foi removido. Use /api/v2/payments.
``` 