package com.gech.url_shortener.controller;

import com.gech.url_shortener.dto.ShortenRequest;
import com.gech.url_shortener.dto.UrlMappingDto;
import com.gech.url_shortener.service.UrlService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/urls")
@RequiredArgsConstructor
public class UrlController {
    private final UrlService urlService;

    @PostMapping
    public ResponseEntity<UrlMappingDto> shortenUrl(@Valid @RequestBody ShortenRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        UrlMappingDto newUrl = urlService.shortenUrl(request.getLongUrl(), userDetails.getUsername());
        return ResponseEntity.ok(newUrl);
    }

    @GetMapping
    public ResponseEntity<List<UrlMappingDto>> getUserUrls(@AuthenticationPrincipal UserDetails userDetails) {
        List<UrlMappingDto> urls = urlService.getUrlsByUsername(userDetails.getUsername());
        return ResponseEntity.ok(urls);
    }
}