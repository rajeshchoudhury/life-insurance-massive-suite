package com.acme.life.domain.quote;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record QuoteResponse(
    UUID quoteId,
    BigDecimal monthlyPremium,
    String rateClass,
    String productType,
    Instant createdAt
) {}
