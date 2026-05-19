# ADR-001: Stack 100% Gratuita — Next.js + Supabase + Vercel

**Data:** 2026-05-18  
**Status:** Aprovado  
**Decisores:** Equipe SecApp

## Contexto

O SecApp precisa ser desenvolvido com custo zero de infraestrutura no MVP, mantendo qualidade profissional e capacidade de escalar futuramente.

## Decisão

Adotar a seguinte stack:
- **Frontend/Backend:** Next.js 14 (App Router) — serverless, deploy gratuito na Vercel
- **Banco de Dados:** Supabase (PostgreSQL gerenciado) — gratuito até 500MB
- **Mapa:** Leaflet.js + OpenStreetMap — 100% gratuito, sem API key
- **Gráficos:** Chart.js — open source, leve
- **CI/CD:** GitHub Actions — 2.000 min/mês gratuitos

## Justificativa

1. **Custo zero:** Todas as ferramentas têm plano gratuito suficiente para MVP
2. **Sem vendor lock-in:** Next.js e PostgreSQL são portáveis
3. **Segurança:** Supabase oferece RLS, TLS, e criptografia em repouso
4. **Escalabilidade:** Vercel escala automaticamente sob demanda
5. **DX:** TypeScript strict + App Router fornecem experiência moderna de desenvolvimento

## Consequências

- Limite de 500MB no Supabase free tier (suficiente para dados L1 de rios)
- Vercel hobby plan tem limites de bandwidth (suficiente para MVP)
- Sem suporte comercial — dependemos de comunidade open source

## Alternativas Consideradas

| Alternativa | Motivo da rejeição |
|---|---|
| Google Cloud Run | Mais complexo, requer billing account |
| AWS Lambda + RDS | Custo pode escalar, setup mais complexo |
| Railway | Free tier mais limitado que Vercel |
