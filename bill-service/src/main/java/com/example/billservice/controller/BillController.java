package com.example.billservice.controller;

import com.example.billservice.dto.BillDto;
import com.example.billservice.service.BillService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RestController
@SessionAttributes
@RequestMapping("bill")
public class BillController {
    private BillService billService;

    @Autowired
    public BillController(BillService billService) {
        this.billService = billService;
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<BillDto> listBills() {
        return billService.listBill();
    }

    @RolesAllowed("user")
    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public void addBill(@RequestBody BillDto bill) {
        billService.addBill(bill);
    }

    @RolesAllowed("user")
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/edit", method = RequestMethod.PUT)
    public void editBill(@RequestBody BillDto bill) {
        billService.editBill(bill);
    }

    @RolesAllowed({"administrator", "manager"})
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/approve/{billId}", method = RequestMethod.PUT)
    public void approveBill(@PathVariable("billId") Long billId) {
        billService.approveBill(billId);
    }

    @RolesAllowed("user")
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/delete/{billId}", method = RequestMethod.DELETE)
    public void deleteBill(@PathVariable("billId") Long billId) {
        billService.removeBill(billId);
    }
}

