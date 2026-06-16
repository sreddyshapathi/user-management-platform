package com.sudhakar.user_management.controller;

import com.sudhakar.user_management.dto.ForgotPasswordRequest;
import com.sudhakar.user_management.dto.LoginRequest;
import com.sudhakar.user_management.dto.UserProfileResponse;
import com.sudhakar.user_management.dto.UserRegistrationRequest;
import com.sudhakar.user_management.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @Operation(summary = "Register New User")
    @PostMapping("/register")
    public String register(
            @Valid @RequestBody UserRegistrationRequest request) {

        return service.register(request);
    }

    @Operation(summary = "User Login")
    @PostMapping("/login")
    public String login(
            @Valid @RequestBody LoginRequest request) {

        return service.login(request);
    }

    @Operation(summary = "Forgot Password")
    @PostMapping("/forgot-password")
    public String forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        return service.forgotPassword(request);
    }

    @Operation(summary = "Get User Profile")
    @GetMapping("/profile/{username}")
    public UserProfileResponse getProfile(
            @PathVariable String username) {

        return service.getProfile(username);
    }
}