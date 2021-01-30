package com.example.apartmentservice.dao;

import com.example.apartmentservice.domain.Block;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Set;

public interface BlockRepository extends JpaRepository<Block, Long> {
    Block findById(long id);
    Set<Block> findAllByBlockManagerId(long id);
//    Set<Block> findAllByAddress_Id(long addressId);
    @Override
    void deleteById(Long id);
}
