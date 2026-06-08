# Fábrica de Sites — Status da Demo

## Demo: Clínica Estética

| Item | Status |
|---|---|
| Repo | `ROI Labs/projeto-novo` |
| Stack | Next.js 15 App Router + TypeScript strict + Tailwind |
| Testes | ✅ 3/3 passing (vitest) |
| Build | ✅ 4/4 páginas estáticas (standalone) |
| Automação de lembretes | ✅ `scheduleReminders()` — 24h e 2h antes da consulta |
| Dockerfile standalone | ✅ pronto para EasyPanel/Docker |
| **URL pública** | **`[PENDING DEPLOY]`** — atualizar após subir no EasyPanel |

## Como atualizar este arquivo

Após o deploy no EasyPanel, substituir `[PENDING DEPLOY]` pela URL real e marcar:

```
| **URL pública** | **https://<slug>.easypanel.host** |
| Home carrega | ✅ |
| CTA converte (BookingForm) | ✅ |
| Sem erros no console | ✅ |
```

## Como usar para vendas

1. Abrir a URL da demo no navegador do cliente (ou compartilhar link).
2. Mostrar: nome da clínica → serviços → formulário de agendamento → confirmação.
3. Personalizar para o cliente: editar `src/config/client.ts` (nome, serviços, cores) → rebuild → deploy em subdomínio próprio. Leva ~15 min.
4. Gravar Loom (~3 min): problema atual do cliente → demo resolvendo → ROI dos lembretes anti no-show.

## Deploy instructions

Ver `Docs/handoff/s3-deploy.md` para passo a passo completo (EasyPanel + Dockerfile + variáveis de ambiente).

**Variáveis obrigatórias no EasyPanel:**
```
NODE_ENV=production
HOSTNAME=0.0.0.0
PORT=3000
```
