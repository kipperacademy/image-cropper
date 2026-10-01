# Criar hook de salvamento com estados explícitos

Pessoa: **Rodrigo Sena** · trilha: **front-end / estados** · tarefa **2/3**.
A primeira tarefa é a prioridade da aula; as demais são continuação. Estimativa de exercício: 15–25 min; tempo de integração adicional pode ser necessário.

## Objetivo e spec

Hook idle/saving/success/error, mensagens acessíveis, evitar envio duplo enquanto pendente; recebe fetcher para ensaio. Não retry automático do POST não idempotente. Patch instrutor substitui trecho save atual uma vez.

Antes de codar, escreva uma spec curta com problema, usuário, trabalho desejado, comportamento antes/depois, evidência de resultado, valor e restrições. Separe hipótese didática de necessidade validada e inclua sucesso/erro/limites. Consulte [problema e segurança](https://github.com/kipperacademy/image-cropper/blob/aula/workflow-ia/docs/aula/PROBLEMA-E-SEGURANCA.md). Leia [os contratos](https://github.com/kipperacademy/image-cropper/blob/aula/workflow-ia/docs/aula/CONTRATOS.md). Use a base `aula/workflow-ia`.

## Arquivos e paralelismo

Ownership: `src/hooks/useSaveRecipe.ts; src/components/SaveRecipeStatus.tsx`. Não está sozinho no projeto: preserve trabalho dos colegas.
Independente no módulo; integração final feita pelo instrutor. Não iniciar alteração em arquivos compartilhados.
Não editar `ImageCropper.tsx`, `RecipeHistory.tsx`, `contracts.ts`, `db/schema.ts`, `package.json` ou o GET/POST existente em paralelo. Caso precise, descreva patch exato no PR para integração serial. Uma tarefa com UI pendente de integração ainda não está pronta.

Use worktree/branch própria e porta própria. Se acessar dados, crie branch Neon a partir de `aula-base`; configure a URL dessa branch. Nunca use `main` para experimentos.

## Critérios de aceite e evidências

- Sucesso, 400, 503, perda de rede e duplo clique; sem duplicar request pendente.
- Comportamento descrito demonstrado, sem secrets, ownerId ou arquivos pessoais nos logs/PR.
- Mudança tem evidência proporcional: teste de regra importante, API real quando houver banco, navegador quando houver UI. Execute os checks exigidos pela mudança.
- PR inclui spec, arquivos alterados, limites e evidências; se houver patch de integração, instrutor aplica e verifica antes de fechar a issue.

## Pergunta antes de chamar o agente

Pode repetir um POST automaticamente depois de timeout?

Escreva sua previsão; depois compare com o comportamento observado. Explique uma decisão sem consultar a IA.
