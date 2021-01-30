package com.example.billservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletRequest;

@RestController
@RolesAllowed({"user", "manager", "administrator"})
public class LogoutController {
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public void logout(HttpServletRequest httpServletRequest) {
        SecurityContextHolder.clearContext();
    }
}
