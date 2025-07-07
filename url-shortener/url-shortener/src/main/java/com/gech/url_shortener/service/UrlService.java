package com.gech.url_shortener.service;

import com.gech.url_shortener.dto.UrlMappingDto;
import com.gech.url_shortener.model.UrlMapping;
import com.gech.url_shortener.model.User;
import com.gech.url_shortener.repository.UrlRepository;
import com.gech.url_shortener.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UrlService {
    private final UrlRepository urlRepository;
    private final UserRepository userRepository;
    private final Base62Service base62Service;

    @Transactional
    public UrlMappingDto shortenUrl(String longUrl, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        UrlMapping urlMapping = new UrlMapping(longUrl);
        urlMapping.setUser(user);
        UrlMapping savedMapping = urlRepository.save(urlMapping);

        String shortCode = base62Service.encode(savedMapping.getId());
        savedMapping.setShortCode(shortCode);
        UrlMapping finalMapping = urlRepository.save(savedMapping);

        return new UrlMappingDto(
                finalMapping.getId(),
                finalMapping.getLongUrl(),
                finalMapping.getShortCode(),
                finalMapping.getCreationDate(),
                finalMapping.getClickCount()
        );
    }

    @Transactional
    public String getLongUrl(String shortCode) {
        UrlMapping urlMapping = urlRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new EntityNotFoundException("URL not found for short code: " + shortCode));

        urlMapping.setClickCount(urlMapping.getClickCount() + 1);
        urlRepository.save(urlMapping);

        return urlMapping.getLongUrl();
    }

    public List<UrlMappingDto> getUrlsByUsername(String username) {
        List<UrlMapping> urls = urlRepository.findByUserUsernameOrderByCreationDateDesc(username);
        return urls.stream()
                .map(url -> new UrlMappingDto(
                        url.getId(),
                        url.getLongUrl(),
                        url.getShortCode(),
                        url.getCreationDate(),
                        url.getClickCount()
                ))
                .collect(Collectors.toList());
    }
}