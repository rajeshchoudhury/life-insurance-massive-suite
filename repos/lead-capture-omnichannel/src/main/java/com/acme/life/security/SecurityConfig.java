package com.acme.life.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    // Starter config: allow actuator health + OpenAPI, secure everything else.
    http.csrf(csrf -> csrf.disable());
    http.authorizeHttpRequests(auth -> auth
        .requestMatchers("/actuator/health", "/api-docs/**", "/swagger/**", "/swagger-ui/**").permitAll()
        .anyRequest().authenticated()
    );
    http.httpBasic(Customizer.withDefaults());
    return http.build();
  }
}
