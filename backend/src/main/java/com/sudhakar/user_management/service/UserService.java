package com.sudhakar.user_management.service;

import com.sudhakar.user_management.dto.ForgotPasswordRequest;
import com.sudhakar.user_management.dto.LoginRequest;
import com.sudhakar.user_management.dto.UserRegistrationRequest;
import com.sudhakar.user_management.entity.User;
import com.sudhakar.user_management.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {

    private final UserRepository repository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository repository,
                       BCryptPasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
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

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()));

        user.setCreatedAt(LocalDateTime.now());

        repository.save(user);

        return "User Registered Successfully";
    }

    public String login(LoginRequest request) {

        User user = repository.findByUsername(
                        request.getUsername())
                .orElse(null);

        if (user == null) {
            return "User Not Found";
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            return "Invalid Password";
        }

        return "Login Successful";
    }

    public String forgotPassword(ForgotPasswordRequest request) {

        User user = repository
                .findByUsernameAndEmail(
                        request.getUsername(),
                        request.getEmail())
                .orElse(null);

        if (user == null) {
            return "User Not Found";
        }

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()));

        repository.save(user);

        return "Password Reset Successful";
    }
}