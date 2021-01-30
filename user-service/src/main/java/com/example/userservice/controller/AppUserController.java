package com.example.userservice.controller;

import com.example.userservice.dto.AppUserDto;
import com.example.userservice.service.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RestController
@RequestMapping("appUser")
@RequiredArgsConstructor
@RolesAllowed("administrator")
public class AppUserController {
    private final AppUserService appUserService;

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/list")
    public List<AppUserDto> showAppUsers() {
        return appUserService.listAppUser();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public void addAppUser(@RequestBody AppUserDto appUser) {
        appUserService.addAppUser(appUser);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/edit", method = RequestMethod.PUT)
    public void editAppUser(@RequestBody AppUserDto appUser) {
        appUserService.editAppUser(appUser);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/delete/{appUserId}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable("appUserId") String appUserId) {
        appUserService.removeAppUser(appUserId);
    }
}


