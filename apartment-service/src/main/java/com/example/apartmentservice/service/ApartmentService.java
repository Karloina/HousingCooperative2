package com.example.apartmentservice.service;

import com.example.apartmentservice.dto.ApartmentDto;
import java.util.List;

public interface ApartmentService {

    void addApartment(ApartmentDto apartment);

    void editApartment(ApartmentDto apartment);

    List<ApartmentDto> listApartment();

    void removeApartment(long id);

    ApartmentDto getApartment(long id);

}
