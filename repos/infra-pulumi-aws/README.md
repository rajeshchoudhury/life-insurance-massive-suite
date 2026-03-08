# infra-pulumi-aws

Pulumi (TypeScript) starter for AWS deployments.

## Targets

- ECS/Fargate (recommended default)
- EKS
- Lambda (API)
- EC2 (legacy)
- RDS/Aurora
- MSK (Kafka)
- CloudFront + S3 (frontends)

## Layout

- `stacks/` environment stacks (dev, qa, prod)
- `components/` reusable infra components

> This is a scaffold; fill in stack configs and CI credentials.
