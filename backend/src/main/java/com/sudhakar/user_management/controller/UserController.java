package com.sudhakar.user_management.controller;

import com.sudhakar.user_management.dto.LoginRequest;
import com.sudhakar.user_management.dto.UserRegistrationRequest;
import com.sudhakar.user_management.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public String register(@RequestBody UserRegistrationRequest request) {
        return service.register(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return service.login(request);
    }
}