package com.acme.life.api;

import java.time.Instant;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class InfoController {

  @GetMapping("/info")
  public Map<String, Object> info() {
    return Map.of(
        "service", "service",
        "ts", Instant.now().toString()
    );
  }
}
