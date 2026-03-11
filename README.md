<div align="center">

# 📊 MSY — ANALYTICS
### Monthly Insights · Sistema de Performance Mensal

[![Demo ao Vivo](https://img.shields.io/badge/Demo%20ao%20Vivo-GitHub%20Pages-brightgreen?style=for-the-badge&logo=github)](https://t4msy.github.io/MSY-ANALYTICS-MENSAL/)
[![Automação n8n](https://img.shields.io/badge/Automação-n8n-orange?style=for-the-badge&logo=n8n)](https://n8n.io/)
[![IA](https://img.shields.io/badge/IA-Gemini%202.5%20Flash-blueviolet?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)
[![Licença](https://img.shields.io/badge/Licença-MIT-blue?style=for-the-badge)](LICENSE)

**MSY Analytics** é uma ferramenta interna da Ordem Masayoshi que analisa o histórico de conversas do grupo e gera automaticamente um relatório mensal de performance por membro — semana a semana — para apoiar a Secretaria Geral na produção do relatório institucional.

[🚀 Acessar o projeto](https://t4msy.github.io/MSY-ANALYTICS-MENSAL/) · [🐛 Reportar Bug](https://github.com/T4Msy/MSY-ANALYTICS-MENSAL/issues) · [💡 Sugerir Melhoria](https://github.com/T4Msy/MSY-ANALYTICS-MENSAL/issues)

</div>

---

## ✨ Funcionalidades

- 📁 **Upload de histórico de chat** — Importa o arquivo `.txt` exportado do WhatsApp
- 📅 **Seleção de período** — Define início e fim do mês analisado (formato `DD/MM/AAAA`)
- 📆 **Seletor de mês** — Atalho para navegação rápida por mês
- 📊 **Tabela de mensagens por semana** — Exibe o total de mensagens de cada membro dividido por semanas (Domingo → Sábado)
- 🔢 **Total e média automáticos** — Calculados por membro e por semana
- 🏷️ **Filtros por membro** — Tags clicáveis para ocultar/exibir membros na tabela
- 🔍 **Busca de membro** — Campo de pesquisa em tempo real
- 🤖 **Geração de relatório com IA** — Endpoint separado com Gemini 2.5 Flash para produzir o relatório institucional formatado
- 📋 **Rodapé recalculado dinamicamente** — Totais e médias se ajustam automaticamente ao filtrar

---

## 🖼️ Visão Geral

> _A Secretaria Geral importa o histórico do mês, seleciona o período e recebe em segundos uma tabela detalhada por semana — pronta para embasar o relatório mensal da MSY._

| Etapa | Descrição |
|-------|-----------|
| 1 — Configurar | Selecionar mês, definir data de início e fim |
| 2 — Importar | Upload do arquivo `.txt` do histórico do grupo |
| 3 — Analisar | Enviar para o n8n processar e retornar a tabela |
| 4 — Filtrar | Usar as tags de membros para focar em quem interessa |
| 5 — Relatório | Usar os dados como base para o relatório institucional mensal |

---

## 🏗️ Arquitetura

```
Navegador (HTML/CSS/JS)
        │
        │  POST JSON (chat, inicio, fim)
        ▼
  Webhook n8n (/relatorio-mensal)
        │
        ▼
  Code Node (JavaScript)
  ├── Parse do histórico de chat linha a linha
  ├── Agrupamento por semanas (Domingo → Sábado)
  ├── Contagem de mensagens por membro por semana
  └── Geração do HTML da tabela com totais e médias
        │
        ▼
  Respond to Webhook ──► Navegador renderiza a tabela
  
  ─────────────────────────────────────────────────
  
  Webhook n8n (/relatorio-ia) [fluxo paralelo]
        │
        ▼
  Google Gemini 2.5 Flash
  (gera o relatório institucional formatado)
        │
        ▼
  Respond to Webhook ──► Texto do relatório retornado
```

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Frontend | HTML5, CSS3, JavaScript Vanilla |
| Seletor de datas | [Flatpickr](https://flatpickr.js.org/) |
| Automação | [n8n](https://n8n.io/) (self-hosted) |
| Túnel | Cloudflare Tunnel |
| IA | Google Gemini 2.5 Flash |
| Hospedagem | GitHub Pages |

---

## 📁 Estrutura do Projeto

```
MSY-ANALYTICS-MENSAL/
├── index.html                                   # Interface principal
├── styles.css                                   # Tema escuro institucional (vermelho/preto)
├── app.js                                       # Lógica do frontend e integração com n8n
└── MSY_-_ANALYTICS___Monthly_Insights.json      # Workflow n8n (importável)
```

---

## ⚙️ Workflow n8n

O arquivo `MSY_-_ANALYTICS___Monthly_Insights.json` contém dois fluxos independentes:

### Fluxo 1 — Análise de Mensagens (`/relatorio-mensal`)

1. **Webhook** — Recebe o histórico do chat e o período selecionado
2. **Code in JavaScript** — Faz o parse do `.txt`, agrupa por semanas, conta mensagens por membro e gera o HTML da tabela
3. **Respond to Webhook** — Retorna o HTML pronto para renderização no frontend

### Fluxo 2 — Relatório com IA (`/relatorio-ia`)

1. **Webhook** — Recebe os dados consolidados para geração do relatório
2. **Google Gemini 2.5 Flash** — Produz o relatório institucional formatado no padrão MSY
3. **Respond to Webhook** — Retorna o texto do relatório

---

## 📄 Formato do Relatório Gerado pela IA

O Gemini gera o relatório no formato institucional padrão da MSY:

```
𓂀 𝓜𝓢𝓨 — 𝓓𝓘𝓡𝓔𝓣𝓞𝓡𝓘𝓐 𓂀

Relatório Semanal — Masayoshi
Período analisado: [período]
Total de mensagens: [total]
Média diária do grupo: [média]

🩸 Visão Geral da Semana
🔺 Destaques da Semana (Top 3)
⚖ Análise Geral do Grupo
🎯 Metas e Direcionamento
🍷 Mensagem Final
```

---

## 🚀 Como Executar

### Frontend (sem configuração necessária)
O frontend é um site estático — basta hospedar no GitHub Pages ou abrir o `index.html` localmente.

### Backend (workflow n8n)

1. Instale o [n8n](https://docs.n8n.io/hosting/) (self-hosted ou cloud)
2. Importe o arquivo `MSY_-_ANALYTICS___Monthly_Insights.json` na sua instância
3. Configure as credenciais:
   - Chave de API Google Gemini (para o fluxo de relatório com IA)
4. Ative o workflow e copie as URLs dos webhooks
5. Substitua as URLs no `app.js` pelas suas URLs geradas

```javascript
// app.js
const response = await fetch("https://sua-instancia-n8n.com/webhook/relatorio-mensal", { ... });
```

### Formato do arquivo de chat

O sistema aceita o histórico exportado do **WhatsApp** no formato `.txt`. Cada linha deve seguir o padrão:

```
[DD/MM/AAAA, HH:MM] Nome do Membro: mensagem...
```

---

## 💡 Contexto do Projeto

> A Secretaria Geral da MSY precisa produzir mensalmente um relatório de participação dos membros. Antes deste sistema, esse processo era manual e demorado. O MSY Analytics automatiza toda a contagem e entrega uma tabela pronta por semana — com filtros, totais e médias — em segundos, usando apenas o histórico do grupo.

---

## 🔮 Melhorias Futuras

- [ ] Exportação da tabela em PDF ou Excel
- [ ] Comparativo entre meses (evolução de participação)
- [ ] Gráficos de linha/barra por membro
- [ ] Integração direta com Supabase para salvar histórico de relatórios
- [ ] Painel de administrador com acesso por login

---

## 👤 Autor

**Tales — T4 MASAYOSHI**
Fundador da Ordem Masayoshi · Professor de informática · Estudante de Sistemas de Informação · Entusiasta de IA e automação

[![GitHub](https://img.shields.io/badge/GitHub-T4Msy-181717?style=flat-square&logo=github)](https://github.com/T4Msy)

---

<div align="center">
  <sub>Feito com ☕ e muito <code>n8n</code> · Uso interno da <strong>Ordem Masayoshi © 2026</strong></sub>
</div>
