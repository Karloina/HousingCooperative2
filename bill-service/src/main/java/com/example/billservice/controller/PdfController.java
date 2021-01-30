package com.example.billservice.controller;

import com.example.billservice.domain.Bill;
import com.example.billservice.service.BillService;
import com.example.billservice.service.PdfService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("pdf")
public class PdfController {
    private ModelMapper modelMapper;
    private PdfService pdfService;
    private BillService billService;

    @Autowired
    public PdfController(PdfService pdfService, BillService billService, ModelMapper modelMapper) {
        this.pdfService = pdfService;
        this.billService = billService;
        this.modelMapper = modelMapper;
    }

    @RequestMapping(value = "/generatePdf/{billId}", method = RequestMethod.GET)
    public void generatePdf(@PathVariable Long billId, HttpServletResponse response) {
        pdfService.generatePdf(billId, response);
    }
}


