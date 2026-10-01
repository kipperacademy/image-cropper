# Adicionar paginação estável por cursor

Pessoa: **Matheus Henrique de Azevedo** · trilha: **back-end / paginação** · tarefa **3/3**.
A primeira tarefa é a prioridade da aula; as demais são continuação. Estimativa de exercício: 25–40 min; tempo de integração adicional pode ser necessário.

## Objetivo e spec

GET /api/recipes/page?cursor=&limit=, limit1..20. Cursor valida timestamp+UUID, ordenação desc createdAt+id, filtro ownerId e condição composta. Retorna {items,nextCursor}. Não usar offset; patch de consumidor futuro separado.

Antes de codar, escreva uma spec curta com problema, exemplo antes/depois, comportamento de sucesso, erro e limites. Leia [os contratos](https://github.com/kipperacademy/image-cropper/blob/aula/workflow-ia/docs/aula/CONTRATOS.md). Use a base `aula/workflow-ia`.

## Arquivos e paralelismo

Ownership: `src/lib/recipes/cursor.ts; src/app/api/recipes/page/route.ts`. Não está sozinho no projeto: preserve trabalho dos colegas.
Independente no módulo; integração final feita pelo instrutor. Não iniciar alteração em arquivos compartilhados.
Não editar `ImageCropper.tsx`, `RecipeHistory.tsx`, `contracts.ts`, `db/schema.ts`, `package.json` ou o GET/POST existente em paralelo. Caso precise, descreva patch exato no PR para integração serial. Uma tarefa com UI pendente de integração ainda não está pronta.

Use worktree/branch própria e porta própria. Se acessar dados, crie branch Neon a partir de `aula-base`; configure a URL dessa branch. Nunca use `main` para experimentos.

## Critérios de aceite e evidências

- Empate de timestamps, cursor inválido, duas páginas sem repetição e isolamento; inserir entre páginas documentar sem snapshot.
- Comportamento descrito demonstrado, sem secrets, ownerId ou arquivos pessoais nos logs/PR.
- Mudança tem evidência proporcional: teste de regra importante, API real quando houver banco, navegador quando houver UI. Execute os checks exigidos pela mudança.
- PR inclui spec, arquivos alterados, limites e evidências; se houver patch de integração, instrutor aplica e verifica antes de fechar a issue.

## Pergunta antes de chamar o agente

Ordenar só por data basta quando duas receitas têm mesmo timestamp?

Escreva sua previsão; depois compare com o comportamento observado. Explique uma decisão sem consultar a IA.
