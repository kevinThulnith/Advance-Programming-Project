package com.oceanview.reservation_system.controller;

import com.oceanview.reservation_system.config.DataLoader;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/seed")
@RequiredArgsConstructor
public class SeedController {

    private final DataLoader dataLoader;

    /**
     * Manually trigger database seeding.
     * Safe to call multiple times — DataLoader skips if data already exists.
     * POST http://localhost:8080/api/seed
     */
    @PostMapping
    public ResponseEntity<Map<String, String>> seed() {
        try {
            dataLoader.run();
            return ResponseEntity.ok(Map.of("status", "success", "message", "Database seeded successfully."));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("status", "error", "message", e.getMessage()));
        }
    }
}
