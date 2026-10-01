# Resumir somente receitas da sessão

Pessoa: **Guilherme Anjolette** · trilha: **back-end / SQL** · tarefa **3/3**.
A primeira tarefa é a prioridade da aula; as demais são continuação. Estimativa de exercício: 15–25 min; tempo de integração adicional pode ser necessário.

## Objetivo e spec

GET /api/recipes/stats retorna {count,lastSavedAt}, count numérico e null sem registros. Agregação filtrada ownerId no SQL, no-store; não carregar todas as linhas em memória.

Antes de codar, escreva uma spec curta com problema, usuário, trabalho desejado, comportamento antes/depois, evidência de resultado, valor e restrições. Separe hipótese didática de necessidade validada e inclua sucesso/erro/limites. Consulte [problema e segurança](https://github.com/kipperacademy/image-cropper/blob/aula/workflow-ia/docs/aula/PROBLEMA-E-SEGURANCA.md). Leia [os contratos](https://github.com/kipperacademy/image-cropper/blob/aula/workflow-ia/docs/aula/CONTRATOS.md). Use a base `aula/workflow-ia`.

## Arquivos e paralelismo

Ownership: `src/app/api/recipes/stats/route.ts`. Não está sozinho no projeto: preserve trabalho dos colegas.
Independente no módulo; integração final feita pelo instrutor. Não iniciar alteração em arquivos compartilhados.
Não editar `ImageCropper.tsx`, `RecipeHistory.tsx`, `contracts.ts`, `db/schema.ts`, `package.json` ou o GET/POST existente em paralelo. Caso precise, descreva patch exato no PR para integração serial. Uma tarefa com UI pendente de integração ainda não está pronta.

Use worktree/branch própria e porta própria. Se acessar dados, crie branch Neon a partir de `aula-base`; configure a URL dessa branch. Nunca use `main` para experimentos.

## Critérios de aceite e evidências

- Sessão A com dados, B vazia, tipos de retorno JSON e isolamento.
- Comportamento descrito demonstrado, sem secrets, ownerId ou arquivos pessoais nos logs/PR.
- Mudança tem evidência proporcional: teste de regra importante, API real quando houver banco, navegador quando houver UI. Execute os checks exigidos pela mudança.
- PR inclui spec, arquivos alterados, limites e evidências; se houver patch de integração, instrutor aplica e verifica antes de fechar a issue.

## Pergunta antes de chamar o agente

Onde deve acontecer o filtro de autorização ao agregar?

Escreva sua previsão; depois compare com o comportamento observado. Explique uma decisão sem consultar a IA.
