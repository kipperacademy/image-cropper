# Verificar retry e rollback do salvamento idempotente

Pessoa: **Matheus Henrique de Azevedo** · trilha: **back-end / confiabilidade** · tarefa **2/3**.
A primeira tarefa é a prioridade da aula; as demais são continuação. Estimativa de exercício: 25–40 min; tempo de integração adicional pode ser necessário.

## Objetivo e spec

Após serviço idempotente integrado, teste real em branch Neon de teste: chamadas simultâneas, resposta perdida simulada após commit e falha antes de commit. Dados sintéticos com ids próprios, cleanup só desses ids. Não executar em main.

Antes de codar, escreva uma spec curta com problema, exemplo antes/depois, comportamento de sucesso, erro e limites. Leia [os contratos](https://github.com/kipperacademy/image-cropper/blob/aula/workflow-ia/docs/aula/CONTRATOS.md). Use a base `aula/workflow-ia`.

## Arquivos e paralelismo

Ownership: `tests/idempotency.integration.test.ts; docs/aula/evidencias/retry.md`. Não está sozinho no projeto: preserve trabalho dos colegas.
Depende da tarefa 1 de Matheus e da migration integrada pelo instrutor.
Não editar `ImageCropper.tsx`, `RecipeHistory.tsx`, `contracts.ts`, `db/schema.ts`, `package.json` ou o GET/POST existente em paralelo. Caso precise, descreva patch exato no PR para integração serial. Uma tarefa com UI pendente de integração ainda não está pronta.

Use worktree/branch própria e porta própria. Se acessar dados, crie branch Neon a partir de `aula-base`; configure a URL dessa branch. Nunca use `main` para experimentos.

## Critérios de aceite e evidências

- Uma receita após repetição; rollback não deixa chave órfã; relato da sequência e observação SQL.
- Comportamento descrito demonstrado, sem secrets, ownerId ou arquivos pessoais nos logs/PR.
- Mudança tem evidência proporcional: teste de regra importante, API real quando houver banco, navegador quando houver UI. Execute os checks exigidos pela mudança.
- PR inclui spec, arquivos alterados, limites e evidências; se houver patch de integração, instrutor aplica e verifica antes de fechar a issue.

## Pergunta antes de chamar o agente

Por que um mock que sempre retorna sucesso não comprova atomicidade?

Escreva sua previsão; depois compare com o comportamento observado. Explique uma decisão sem consultar a IA.
