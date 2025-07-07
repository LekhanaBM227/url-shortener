package com.gech.url_shortener.repository;

import com.gech.url_shortener.model.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UrlRepository extends JpaRepository<UrlMapping, Long> {
    Optional<UrlMapping> findByShortCode(String shortCode);
    List<UrlMapping> findByUserUsernameOrderByCreationDateDesc(String username);
}