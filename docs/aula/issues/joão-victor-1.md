# Escolher dimensões da imagem exportada

Pessoa: **João Victor** · trilha: **front-end → fullstack** · tarefa **1/3**.
A primeira tarefa é a prioridade da aula; as demais são continuação. Estimativa de exercício: 15–25 min; tempo de integração adicional pode ser necessário.

## Objetivo e spec

Dimensões opcionais na exportação: preservar razão do corte atual, largura1..4096, altura derivada, opção tamanho original. Validação e componente independentes. Patch instrutor usa dimensões ao renderizar canvas final.

Antes de codar, escreva uma spec curta com problema, exemplo antes/depois, comportamento de sucesso, erro e limites. Leia [os contratos](https://github.com/kipperacademy/image-cropper/blob/aula/workflow-ia/docs/aula/CONTRATOS.md). Use a base `aula/workflow-ia`.

## Arquivos e paralelismo

Ownership: `src/lib/export/output-size.ts; src/components/OutputSizeControls.tsx`. Não está sozinho no projeto: preserve trabalho dos colegas.
Independente no módulo; integração final feita pelo instrutor. Não iniciar alteração em arquivos compartilhados.
Não editar `ImageCropper.tsx`, `RecipeHistory.tsx`, `contracts.ts`, `db/schema.ts`, `package.json` ou o GET/POST existente em paralelo. Caso precise, descreva patch exato no PR para integração serial. Uma tarefa com UI pendente de integração ainda não está pronta.

Use worktree/branch própria e porta própria. Se acessar dados, crie branch Neon a partir de `aula-base`; configure a URL dessa branch. Nunca use `main` para experimentos.

## Critérios de aceite e evidências

- Corte200x200 exporta100x100, default original e valores inválidos; geometria original não muda.
- Comportamento descrito demonstrado, sem secrets, ownerId ou arquivos pessoais nos logs/PR.
- Mudança tem evidência proporcional: teste de regra importante, API real quando houver banco, navegador quando houver UI. Execute os checks exigidos pela mudança.
- PR inclui spec, arquivos alterados, limites e evidências; se houver patch de integração, instrutor aplica e verifica antes de fechar a issue.

## Pergunta antes de chamar o agente

Alterar resolução de saída precisa alterar coordenadas do corte?

Escreva sua previsão; depois compare com o comportamento observado. Explique uma decisão sem consultar a IA.
