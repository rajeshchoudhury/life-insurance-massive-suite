# Life Insurance Massive Suite (Multi-Repo)

This ZIP contains multiple repositories that together form an end‑to‑end, modern life insurance platform:

- **Lead Capture & Omnichannel**: web forms, referral links, call-center intake, SMS/email flows
- **Customer Self‑Application**: guided application, e‑signature, document upload, status tracking
- **Agent & Distribution Portal**: agent onboarding, licensing, lead/quote/app management
- **Quote & Underwriting Core**: product config, pricing, rules engine integration, evidence ordering
- **Policy Admin (MVP)**: policy issuance, billing hooks, servicing events
- **Data & Analytics**: event streaming, lakehouse pipelines, BI-ready models
- **Infra & Delivery**: Pulumi for AWS, CI/CD workflows, docker-compose for local dev
- **Shared Libraries**: auth, logging, API contracts, UI kit

## Repos included

| Repo | Purpose | Stack |
|---|---|---|
| `underwriting-platform-backend` | Core APIs (quote, underwriting, policy, payments hooks) | Java 21, Spring Boot 3, Maven |
| `lead-capture-omnichannel` | Lead capture APIs + journey orchestration | Java 21, Spring Boot 3 |
| `agent-portal-react` | Agent acquisition + agent portal UI | React + Vite + TS |
| `customer-self-application-react` | Consumer application UI | React + Vite + TS |
| `infra-pulumi-aws` | Deploy to AWS (ECS/Fargate, EKS, Lambda, EC2, RDS, MSK) | TypeScript, Pulumi |
| `shared-contracts` | OpenAPI, AsyncAPI, events schemas, DTOs | YAML/JSON |
| `shared-ui-kit` | Reusable UI components | React + TS |
| `data-analytics` | Streaming + batch reference pipelines | SQL + docs |

## Local quickstart

1. Install: Java 21, Node 20+, Docker
2. Start local dependencies:

```bash
cd repos/underwriting-platform-backend
cp .env.example .env
cd ../../
docker compose up -d
```

3. Run backend:

```bash
cd repos/underwriting-platform-backend
./mvnw spring-boot:run
```

4. Run frontends:

```bash
cd repos/customer-self-application-react
npm i
npm run dev
```

## Architecture (high-level)

- **API Gateway/BFF** in core backend for UI-facing aggregation.
- **Domain services**: leads, quoting, underwriting, policy, agent.
- **Event bus** (Kafka/MSK) carries `LeadCreated`, `QuoteGenerated`, `ApplicationSubmitted`, `DecisionMade`, `PolicyIssued`.
- **Identity**: OIDC (Cognito/Keycloak compatible); service-to-service uses mTLS + JWT.

## Security & compliance notes

This repo is a starter structure. For production: implement PHI/PII controls, encryption, audit trails, retention policies, and secure SDLC requirements.
