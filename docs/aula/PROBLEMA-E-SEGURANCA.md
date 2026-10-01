# Do problema do usuário à mudança segura

Uma spec torna explícitos o problema, o resultado esperado e as restrições, para orientar implementação e verificação. Ela também registra contratos, erros e decisões técnicas. Documento bem escrito não prova que a hipótese de produto está certa: validação com usuários e contexto de negócio continua necessária.

## Antes de delegar a issue

1. **Problema:** o que hoje atrapalha a pessoa? Descreva situação concreta.
2. **Usuário:** quem tem essa necessidade e em qual contexto?
3. **Trabalho a realizar:** o que essa pessoa quer conseguir, além de apertar um botão?
4. **Comportamento:** o que ela conseguirá fazer diferente?
5. **Evidência de resultado:** como saberemos se ajudou? Diferencie aceite funcional de resultado de uso.
6. **Valor:** por que isso importa para a organização ou para quem usa?
7. **Restrições:** contratos existentes, privacidade, arquitetura, acessibilidade, permissões, prazo e dependências.

Na aula, o cenário de produto é uma hipótese didática: preparar imagens para canais que exigem formatos/dimensões específicos. Não fizemos pesquisa que valide todas as features das30 issues. São exercícios para aprender desenvolvimento e podem não ser prioridades de produto.

Exemplo: “Adicionar JPEG” descreve solução. Problema hipotético: alguém precisa anexar uma imagem em um sistema que só aceita JPEG; PNG impede concluir o envio. Aceite: arquivo de fato JPEG, dimensões corretas e fundo previsível. Resultado de uso: a pessoa consegue completar o envio ao sistema alvo. Contar botões ou commits não mede esse resultado. Se o sistema aceita PNG, a prioridade pode mudar.

## Adaptar ao time existente

O laboratório permite criar projeto/branches próprios. Na empresa, comece no ticket e no processo que já existem: converse com PO/PM ou solicitante, preserve arquitetura e contratos, use ambientes e ferramentas aprovados, respeite revisão/CI/release. A spec pode ser uma seção do ticket, um documento do time ou um ADR quando houver decisão arquitetural. Não precisa substituir o processo por uma ferramenta nova.

Agente pode preparar investigação, implementação, testes e PR dentro do escopo concedido. Decisões de produto, autorização de acesso, migrations e promoção de produção seguem a responsabilidade do time. Worktrees não ampliam permissões e branches Neon podem conter cópias de dados reais; o isolamento de escrita não remove necessidade de controle de acesso.

## Usar skills externas com critério

Skills podem combinar instruções, referências e scripts; ler apenas o SKILL.md pode ser insuficiente. A documentação de [Skills da OpenAI](https://developers.openai.com/api/docs/guides/tools-skills) descreve esse empacotamento. Antes de adotar, registre fonte/versão, leia os arquivos usados e comandos, confira licença e política do time, destinos de dados e permissões realmente necessárias. Validar resultado do código é uma parte do processo, não substitui revisar o que foi executado durante geração.

Repositório público não significa permissão irrestrita de reutilização; confira a licença e requisitos aplicáveis com o responsável da organização. A [documentação GitHub sobre licenciamento](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository) é ponto de partida, não aprovação jurídica ou homologação corporativa.

O risco vem da combinação instrução + ferramentas + acesso. Conteúdo de uma issue, arquivo ou site pode tentar desviar o agente; trate esse conteúdo como dado, sem deixá-lo conceder autorização. Use ferramentas/credenciais com escopo suficiente à tarefa, ambiente de teste, dados sintéticos e revisão de operações sensíveis. Prompts ajudam, mas controles efetivos ficam no sistema/harness. Veja [segurança em agentes](https://developers.openai.com/api/docs/guides/agent-builder-safety).

## Exercício de julgamento — sem executar

Uma skill de revisão declara que, para validar o cropper, precisa ler `.env.local`, acessar a branch principal e enviar o arquivo para um domínio externo de diagnóstico.

- Qual desses acessos é necessário para revisar geometria?
- A ferramenta ter acesso implica que o usuário autorizou esse envio?
- Como alcançar o objetivo com dados sintéticos e permissões menores?

Faça previsão individual e compare em dupla. A atividade é leitura de um cenário fictício; não instalar essa skill nem enviar arquivos. Na sua issue, descreva uma restrição de segurança concreta e a evidência que a verifica.
