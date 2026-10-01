# Exportar recorte em PNG, JPEG e WebP

Pessoa: **Gabriel Morona** · trilha: **front-end** · tarefa **1/3**.
A primeira tarefa é a prioridade da aula; as demais são continuação. Estimativa de exercício: 15–25 min; tempo de integração adicional pode ser necessário.

## Objetivo e spec

Criar módulo de exportação a partir de canvas e seletor acessível de formato/qualidade. Nome/extensão/MIME coerentes; fundo branco para JPEG; verificar fallback de MIME do navegador. Propor troca do download atual em patch do instrutor.

Antes de codar, escreva uma spec curta com problema, exemplo antes/depois, comportamento de sucesso, erro e limites. Leia [os contratos](https://github.com/kipperacademy/image-cropper/blob/aula/workflow-ia/docs/aula/CONTRATOS.md). Use a base `aula/workflow-ia`.

## Arquivos e paralelismo

Ownership: `src/lib/export/image-export.ts; src/components/ExportOptions.tsx`. Não está sozinho no projeto: preserve trabalho dos colegas.
Independente no módulo; integração final feita pelo instrutor. Não iniciar alteração em arquivos compartilhados.
Não editar `ImageCropper.tsx`, `RecipeHistory.tsx`, `contracts.ts`, `db/schema.ts`, `package.json` ou o GET/POST existente em paralelo. Caso precise, descreva patch exato no PR para integração serial. Uma tarefa com UI pendente de integração ainda não está pronta.

Use worktree/branch própria e porta própria. Se acessar dados, crie branch Neon a partir de `aula-base`; configure a URL dessa branch. Nunca use `main` para experimentos.

## Critérios de aceite e evidências

- Baixar os três formatos; conferir tipo real, dimensões naturais e JPEG sem fundo preto indesejado.
- Comportamento descrito demonstrado, sem secrets, ownerId ou arquivos pessoais nos logs/PR.
- Mudança tem evidência proporcional: teste de regra importante, API real quando houver banco, navegador quando houver UI. Execute os checks exigidos pela mudança.
- PR inclui spec, arquivos alterados, limites e evidências; se houver patch de integração, instrutor aplica e verifica antes de fechar a issue.

## Pergunta antes de chamar o agente

Como provar que mudar a extensão produziu outro formato de imagem?

Escreva sua previsão; depois compare com o comportamento observado. Explique uma decisão sem consultar a IA.
