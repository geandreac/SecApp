# 🌊 SecApp — Monitoramento Inteligente de Secas na Bacia Amazônica

O **SecApp** é uma plataforma digital inovadora voltada ao monitoramento, análise e visualização em tempo real do nível de água (calado) e riscos de seca nos principais rios navegáveis da Bacia Amazônica. 

Projetado com foco em **UI/UX Premium (Glassmorphism)** e responsividade de ponta a ponta, a ferramenta auxilia empresas de navegação, órgãos públicos e cooperativas a planejarem a logística fluvial e mitigarem prejuízos gerados pelas secas extremas na região.

---

## 🚀 Produção e Deploy

* **URL de Produção Vercel:** [https://secapp-chi.vercel.app](https://secapp-chi.vercel.app)
* **Repositório Oficial:** [https://github.com/geandreac/SecApp.git](https://github.com/geandreac/SecApp.git)

---

## 📊 Funcionamento dos Dados e Origem das Informações

A confiabilidade visual e lógica do **SecApp** apoia-se em dados consolidados de fontes oficiais, adaptados de forma ágil para viabilizar apresentações fluidas e livre de barreiras de infraestrutura.

### 🌐 1. Fontes de Referência Oficial
Os parâmetros de limiares críticos, calados ideais de navegabilidade e médias históricas de vazão utilizados na aplicação são inspirados e modelados diretamente com base nos dados públicos de:
* **ANA (Agência Nacional de Águas e Saneamento Básico)** — Séries de monitoramento de réguas fluviais e boletins de vazão.
* **INMET (Instituto Nacional de Meteorologia)** — Indicadores climáticos e sazonalidade de chuvas da Região Norte.

### 📁 2. Arquitetura de Dados Estáticos (Mock Data)
Para fins de portfólio, demonstração rápida em reuniões e independência técnica (contornando limitações de cotas e indisponibilidade de servidores externos), toda a inteligência de dados está estruturada em um arquivo local refinado:
* 📍 **Caminho:** `src/data/mock-data.ts`
* **Vantagens dessa Abordagem:**
  * **Zero Latência:** Carregamento instantâneo das curvas de calado e calendários de risco, elevando a experiência do usuário (UX).
  * **Autossuficiência:** Sem conexões pendentes a bancos de dados externos (como limites do Supabase), garantindo que a aplicação esteja 100% online a qualquer hora e sob qualquer volume de acessos.
  * **Fidelidade Real:** O mock foi modelado respeitando os ciclos reais de seca da Amazônia (com o pico da vazão em Maio/Junho e o pico da seca entre Setembro/Outubro).

---

## 🛠️ Principais Recursos da Plataforma

* **Dashboard Executivo:**
  * Vista consolidada dos KPIs de nível de água (Calado Médio Geral, Alertas Ativos, Tendência).
  * Gráfico de calado em tempo real comparando a série atual com a média de 10 anos.
* **Mapa Fluvial Interativo:**
  * Localização geográfica das principais estações de medição (Negro, Solimões, Amazonas, Tapajós, Madeira).
  * Cores dinâmicas e detalhamento interativo do status de segurança em cada ponto de interesse.
* **Histórico Sazonal e Calendário de Risco:**
  * Tabela responsiva de calado de **Janeiro a Dezembro**, com cores que facilitam o diagnóstico imediato de meses mais críticos.
  * Scroll horizontal responsivo para visualização completa no mobile (incluindo Novembro e Dezembro) sem quebras.
* **Painel de Alertas em Tempo Real:**
  * Monitoramento contínuo de emergências ativas organizadas por gravidade (Crítico, Alerta, Normal).

---

## 💻 Tecnologias Utilizadas

* **Framework:** Next.js 16 (App Router) & React 19
* **Gráficos e Estatísticas:** Chart.js & React-Chartjs-2
* **Estilização:** CSS Vanilla Moderno (Design System customizado baseado em variáveis HSL e Glassmorphism)
* **Logos e Elementos:** SVG Vetorial e Logos Oficiais Responsivos
* **Hospedagem & Deploy:** Vercel (CI/CD Automático)

---

## ⚙️ Instalação e Execução Local

Para rodar e testar o projeto no seu ambiente de desenvolvimento local, siga as etapas abaixo:

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/geandreac/SecApp.git
   cd secapp
   ```

2. **Instalar as Dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o Servidor de Desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

4. **Gerar a Build de Produção (Opcional):**
   ```bash
   npm run build
   npm run start
   ```

---

## 🔒 Licença

Este projeto é desenvolvido para fins de monitoramento demonstrativo e apresentação técnica de portfólio.
