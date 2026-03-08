package com.acme.life.api;

import com.acme.life.domain.quote.QuoteRequest;
import com.acme.life.domain.quote.QuoteResponse;
import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/quotes")
public class QuoteController {

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public QuoteResponse create(@Valid @RequestBody QuoteRequest req) {
    // Placeholder: real implementation pulls product configs + rate tables + underwriting rules.
    var base = req.faceAmount().divide(BigDecimal.valueOf(1000));
    var ageFactor = BigDecimal.valueOf(Math.max(1.0, req.age() / 30.0));
    var tobaccoFactor = "YES".equalsIgnoreCase(req.tobaccoUse()) ? BigDecimal.valueOf(2.0) : BigDecimal.ONE;
    var premium = base.multiply(BigDecimal.valueOf(0.35)).multiply(ageFactor).multiply(tobaccoFactor);

    return new QuoteResponse(
        UUID.randomUUID(),
        premium.setScale(2),
        tobaccoFactor.compareTo(BigDecimal.ONE) > 0 ? "STANDARD" : "PREFERRED",
        req.productType(),
        Instant.now()
    );
  }
}
