package com.example.billservice.service;

import com.example.billservice.dto.BillDto;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.Date;
import java.util.List;

public interface BillService {
    BillDto getBill(long id);

    List<BillDto> listBillByApartmentId(long apartmentId);

    BillDto getByApartmentIdAndBillDate(long apartmentId, Date billDate);

    List<BillDto> listBill();

    List<BillDto> listBillByBillDateBetween(Date startDate, Date endDate);

    void addBill(BillDto bill);

    void editBill(BillDto bill);

    void removeBill(long id);

    void approveBill(long id);
}

