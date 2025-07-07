package com.gech.url_shortener.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import lombok.Data;

@Getter
@Setter
@Data
@AllArgsConstructor // <-- This is the crucial annotation
public class ErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
}

