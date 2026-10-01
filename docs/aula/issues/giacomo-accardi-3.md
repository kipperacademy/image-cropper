# Criar roteiro de verificação reproduzível

Pessoa: **Giacomo Accardi** · trilha: **qualidade / educação** · tarefa **3/3**.
A primeira tarefa é a prioridade da aula; as demais são continuação. Estimativa de exercício: 15–25 min; tempo de integração adicional pode ser necessário.

## Objetivo e spec

Roteiro com imagem pequena, retrato/paisagem, arquivo inválido, recorte em borda, reset, download, persistência após reload e dois navegadores isolados. Registrar esperado/observado e uma evidência por comportamento; usar arquivos sintéticos locais sem dados pessoais.

Antes de codar, escreva uma spec curta com problema, exemplo antes/depois, comportamento de sucesso, erro e limites. Leia [os contratos](https://github.com/kipperacademy/image-cropper/blob/aula/workflow-ia/docs/aula/CONTRATOS.md). Use a base `aula/workflow-ia`.

## Arquivos e paralelismo

Ownership: `docs/aula/evidencias/roteiro-manual.md; tests/fixtures/README.md`. Não está sozinho no projeto: preserve trabalho dos colegas.
Independente no módulo; integração final feita pelo instrutor. Não iniciar alteração em arquivos compartilhados.
Não editar `ImageCropper.tsx`, `RecipeHistory.tsx`, `contracts.ts`, `db/schema.ts`, `package.json` ou o GET/POST existente em paralelo. Caso precise, descreva patch exato no PR para integração serial. Uma tarefa com UI pendente de integração ainda não está pronta.

Use worktree/branch própria e porta própria. Se acessar dados, crie branch Neon a partir de `aula-base`; configure a URL dessa branch. Nunca use `main` para experimentos.

## Critérios de aceite e evidências

- Outra pessoa consegue repetir sem conversa adicional; ao menos5 casos executados.
- Comportamento descrito demonstrado, sem secrets, ownerId ou arquivos pessoais nos logs/PR.
- Mudança tem evidência proporcional: teste de regra importante, API real quando houver banco, navegador quando houver UI. Execute os checks exigidos pela mudança.
- PR inclui spec, arquivos alterados, limites e evidências; se houver patch de integração, instrutor aplica e verifica antes de fechar a issue.

## Pergunta antes de chamar o agente

Por que o agente dizer que terminou não serve como evidência?

Escreva sua previsão; depois compare com o comportamento observado. Explique uma decisão sem consultar a IA.
