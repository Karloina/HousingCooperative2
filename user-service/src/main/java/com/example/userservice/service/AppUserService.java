package com.example.userservice.service;

import java.util.List;

import com.example.userservice.dto.AppUserDto;

public interface AppUserService {
    void addAppUser(AppUserDto user);
    void editAppUser(AppUserDto user);
    List<AppUserDto> listAppUser();
    void removeAppUser (String id);

}

