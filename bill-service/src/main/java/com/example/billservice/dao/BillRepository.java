package com.example.billservice.dao;

import com.example.billservice.domain.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
@Transactional
public interface BillRepository extends JpaRepository<Bill, Long> {
    Bill findById(long id);
    List<Bill> findAllByApartmentId(long apartmentId);
    Bill findByApartmentIdAndBillDate(long apartmentId, Date billDate);
    List<Bill> findAll();
    List<Bill> findAllByBillDateBetween(Date startDate, Date endDate);
    List<Bill> findByApartmentIdAndBillDateIsAfter(long id, Date startDate);
}

