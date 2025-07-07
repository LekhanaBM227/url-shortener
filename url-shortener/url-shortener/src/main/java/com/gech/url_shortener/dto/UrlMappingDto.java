package com.gech.url_shortener.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UrlMappingDto {
    private Long id;
    private String longUrl;
    private String shortCode;
    private LocalDateTime creationDate;
    private long clickCount;
}