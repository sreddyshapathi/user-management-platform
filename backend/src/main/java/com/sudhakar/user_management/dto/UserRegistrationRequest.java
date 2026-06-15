package com.sudhakar.user_management.dto;

import lombok.Data;

@Data
public class UserRegistrationRequest {

    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private String username;
    private String password;
}