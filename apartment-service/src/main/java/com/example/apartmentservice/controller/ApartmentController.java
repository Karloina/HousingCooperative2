package com.example.apartmentservice.controller;

import com.example.apartmentservice.dto.ApartmentDto;
import com.example.apartmentservice.dto.BlockDto;
import com.example.apartmentservice.service.ApartmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.ArrayList;
import java.util.List;

@RestController
//@RolesAllowed("administrator")
@SessionAttributes
@RequestMapping("apartment")
public class ApartmentController {
    private ApartmentService apartmentService;

    @Autowired
    public ApartmentController(ApartmentService apartmentService) {
        this.apartmentService = apartmentService;
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<ApartmentDto> listApartments() {
        return apartmentService.listApartment();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public void addApartment(@RequestBody ApartmentDto apartment) {
        apartmentService.addApartment(apartment);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/edit", method = RequestMethod.PUT)
    public void editApartment(@RequestBody ApartmentDto apartment) {
        apartmentService.editApartment(apartment);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/delete/{apartmentId}", method = RequestMethod.DELETE)
    public void deleteApartment(@PathVariable("apartmentId") Long apartmentId) {
        apartmentService.removeApartment(apartmentId);
    }
}
