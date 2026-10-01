# Validar arquivos e permitir tentar de novo

Pessoa: **Gabriel Morona** · trilha: **front-end** · tarefa **2/3**.
A primeira tarefa é a prioridade da aula; as demais são continuação. Estimativa de exercício: 15–25 min; tempo de integração adicional pode ser necessário.

## Objetivo e spec

Validar tipo PNG/JPEG/WebP e limite de 20 MiB antes da decodificação. Tratar erro de imagem corrompida, limpar erro no próximo arquivo e aceitar o mesmo arquivo novamente. Patch de integração proposto, sem alterar componente central.

Antes de codar, escreva uma spec curta com problema, exemplo antes/depois, comportamento de sucesso, erro e limites. Leia [os contratos](https://github.com/kipperacademy/image-cropper/blob/aula/workflow-ia/docs/aula/CONTRATOS.md). Use a base `aula/workflow-ia`.

## Arquivos e paralelismo

Ownership: `src/lib/upload/validate-image.ts; src/components/UploadFeedback.tsx`. Não está sozinho no projeto: preserve trabalho dos colegas.
Independente no módulo; integração final feita pelo instrutor. Não iniciar alteração em arquivos compartilhados.
Não editar `ImageCropper.tsx`, `RecipeHistory.tsx`, `contracts.ts`, `db/schema.ts`, `package.json` ou o GET/POST existente em paralelo. Caso precise, descreva patch exato no PR para integração serial. Uma tarefa com UI pendente de integração ainda não está pronta.

Use worktree/branch própria e porta própria. Se acessar dados, crie branch Neon a partir de `aula-base`; configure a URL dessa branch. Nunca use `main` para experimentos.

## Critérios de aceite e evidências

- Arquivo válido, PDF, >20MiB, imagem corrompida com extensão correta e reenvio do mesmo arquivo.
- Comportamento descrito demonstrado, sem secrets, ownerId ou arquivos pessoais nos logs/PR.
- Mudança tem evidência proporcional: teste de regra importante, API real quando houver banco, navegador quando houver UI. Execute os checks exigidos pela mudança.
- PR inclui spec, arquivos alterados, limites e evidências; se houver patch de integração, instrutor aplica e verifica antes de fechar a issue.

## Pergunta antes de chamar o agente

Por que file.type não garante que os bytes são uma imagem?

Escreva sua previsão; depois compare com o comportamento observado. Explique uma decisão sem consultar a IA.
