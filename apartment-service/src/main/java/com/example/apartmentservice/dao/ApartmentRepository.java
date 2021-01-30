package com.example.apartmentservice.dao;

import com.example.apartmentservice.domain.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApartmentRepository extends JpaRepository<Apartment, Long> {
    Apartment findById(long id);
    List<Apartment> findAll();
    @Override
    void deleteById(Long id);
}
