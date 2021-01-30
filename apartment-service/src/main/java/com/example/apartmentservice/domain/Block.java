package com.example.apartmentservice.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@NoArgsConstructor
public class Block {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToMany(mappedBy = "block")
    @JsonIgnore
    private List<Apartment> apartments;

    private String address;

    @JsonIgnore
    private long blockManagerId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Block)) return false;
        Block block = (Block) o;
        return getId() == block.getId() &&
                Objects.equals(getApartments(), block.getApartments()) &&
                Objects.equals(getAddress(), block.getAddress()) &&
                Objects.equals(getBlockManagerId(), block.getBlockManagerId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getApartments(), getAddress(), getBlockManagerId());
    }
}
