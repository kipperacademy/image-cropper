# Importar lote de receitas atomicamente

Pessoa: **Guilherme Anjolette** · trilha: **back-end / transações** · tarefa **2/3**.
A primeira tarefa é a prioridade da aula; as demais são continuação. Estimativa de exercício: 15–25 min; tempo de integração adicional pode ser necessário.

## Objetivo e spec

POST /api/recipes/import aceita {items} de1..10, body<=40KiB, Origin e sessão. Validar todas antes de inserir e usar transação. Retornar201 {items} sem ownerId; nenhuma gravação se qualquer item falha.

Antes de codar, escreva uma spec curta com problema, usuário, trabalho desejado, comportamento antes/depois, evidência de resultado, valor e restrições. Separe hipótese didática de necessidade validada e inclua sucesso/erro/limites. Consulte [problema e segurança](https://github.com/kipperacademy/image-cropper/blob/aula/workflow-ia/docs/aula/PROBLEMA-E-SEGURANCA.md). Leia [os contratos](https://github.com/kipperacademy/image-cropper/blob/aula/workflow-ia/docs/aula/CONTRATOS.md). Use a base `aula/workflow-ia`.

## Arquivos e paralelismo

Ownership: `src/app/api/recipes/import/route.ts; src/lib/recipes/import-input.ts`. Não está sozinho no projeto: preserve trabalho dos colegas.
Independente no módulo; integração final feita pelo instrutor. Não iniciar alteração em arquivos compartilhados.
Não editar `ImageCropper.tsx`, `RecipeHistory.tsx`, `contracts.ts`, `db/schema.ts`, `package.json` ou o GET/POST existente em paralelo. Caso precise, descreva patch exato no PR para integração serial. Uma tarefa com UI pendente de integração ainda não está pronta.

Use worktree/branch própria e porta própria. Se acessar dados, crie branch Neon a partir de `aula-base`; configure a URL dessa branch. Nunca use `main` para experimentos.

## Critérios de aceite e evidências

- Lote válido, item inválido no meio e falha controlada: ausência de gravação parcial.
- Comportamento descrito demonstrado, sem secrets, ownerId ou arquivos pessoais nos logs/PR.
- Mudança tem evidência proporcional: teste de regra importante, API real quando houver banco, navegador quando houver UI. Execute os checks exigidos pela mudança.
- PR inclui spec, arquivos alterados, limites e evidências; se houver patch de integração, instrutor aplica e verifica antes de fechar a issue.

## Pergunta antes de chamar o agente

Se nove inserts deram certo e o décimo falhou, qual promessa fizemos?

Escreva sua previsão; depois compare com o comportamento observado. Explique uma decisão sem consultar a IA.
