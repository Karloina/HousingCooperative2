package com.example.billservice.service.impl;

import com.example.billservice.dto.BillDto;
import com.example.billservice.service.BillService;
import com.example.billservice.dao.BillRepository;
import com.example.billservice.domain.Bill;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Transactional
@Service("billService")
public class BillServiceImpl implements BillService {
    private ModelMapper modelMapper;
    private BillRepository billRepository;

    @Autowired
    public BillServiceImpl(BillRepository billRepository, ModelMapper modelMapper) {
        this.billRepository = billRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public BillDto getBill(long id) {
        Bill bill = billRepository.findById(id);
        return modelMapper.map(bill, BillDto.class);
    }

    @Override
    public List<BillDto> listBillByApartmentId(long apartmentId) {
        List<Bill> bills = billRepository.findAllByApartmentId(apartmentId);
        return bills
                .stream()
                .map(bill -> modelMapper.map(bill, BillDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public BillDto getByApartmentIdAndBillDate(long apartmentId, Date billDate) {
        Bill bill = billRepository.findByApartmentIdAndBillDate(apartmentId, billDate);
        return modelMapper.map(bill, BillDto.class);
    }

    @Override
    public List<BillDto> listBill() {
        //take usr
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        KeycloakAuthenticationToken kcauthentication = (KeycloakAuthenticationToken) authentication;

        Set<String> roles = kcauthentication.getAccount().getKeycloakSecurityContext().getToken().getRealmAccess().getRoles();
        List<Bill> bills = new ArrayList<>();
        if(roles.contains("user")) {
            Object apartmentId = kcauthentication.getAccount().getKeycloakSecurityContext().getToken().getOtherClaims().get("apartment_id");
            if (apartmentId == null) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Apartment id is null in token");
            }
            bills = billRepository.findAllByApartmentId(Long.parseLong((String)(apartmentId)));
        } else if (roles.contains("administrator") || roles.contains("manager")) {
           bills = billRepository.findAll();
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unknown role");
        }

        return bills
                .stream()
                .map(bill -> modelMapper.map(bill, BillDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<BillDto> listBillByBillDateBetween(Date startDate, Date endDate) {
        List<Bill> bills = billRepository.findAllByBillDateBetween(startDate, endDate);
        return bills
                .stream()
                .map(bill -> modelMapper.map(bill, BillDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public void addBill(BillDto billDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        KeycloakAuthenticationToken kcauthentication = (KeycloakAuthenticationToken) authentication;
        Object apartmentId = kcauthentication.getAccount().getKeycloakSecurityContext().getToken().getOtherClaims().get("apartment_id");
        if (apartmentId == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Apartment id is null in token");
        }
        Bill bill = modelMapper.map(billDto, Bill.class);
        bill.setApartmentId(Long.parseLong((String)(apartmentId)));
        bill.setApproved(false);
        bill.setBillDate(new Date());
        billRepository.save(bill);
    }

    @Override
    public void editBill(BillDto billDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        KeycloakAuthenticationToken kcauthentication = (KeycloakAuthenticationToken) authentication;
        Object apartmentId = kcauthentication.getAccount().getKeycloakSecurityContext().getToken().getOtherClaims().get("apartment_id");
        if (apartmentId == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Apartment id is null in token");
        }
        Bill byId = billRepository.findById(billDto.getId());
        boolean approved = byId.isApproved();
        modelMapper.map(billDto, byId);
        byId.setApproved(approved);
        byId.setBillDate(new Date());
        byId.setApartmentId(Long.parseLong((String)(apartmentId)));
        billRepository.save(byId);
    }

    @Override
    public void removeBill(long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        KeycloakAuthenticationToken kcauthentication = (KeycloakAuthenticationToken) authentication;
        Object apartmentId = kcauthentication.getAccount().getKeycloakSecurityContext().getToken().getOtherClaims().get("apartment_id");
        if (apartmentId == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Apartment id is null in token");
        }
        Bill byId = billRepository.findById(id);
        if(byId.getApartmentId() != Long.parseLong((String)(apartmentId))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Cannot delete bill");
        }
        billRepository.deleteById(id);
    }

    @Override
    public void approveBill(long id) {
        Bill bill = billRepository.findById(id);
        bill.setApproved(true);
        billRepository.save(bill);
    }
}

