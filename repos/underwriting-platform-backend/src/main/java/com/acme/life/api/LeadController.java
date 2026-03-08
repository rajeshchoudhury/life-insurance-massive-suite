package com.acme.life.api;

import com.acme.life.domain.lead.Lead;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/leads")
public class LeadController {

  public record CreateLeadRequest(
      @NotBlank String firstName,
      @NotBlank String lastName,
      @NotBlank String email,
      String phone,
      String channel
  ) {}

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Map<String, Object> create(@Valid @RequestBody CreateLeadRequest req) {
    var lead = Lead.newLead(req.firstName(), req.lastName(), req.email(), req.phone(), req.channel());
    return Map.of("lead", lead);
  }
}
