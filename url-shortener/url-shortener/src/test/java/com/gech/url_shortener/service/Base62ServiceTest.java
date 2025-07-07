package com.gech.url_shortener.service;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class Base62ServiceTest {

    private final Base62Service base62Service = new Base62Service();

    @Test
    void testEncode() {
        assertEquals("0", base62Service.encode(0));
        assertEquals("1", base62Service.encode(1));
        assertEquals("a", base62Service.encode(10));
        assertEquals("G", base62Service.encode(61));
        assertEquals("10", base62Service.encode(62));
        assertEquals("11", base62Service.encode(63));
        assertEquals("k9", base62Service.encode(755));
    }
}
