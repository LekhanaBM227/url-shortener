package com.gech.url_shortener.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

/**
 * Global configuration for Jackson, the JSON serialization library used by Spring Boot.
 */
@Configuration
public class JacksonConfig {

    /**
     * Creates a customized ObjectMapper bean that will be used for all JSON serialization.
     * @return A configured ObjectMapper.
     */
    @Bean
    @Primary // Marks this ObjectMapper as the primary one to be used in case of multiple definitions.
    public ObjectMapper objectMapper() {
        // Start with a default ObjectMapper instance.
        ObjectMapper objectMapper = new ObjectMapper();

        // 1. Register the JavaTimeModule.
        // This module adds support for serializing and deserializing modern Java 8+ Date/Time
        // types like LocalDateTime, LocalDate, etc.
        objectMapper.registerModule(new JavaTimeModule());

        // 2. Disable WRITE_DATES_AS_TIMESTAMPS.
        // By default, Jackson might write a date as a long number (e.g., 1678886400000), which
        // represents milliseconds since the epoch. This is hard to read and handle in JavaScript.
        // Disabling this feature forces Jackson to use the standard ISO-8601 string format
        // (e.g., "2025-07-08T12:30:00"), which is universally understood.
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        return objectMapper;
    }
}