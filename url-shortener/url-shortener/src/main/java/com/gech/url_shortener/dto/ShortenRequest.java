package com.gech.url_shortener.dto;

import lombok.Data;
import org.hibernate.validator.constraints.URL; // Import the URL validator
import jakarta.validation.constraints.NotBlank; // Import NotBlank

@Data
public class ShortenRequest {
    @NotBlank(message = "URL cannot be empty or blank.")
    @URL(message = "Invalid URL format.")
    private String longUrl;
}
