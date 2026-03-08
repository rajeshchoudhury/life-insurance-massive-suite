package com.acme.life.domain.lead;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.Instant;
import java.util.UUID;

public record Lead(
    UUID id,
    @NotBlank String firstName,
    @NotBlank String lastName,
    @Email String email,
    String phone,
    String channel,
    Instant createdAt
) {
  public static Lead newLead(String firstName, String lastName, String email, String phone, String channel) {
    return new Lead(UUID.randomUUID(), firstName, lastName, email, phone, channel, Instant.now());
  }
}
