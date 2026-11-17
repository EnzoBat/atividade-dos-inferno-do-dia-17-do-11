# Café Central — Aula 12 | UC11

Projeto didático completo de suporte a aplicações com **HTML, CSS e JavaScript puro**, sem dependências, backend ou banco de dados.

## O que contém

- `aluno/`: sistema com **três defeitos intencionais** (CC-401, CC-403 e CC-406) e duas funcionalidades a implementar (CC-404 e CC-408). Os chamados de dúvida (CC-402 e CC-407) e de serviço (CC-405) não exigem bugs.
- `instrutor/gabarito/`: versão corrigida e com as solicitações implementadas. **Não publique esta pasta em um repositório acessível aos alunos**.
- `instrutor/GUIA-INSTRUTOR.md`: roteiro, gabarito, evidências e avaliação.
- `docs/CHAMADOS-ALUNO.md`: chamados na linguagem dos usuários, sem respostas.
- `docs/FICHA-ATENDIMENTO.md`: formulário individual de atendimento.
- `docs/PLANO-DE-AULA.md`: distribuição dos 240 minutos e indicadores.

## Como executar

1. Baixe ou clone o repositório.
2. Abra `aluno/index.html` no navegador (ou utilize a extensão Live Server do VS Code).
3. Use o VS Code para editar `index.html`, `style.css` e `script.js`.
4. Faça os testes no navegador e registre os resultados.

**Atenção:** no primeiro acesso, o botão de cadastrar não funciona propositalmente. O chamado CC-401 orienta a investigação e a correção. Não forneça a pasta `instrutor` aos estudantes.

## Organização da atividade

A execução e a avaliação são **individuais**, com colaboração entre colegas permitida. Todos resolvem CC-401 e CC-402 na prática guiada; CC-403 a CC-406 são obrigatórios na prática autônoma; CC-407 e CC-408 são desafios complementares.

## Limitações intencionais

Os pedidos são armazenados somente no `localStorage` do navegador, não são compartilhados entre dispositivos e não representam dados reais. O sistema não processa pagamentos. Evite usar dados pessoais reais.

## Publicação no GitHub

Recomendação: publique somente `aluno/`, `docs/CHAMADOS-ALUNO.md` e `docs/FICHA-ATENDIMENTO.md` em um repositório público. Mantenha `instrutor/` em um repositório privado ou fora do GitHub. O arquivo `.gitignore` ignora a pasta `instrutor/` para reduzir o risco de divulgar o gabarito.
