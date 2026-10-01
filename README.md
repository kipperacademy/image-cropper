# Image Cropper — laboratório Kipper Academy

Editor de imagem local com corte1:1, preview e download PNG. A base da aula acrescenta histórico de receitas de corte no Neon Postgres; armazena nome e geometria, sem enviar a imagem. Receitas pertencem ao navegador por cookie anônimo de7 dias; isso não é login e não recupera arquivos perdidos.

## Aula de workflow com IA

Base: `aula/workflow-ia`. [Tarefas por pessoa](docs/aula/TAREFAS.md) · [Contratos e ownership](docs/aula/CONTRATOS.md) · [Prompt de delegação](docs/aula/PROMPT-DELEGACAO.md).

Trinta issues são três exercícios por pessoa. Priorize tarefa1 na aula,2/3 na continuação. Módulos separados permitem trabalho paralelo; o instrutor integra arquivos compartilhados uma vez por tarefa e confirma o resultado na aplicação.

## Executar

Node24 recomendado. Instale com `npm ci`. Crie branch Neon de desenvolvimento a partir de `aula-base` e preencha `.env.local` a partir de `.env.example`: DATABASE_URL pooled na aplicação e DATABASE_URL_UNPOOLED para migrations. Nunca use uma branch principal para exercícios.

Com Neon CLI autenticada e branch existente, `node scripts/branch-env.mjs <project-id> <branch-name>` cria arquivo privado sem imprimir credenciais; recusa main e sobrescrita de `.env.local`. Não copia configuração entre worktrees.

`npm run db:migrate` aplica migrations à URL configurada; confira a branch primeiro. `npm run dev -- --port 3100` inicia a aplicação. Cada checkout precisa de dependencies, porta e ambiente próprios.

Checks: `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`. Alterações de banco exigem também evidência real em branch isolada; UI exige verificação no navegador.

## Persistência e deploy

Drizzle/pg em rotas Next.js, pool de conexões para Vercel Functions. Schema/migration em `src/lib/db` e `drizzle`. GET/POST `/api/recipes` usam sessão e validam geometria. Base preparada para Vercel; configure URLs por ambiente/branch. Merge Git não integra registros Neon. Não assumir branches automáticas de preview sem verificá-las.

Este é um laboratório: sem login de produto, quota por usuário ou garantia de recuperação. Não armazene conteúdo pessoal nas branches de exercícios. Não faça deploy público de produção ampliado sem definir esses requisitos.

## Demonstração de harness

`scripts/harness-demo.mjs` compara sem ferramentas, web hospedada, função declarada sem executor e função realmente executada pelo programa. Não faz chamadas até ser invocado; requer chave privada e acesso ao modelo. Modos: `none`, `web`, `declare`, `execute`. Exemplo: `node --env-file=.env.local scripts/harness-demo.mjs declare`. OPENAI_MODEL é configurável. Nunca coloque OPENAI_API_KEY em variável NEXT_PUBLIC.
