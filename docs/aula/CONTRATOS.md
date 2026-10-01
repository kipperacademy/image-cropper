# Contratos e integração da aula

Base: branch `aula/workflow-ia`. O original é um editor 1:1 no navegador. Esta base acrescenta uma API e histórico real no Neon. Não contém as soluções das 30 tarefas.

## Comportamento atual

- Imagem via arquivo local; corte quadrado; preview; download PNG.
- `GET /api/recipes`: últimas 20 receitas da sessão, `{ items: CropRecipe[] }`.
- `POST /api/recipes`: `CropRecipeInput`, resposta 201 `{ item: CropRecipe }`.
- `crop_session`: cookie opaco HttpOnly de 7 dias, isolamento por navegador. Não é login nem autenticação para produto público; é uma capability anônima do laboratório. Não há recuperação após perder o cookie.
- Persistimos nome e geometria; nunca pixels, URLs blob ou base64 no Postgres. Uma receita não restaura a imagem original.
- `imageWidth/imageHeight`: inteiros positivos até 30.000. `x/y/width/height`: pixels naturais finitos, corte inteiramente dentro da imagem. A UI ainda permite apenas 1:1; o contrato suporta retângulos futuros.

## Regra para trabalhar em paralelo

Cada issue possui arquivos próprios. O instrutor integra alterações em `ImageCropper.tsx`, `RecipeHistory.tsx`, `page.tsx`, `contracts.ts`, `db/schema.ts`, `package.json` e no GET/POST atual de `/api/recipes` **uma por vez**. O agente cria seu módulo e descreve o patch de integração no PR; não altera esses arquivos compartilhados em paralelo. O resultado só está concluído quando o instrutor aplica o patch e verifica o comportamento na aplicação.

Freeze dos tipos: `CropRecipeInput` e `CropRecipe` em `src/lib/contracts.ts`. Formatos de exportação: `image/png`, `image/jpeg`, `image/webp`. Presets: `{ id, label, ratioWidth, ratioHeight }`, números positivos. Erros de novas rotas: `{ error: string }`; 400 inválido, 404 inexistente ou de outra sessão, 409 conflito, 503 indisponibilidade. Nunca retornar ownerId ou credenciais.

Não migre a aplicação para Kotlin/.NET/Java durante a aula: transfira conceitos de back-end para o Next.js/TypeScript existente. Não adicione microserviços, filas externas, login ou IA ao produto só para demonstrar ferramentas de desenvolvimento.

## Critério de pronto comum

1. Spec curta: problema, comportamento, escopo, exemplos e critério verificável.
2. Explicar contratos/dependências e por que a tarefa pode ou não rodar em paralelo.
3. Implementar módulo no escopo. Evidência funcional antes de pedir review.
4. Verificar `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`, conforme a mudança. Testar UI no navegador quando alterar interação.
5. PR pequeno com evidências e proposta exata de integração. Explicar uma decisão sem consultar o agente.

## Banco e worktrees

Worktree é outro diretório de trabalho ligado ao mesmo repositório Git, com checkout e índice próprios e objetos/histórico compartilhados. Não é outro clone completo. Git não cria banco, não copia `.env.local` e não inicia outro servidor.

Uma sessão = uma issue = uma branch Git = uma worktree = uma porta = uma branch Neon quando usar dados. Três chats no mesmo diretório não são três ambientes isolados.

Crie branches Neon a partir de `aula-base`, com dados sintéticos. Use URLs pooled na aplicação e direct/unpooled em migrations. A URL escolhida é o que liga código e dados; nomes iguais não fazem esse vínculo sozinhos.

Merge de Git integra código/migrations; não integra automaticamente registros de duas branches de banco. Aplique migrations revisadas à branch alvo. Não reexecute inserts experimentais do aluno na base.

Em Preview Vercel, confirmar que o endpoint aponta à branch de preview. Não assumir que a integração cria branches até observar uma branch nova e a URL correspondente. Para uma worktree local, o vínculo é explícito e independente do preview.
