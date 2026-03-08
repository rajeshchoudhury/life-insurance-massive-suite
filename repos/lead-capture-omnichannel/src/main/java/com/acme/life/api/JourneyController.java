package com.acme.life.api;

import jakarta.validation.constraints.NotBlank;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/journeys")
public class JourneyController {

  public record StartJourneyRequest(
      @NotBlank String channel, // WEB, AGENT, CALL_CENTER, PARTNER
      @NotBlank String campaign,
      String referralCode
  ) {}

  @PostMapping("/start")
  public Map<String, Object> start(@RequestBody StartJourneyRequest req) {
    return Map.of(
        "journeyId", UUID.randomUUID(),
        "startedAt", Instant.now().toString(),
        "channel", req.channel(),
        "campaign", req.campaign(),
        "referralCode", req.referralCode()
    );
  }
}
