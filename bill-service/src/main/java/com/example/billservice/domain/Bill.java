package com.example.billservice.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Objects;

@Data
@Entity
@NoArgsConstructor
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    //USED
    @NotNull
    private float hotWater;
    @NotNull
    private float coolWater;
    @NotNull
    private float heating;
    @NotNull
    private float electricity;
    @NotNull
    private float gas;
    @NotNull
    private float sewage;

    @NotNull
    private Date billDate;

    private boolean approved = false;

    @NotNull
    private long apartmentId;

    public float getHotWaterPriceToPay() {
        return hotWater * BillConsts.HOTWATERPRICE;
    }

    public float getCoolWaterPriceToPay() {
        return coolWater * BillConsts.COLLWATERPRICE;
    }

    public float getHeatingPriceToPay() {
        return heating * BillConsts.HEATINGPRICE;
    }


    public float getElectricityPriceToPay() {
        return electricity * BillConsts.ELECTRICITYPRICE;
    }

    public float getGasPriceToPay() {
        return gas * BillConsts.GASPRICE;
    }

    public float getSewagePriceToPay() {
        return sewage * BillConsts.SEWAGEPRICE;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Bill)) return false;
        Bill bill = (Bill) o;
        return getId() == bill.getId() &&
                getApartmentId() == bill.getApartmentId() &&
                Objects.equals(getBillDate(), bill.getBillDate());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getBillDate(), getApartmentId());
    }
}
