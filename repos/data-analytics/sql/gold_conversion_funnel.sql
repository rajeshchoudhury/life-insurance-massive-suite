-- Example mart table
-- Assumes a conformed event table `events` with (type, occurred_at, entity_id, source, channel)

create table if not exists gold_conversion_funnel as
select
  date_trunc('day', occurred_at) as day,
  channel,
  count_if(type = 'LeadCreated') as leads,
  count_if(type = 'QuoteGenerated') as quotes,
  count_if(type = 'ApplicationSubmitted') as applications,
  count_if(type = 'PolicyIssued') as policies
from events
group by 1,2;
