package com.sudhakar.user_management.controller;

import com.sudhakar.user_management.dto.ForgotPasswordRequest;
import com.sudhakar.user_management.dto.LoginRequest;
import com.sudhakar.user_management.dto.UserRegistrationRequest;
import com.sudhakar.user_management.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public String register(
            @Valid @RequestBody UserRegistrationRequest request) {

        return service.register(request);
    }

    @PostMapping("/login")
    public String login(
            @Valid @RequestBody LoginRequest request) {

        return service.login(request);
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        return service.forgotPassword(request);
    }
}