package com.example.investment.app.back.controller;

import com.example.investment.app.back.pojo.LoginRequest;
import com.example.investment.app.back.pojo.MessageResponse;
import com.example.investment.app.back.pojo.SignupRequest;
import com.example.investment.app.back.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<?> authUser(@RequestBody LoginRequest loginRequest) {
        final var jwtResponse = authService.authUser(loginRequest);

        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {
        try {
            final var jwtResponse = authService.registerUser(signupRequest);

            return ResponseEntity.ok(jwtResponse);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(e.getMessage()));
        }
    }
}
