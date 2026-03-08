# data-analytics

Reference data & analytics patterns for the platform.

## Event topics (examples)

- `life.lead.created`
- `life.quote.generated`
- `life.application.submitted`
- `life.underwriting.decisioned`
- `life.policy.issued`

## Lakehouse zones

- **Bronze**: raw events + source extracts
- **Silver**: conformed tables (person, policy, payment, agent)
- **Gold**: BI marts (conversion funnel, persistency, channel performance)
