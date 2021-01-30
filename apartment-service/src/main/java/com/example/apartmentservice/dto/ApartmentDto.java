package com.example.apartmentservice.dto;

import lombok.Data;

@Data
public class ApartmentDto {
    private long id;
    private int number;
    private BlockDto block;
}
