# Adicionar presets de razão na interface

Pessoa: **João Victor** · trilha: **front-end** · tarefa **3/3**.
A primeira tarefa é a prioridade da aula; as demais são continuação. Estimativa de exercício: 25–40 min; tempo de integração adicional pode ser necessário.

## Objetivo e spec

Seletor1:1/4:3/16:9 e função que encontra retângulo centrado contido na imagem. Integrar catálogo se disponível, fallback documentado. Motor atual é quadrado: entregar plano/patch do instrutor para width/height e drag; não declarar pronto apenas por criar botões.

Antes de codar, escreva uma spec curta com problema, exemplo antes/depois, comportamento de sucesso, erro e limites. Leia [os contratos](https://github.com/kipperacademy/image-cropper/blob/aula/workflow-ia/docs/aula/CONTRATOS.md). Use a base `aula/workflow-ia`.

## Arquivos e paralelismo

Ownership: `src/components/AspectRatioPicker.tsx; src/lib/crop/aspect-ratio.ts`. Não está sozinho no projeto: preserve trabalho dos colegas.
Independente no módulo; integração final feita pelo instrutor. Não iniciar alteração em arquivos compartilhados.
Não editar `ImageCropper.tsx`, `RecipeHistory.tsx`, `contracts.ts`, `db/schema.ts`, `package.json` ou o GET/POST existente em paralelo. Caso precise, descreva patch exato no PR para integração serial. Uma tarefa com UI pendente de integração ainda não está pronta.

Use worktree/branch própria e porta própria. Se acessar dados, crie branch Neon a partir de `aula-base`; configure a URL dessa branch. Nunca use `main` para experimentos.

## Critérios de aceite e evidências

- Função em imagem estreita e larga; após integração preview e arquivo devem respeitar razão.
- Comportamento descrito demonstrado, sem secrets, ownerId ou arquivos pessoais nos logs/PR.
- Mudança tem evidência proporcional: teste de regra importante, API real quando houver banco, navegador quando houver UI. Execute os checks exigidos pela mudança.
- PR inclui spec, arquivos alterados, limites e evidências; se houver patch de integração, instrutor aplica e verifica antes de fechar a issue.

## Pergunta antes de chamar o agente

Qual evidência diferencia botão decorativo de funcionalidade concluída?

Escreva sua previsão; depois compare com o comportamento observado. Explique uma decisão sem consultar a IA.
