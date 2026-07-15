# Estetia — Demo B2B

Landing B2B e demonstração interativa da fábrica de software para clínicas de estética.
No ar em [estetia.estetiacrm.com.br](https://estetia.estetiacrm.com.br).

O nome do pacote é `clinica-estetica-demo`.

## O que é

- **Landing B2B** — página de venda para clínicas, componentes em [`src/components/b2b`](src/components/b2b)
- **/demo (Aurora)** — demonstração interativa do produto, em [`src/app/demo`](src/app/demo)
- **Captura de lead → Sirius CRM** — os leads da demo são enviados ao Sirius CRM
  em produção (ver [`src/lib/automation`](src/lib/automation))

## Stack

- **Next.js** (App Router) + **React**
- **Tailwind CSS**
- **Vitest** — testes ([`src/__tests__`](src/__tests__))
- Deploy via **Docker** ([`Dockerfile`](Dockerfile))

## Rodar localmente

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
pnpm test
pnpm lint
```

## Configuração

Configs em [`src/config`](src/config). A integração com o Sirius CRM (endpoint e
credenciais) é definida por variáveis de ambiente — ver [`CLAUDE.md`](CLAUDE.md).
