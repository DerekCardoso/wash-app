module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nova funcionalidade
        'fix',      // Correção de bugs
        'docs',     // Documentação
        'style',    // Alterações que não afetam o significado do código
        'refactor', // Refatoração de código
        'perf',     // Melhorias de performance
        'test',     // Adicionando ou corrigindo testes
        'chore',    // Alterações em arquivos de configuração, build, etc
        'ci',       // Alterações em arquivos de CI
        'revert',   // Revertendo commits
      ],
    ],
    'type-case': [2, 'always', 'lower'],
    'type-empty': [2, 'never'],
    'scope-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
  },
}; 