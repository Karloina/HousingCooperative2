package com.example.billservice.dto;

import lombok.Data;

import java.util.Date;

@Data
public class BillDto {
    private long id;
    private float hotWater;
    private float coolWater;
    private float heating;
    private float electricity;
    private float gas;
    private float sewage;
    private Date billDate;
    private boolean approved;
}
