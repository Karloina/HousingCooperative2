package com.example.userservice.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class AppUserDto {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String telephone;
    private String pesel;
    private String login;
    private String password;
    private boolean enabled;
    private String role;
    private Long apartmentId;
}
