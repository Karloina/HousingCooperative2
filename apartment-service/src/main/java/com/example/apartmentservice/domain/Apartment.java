package com.example.apartmentservice.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.*;

@Data
@Entity
@NoArgsConstructor
public class Apartment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private int number;

    @ManyToOne
    @JoinColumn(nullable=false)
    private Block block;

    @JsonIgnore
    @ElementCollection
    private List<Long> billsIds = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Apartment)) return false;
        Apartment apartment = (Apartment) o;
        return getId() == apartment.getId() &&
                getNumber() == apartment.getNumber() &&
                Objects.equals(getBlock(), apartment.getBlock()) &&
                Objects.equals(getBillsIds(), apartment.getBillsIds());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getNumber(), getBlock(), getBillsIds());
    }
}
