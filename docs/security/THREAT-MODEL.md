# STRIDE Threat Model — SecApp MVP

## Escopo

Componentes avaliados neste threat model:
1. Dashboard Web (Next.js)
2. Mapa Interativo (Leaflet)
3. Sistema de Alertas
4. Autenticação (Login/Cadastro)
5. Dados Mockados (MVP)

## Análise STRIDE

### 1. Spoofing (Falsificação de Identidade)

| Ameaça | Componente | Mitigação |
|---|---|---|
| Usuário falso cria conta | Auth/Cadastro | Verificação de email obrigatória |
| Roubo de sessão | JWT | Token curto (15min) + refresh rotativo |
| Man-in-the-middle | Todas as rotas | TLS 1.3 obrigatório, HSTS |

### 2. Tampering (Adulteração)

| Ameaça | Componente | Mitigação |
|---|---|---|
| Manipulação de dados de nível | API de dados | Validação com Zod em todas as inputs |
| XSS para alterar alertas | Dashboard | CSP header + sanitização de inputs |
| Modificação de JWT | Auth | Assinatura HMAC-SHA256, validação server-side |

### 3. Repudiation (Repúdio)

| Ameaça | Componente | Mitigação |
|---|---|---|
| Usuário nega ter recebido alerta | Alertas | Audit log append-only (RS-05) |
| Admin altera dados sem registro | Admin panel | Todas ações L3+ logadas imutavelmente |

### 4. Information Disclosure (Divulgação)

| Ameaça | Componente | Mitigação |
|---|---|---|
| Leak de dados de usuários | API | Classificação L1-L5, criptografia L3+ |
| Exposição de stack trace | Error handling | Mensagens genéricas no frontend, log detalhado no backend |
| Credenciais no código | .env | .env.example sem valores, .gitignore reforçado |

### 5. Denial of Service (DoS)

| Ameaça | Componente | Mitigação |
|---|---|---|
| Brute-force login | Auth | Rate limiting (RS-06): 10 req/min por IP |
| Spam de alertas | Alertas | Throttling no endpoint de alertas |
| Flood de requests | API | WAF da Vercel + rate limiting customizado |

### 6. Elevation of Privilege (Escalação)

| Ameaça | Componente | Mitigação |
|---|---|---|
| Usuário acessa admin | RBAC | Checagem de role em middleware |
| SQL injection | Database | Prepared statements via Prisma/Supabase |
| Path traversal | API routes | Validação de input com allowlist |

## Classificação de Dados (L1-L5)

| Nível | Tipo | Exemplos | Proteção |
|---|---|---|---|
| L1 - Público | Dados de rios, níveis | Nível do Rio Negro, coordenadas | Nenhuma especial |
| L2 - Interno | Dados agregados | Estatísticas de uso, logs de acesso | Acesso autenticado |
| L3 - Confidencial | Dados de usuários | Email, nome, empresa | Criptografia em trânsito + repouso |
| L4 - Restrito | Credenciais | Senhas (hash), tokens JWT | argon2id, rotação automática |
| L5 - Regulado | Dados pessoais sensíveis | CPF, endereço, financeiro | LGPD compliance, DPO |

## Headers de Segurança Implementados

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(self)
X-DNS-Prefetch-Control: on
```

## Status: ✅ MVP aprovado para desenvolvimento

Revisão obrigatória antes de produção:
- [ ] Implementar CSP completo
- [ ] Adicionar rate limiting real
- [ ] Configurar Sentry para monitoramento
- [ ] Audit log em banco append-only
- [ ] Penetration testing básico
