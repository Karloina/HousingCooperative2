package com.example.apartmentservice.service.impl;

import com.example.apartmentservice.dao.ApartmentRepository;
import com.example.apartmentservice.dao.BlockRepository;
import com.example.apartmentservice.domain.Apartment;
import com.example.apartmentservice.dto.ApartmentDto;
import com.example.apartmentservice.service.ApartmentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Transactional
@Service("apartmentService")
public class ApartmentServiceImpl implements ApartmentService {
    private ModelMapper modelMapper;
    private ApartmentRepository apartmentRepository;
    private BlockRepository blockRepository;

    @Autowired
    public ApartmentServiceImpl(ApartmentRepository apartmentRepository, ModelMapper modelMapper, BlockRepository blockRepository) {
        this.apartmentRepository = apartmentRepository;
        this.modelMapper = modelMapper;
        this.blockRepository = blockRepository;
    }

    @Override
    public void addApartment(ApartmentDto apartmentDto) {
        Apartment apartment = modelMapper.map(apartmentDto, Apartment.class);
        apartmentRepository.save(apartment);
    }

    @Override
    public void editApartment(ApartmentDto apartmentDto) {
        Apartment apartment = modelMapper.map(apartmentDto, Apartment.class);
        apartmentRepository.save(apartment);
    }

    @Override
    public List<ApartmentDto> listApartment() {
        List<Apartment> apartments = apartmentRepository.findAll();
        return apartments
                .stream()
                .map(apartment -> modelMapper.map(apartment, ApartmentDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public void removeApartment(long id) {
        apartmentRepository.deleteById(id);
    }

    @Override
    public ApartmentDto getApartment(long id) {
        Apartment apartment = apartmentRepository.findById(id);
        return modelMapper.map(apartment, ApartmentDto.class);
    }

}
