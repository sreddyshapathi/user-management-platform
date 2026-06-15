package com.sudhakar.user_management.service;

import com.sudhakar.user_management.dto.UserRegistrationRequest;
import com.sudhakar.user_management.entity.User;
import com.sudhakar.user_management.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public String register(UserRegistrationRequest request) {

        if (repository.existsByUsername(request.getUsername())) {
            return "Username already exists";
        }

        if (repository.existsByEmail(request.getEmail())) {
            return "Email already exists";
        }

        if (repository.existsByMobile(request.getMobile())) {
            return "Mobile already exists";
        }

        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setCreatedAt(LocalDateTime.now());

        repository.save(user);

        return "User Registered Successfully";
    }
}