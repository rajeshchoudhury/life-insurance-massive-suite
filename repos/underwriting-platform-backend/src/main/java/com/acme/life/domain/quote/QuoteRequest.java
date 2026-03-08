package com.acme.life.domain.quote;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record QuoteRequest(
    @NotBlank String productType,   // TERM, WHOLE, UL
    @NotNull BigDecimal faceAmount,
    @Min(0) @Max(120) int age,
    @NotBlank String state,
    @NotBlank String tobaccoUse,    // YES/NO
    @NotBlank String gender         // M/F/X
) {}
