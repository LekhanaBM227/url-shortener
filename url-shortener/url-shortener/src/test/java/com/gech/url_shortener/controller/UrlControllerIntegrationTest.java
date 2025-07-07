package com.gech.url_shortener.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.testng.annotations.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UrlControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testShortenAndRedirect() throws Exception {
        // Step 1: Shorten a URL
        String longUrl = "https://www.google.com/search?q=spring+boot";
        String shortenRequestJson = "{\"longUrl\":\"" + longUrl + "\"}";

        MvcResult result = mockMvc.perform(post("/shorten")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(shortenRequestJson)
                        .header("host", "localhost:8080")) // Simulate host header
                .andExpect(status().isOk())
                .andReturn();

        String shortUrl = result.getResponse().getContentAsString();
        // Extract the short code from the full short URL
        String shortCode = shortUrl.substring(shortUrl.lastIndexOf("/") + 1);

        // Step 2: Use the short code to redirect
        mockMvc.perform(get("/" + shortCode))
                .andExpect(status().isFound()) // Expecting a 302 redirect
                .andExpect(redirectedUrl(longUrl));
    }

    @Test
    void testRedirectNotFound() throws Exception {
        mockMvc.perform(get("/nonExistentCode"))
                .andExpect(status().isNotFound());
    }
}
