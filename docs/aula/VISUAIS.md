# Imagens, diagramas e analogias para a aula

[Apresentação com seis diagramas](visuais/index.html): abra a pasta completa no navegador, selecione o conceito e avance por Pergunta → Diagrama → Feedback. Cada diagrama também está em SVG1600x900, para inserir em slides sem perda ao ampliar. Não precisa de internet para os diagramas. A simulação interativa de harness/URL está na conversa com o instrutor; ela é didática, não faz chamadas de API nem grava no Neon.

Use os visuais dentro dos blocos existentes da aula, substituindo explicações longas. Mostrar uma imagem não basta: pedir previsão, apontar elemento/seta que explica o resultado, executar demonstração real e retirar apoio para o aluno explicar depois.

| Momento de120min | Diagrama | Analogia | Pergunta de previsão |
|---|---|---|---|
|8–23|[Modelo e harness](visuais/01-modelo-harness.svg)|Motor versus conjunto do carro|Retornar function_call significa que a função já executou?|
|23–35|[Necessidade e spec](visuais/05-necessidade-e-spec.svg)|Móvel que precisa caber no espaço, medidas e teste de encaixe|Um botão resolve o problema se o arquivo não funciona no destino?|
|35–45|[Skills e segurança](visuais/06-skills-e-seguranca.svg)|Manual de oficina, ferramentas, conector e chaves de acesso|Ter a chave de uma sala significa autorização para entrar em qualquer sala?|
|45–57|[Worktrees](visuais/02-worktrees.svg)|Três bancadas com peças de trabalho próprias e acervo comum|Três pessoas na mesma bancada deixam de se atrapalhar por ter conversas separadas?|
|45–57|[Código e dados](visuais/03-codigo-e-dados.svg)|Cadernos de experimento com mesmo ponto de partida|Se A usa o caderno B, onde fica a anotação?|
|92–111|[Merge e migrations](visuais/04-merge-e-migrations.svg)|Unir instruções de montagem não transporta objetos construídos|Merge de código transporta os registros de teste?|

## Como explicar sem deixar a analogia virar erro

**Modelo/harness:** “O motor é uma parte essencial; direção, transmissão, controles e instrumentos mudam como o conjunto opera. O modelo também precisa de software ao redor para usar ferramentas.” Limite: motor não faz inferência, e essa metáfora não descreve tecnicamente uma rede neural. O harness pode distribuir execução entre computador local e serviços hospedados; não é apenas a interface do chat. Depois da foto, mostrar a sequência real tool call→executor→resultado.

**Worktrees:** “Bancadas separadas evitam que alguém mexa diretamente na peça do colega. O acervo do projeto continua compartilhado.” Limite: worktree não é máquina virtual ou sandbox de segurança; agentes podem acessar recursos compartilhados conforme suas permissões. Git não instala dependencies nem escolhe URL do banco. Na integração, alterações na mesma peça ainda exigem resolver diferenças.

**Branch Neon:** “Cada grupo inicia um caderno de experimento a partir do mesmo estado; novas anotações ficam no caderno escolhido.” Limite: não implica cópia física completa de dados; criação é executada pela ferramenta/serviço. Branch pode herdar dados reais e permissões precisam ser tratadas. A URL determina o caderno utilizado. Combine com marcador sintético real nas branches preparadas.

**Spec:** “O cliente precisa de um móvel que caiba e sirva a um uso. Medidas e teste de encaixe transformam intenção em critério.” Limite: projeto detalhado pode estar errado sobre a necessidade; spec não substitui conversar/validar. A única menção à aula anterior permanece antes deste exemplo no roteiro privado. Volte ao cropper: envio a canal que exige JPEG é hipótese didática, não descoberta de pesquisa.

**Skill/tool/MCP:** manual orienta procedimento; ferramenta executa; conector com formato padronizado ajuda interoperabilidade; chave/permissão controla acesso. Limite: MCP é protocolo de software, não um objeto físico nem uma licença para fazer tudo. Skill pode carregar scripts/referências, além de texto. Leia arquivos usados e destinos antes de executar, respeitando processo do time.

**Merge/migration:** integrar plantas/instruções atualiza como montar. Os objetos produzidos em outra bancada não aparecem automaticamente na sua. Limite: certas migrations também transformam dados; o ponto é que merge Git por si só não funde dados Neon. Aplicar migration e decidir movimentação de dados são operações explícitas.

## Duas fotografias encontradas

1. **Motor e chassi expostos** — [página da fotografia e crédito](https://commons.wikimedia.org/wiki/File:The_chassis_of_Tatra_T600_Tatraplan,_with_rear-mounted_flat-4_engine.jpg). Autor ChengH; [CC BY-SA3.0](https://creativecommons.org/licenses/by-sa/3.0/). A página tem nome Tatra, mas inclui correção para VW; usar legenda genérica “motor e chassi expostos”, sem ensinar identificação do veículo. Crédito sugerido: “Motor e chassi — ChengH / Wikimedia Commons, CC BY-SA3.0”. Ao adaptar, registrar mudanças e observar condições da licença. Use só como abertura visual15s, seguida do diagrama técnico.
2. **Bancada com ferramentas** — [Garage Workbench](https://commons.wikimedia.org/wiki/File:Garage_Workbench.jpg). Autor btwashburn; [CC BY2.0](https://creativecommons.org/licenses/by/2.0/). Crédito sugerido: “Garage Workbench — btwashburn / Wikimedia Commons, CC BY2.0”. Apontar bancada, peças e ferramentas; pedir ao aluno imaginar três bancadas separadas. Não é fotografia de três worktrees, é analogia.

As fotos são referências externas com créditos verificados; não foram copiadas nem modificadas no repositório. Os seis diagramas são novos e não usam essas fotografias.

## Atividade de aprendizagem com imagem —60–90s

1. Mostrar pergunta;20s para resposta individual.
2. Revelar diagrama; aluno aponta uma seta/elemento que justifica sua resposta.
3. Demonstrar comportamento real ou explicar resultado da simulação como simulação.
4. Feedback: “Você acertou X; falta considerar Y; o critério é Z.”
5. Ocultar imagem e mudar uma condição: mesma URL, função sem executor, merge sem migration. Pedir nova explicação.

Não ler o slide inteiro e falar o mesmo texto. Usar desenho curto, destacar o elemento da vez e ouvir a previsão. Reutilizar um desenho na saída sem rótulos verbalizados para recall. Não ensinar como fato explicações sobre cérebro/mão/arte que apareceram na conversa informal; o mecanismo da atividade é recuperar, verificar e receber feedback.

## Fontes técnicas

- [Function calling](https://developers.openai.com/api/docs/guides/function-calling): modelo solicita; aplicação executa/devolve resultado.
- [Git worktree](https://git-scm.com/docs/git-worktree): diretórios de trabalho ligados ao repositório.
- [Neon e Vercel](https://neon.com/blog/neon-vercel-native-integration): ambientes/branches na integração.
- [Skills](https://developers.openai.com/api/docs/guides/tools-skills) e [segurança de agentes](https://developers.openai.com/api/docs/guides/agent-builder-safety).
- [Prática de recuperação e feedback](https://www.retrievalpractice.org/feedback).
