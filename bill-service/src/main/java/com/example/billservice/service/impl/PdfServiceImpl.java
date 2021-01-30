package com.example.billservice.service.impl;

import com.example.billservice.dao.BillRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import com.example.billservice.domain.Bill;
import com.example.billservice.service.PdfService;
import lombok.RequiredArgsConstructor;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PdfServiceImpl implements PdfService {
    private final BillRepository billRepository;

    public void generatePdf(Long billId, HttpServletResponse response) {
//        String billAddress = bill.getApartment().getBlock().getAddress().getStreet() + " " +
//                bill.getApartment().getBlock().getAddress().getNumber() + "/" +
//                bill.getApartment().getNumber() + "\n" +
//                bill.getApartment().getBlock().getAddress().getPostalCode() + ", " +
//                bill.getApartment().getBlock().getAddress().getCity();
        //take usr

        Bill bill = billRepository.findById(billId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Bill not found"));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        KeycloakAuthenticationToken kcauthentication = (KeycloakAuthenticationToken) authentication;

        Set<String> roles = kcauthentication.getAccount().getKeycloakSecurityContext().getToken().getRealmAccess().getRoles();



        if (roles.contains("user")) {
            Object apartmentId = kcauthentication.getAccount().getKeycloakSecurityContext().getToken().getOtherClaims().get("apartment_id");
            if (apartmentId == null) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Apartment id is null in token");
            }

            if (Long.parseLong((String) apartmentId) != bill.getApartmentId()) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied");
            }
        } else if (!roles.contains("administrator") && !roles.contains("manager")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unknown role");
        }

        if (!bill.isApproved()) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Bill is not approved");
        }

        String pattern = "MM-dd-yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        String billDate = simpleDateFormat.format(bill.getBillDate());

        float hotWaterFloat = bill.getHotWaterPriceToPay();
        String hotWater = String.format(java.util.Locale.US,"%.2f", hotWaterFloat);

        float coolWaterFloat = bill.getCoolWaterPriceToPay();
        String coolWater = String.format(java.util.Locale.US,"%.2f", coolWaterFloat);

        float heatingFloat = bill.getHeatingPriceToPay();
        String heating = String.format(java.util.Locale.US,"%.2f", heatingFloat);

        float electricityFloat = bill.getElectricityPriceToPay();
        String electricity = String.format(java.util.Locale.US,"%.2f", electricityFloat);

        float gasFloat = bill.getGasPriceToPay();
        String gas = String.format(java.util.Locale.US,"%.2f", gasFloat);

        float sewageFloat = bill.getSewagePriceToPay();
        String sewage = String.format(java.util.Locale.US,"%.2f", sewageFloat);


        try {
            OutputStream o = response.getOutputStream();
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/pdf");
            response.setHeader("Content-Disposition", "inline; filename=" + bill.getBillDate() + ".pdf");
            Document pdf = new Document();
            PdfWriter.getInstance(pdf, o);
            pdf.open();
            pdf.add(new Paragraph("Payments"));
            pdf.add(new Paragraph(Chunk.NEWLINE));
            PdfPTable table = new PdfPTable(2);
//            table.addCell("Apartment");
//            table.addCell(billAddress);
            table.addCell("Bill date");
            table.addCell(billDate);
            table.addCell("Hot water [zl]");
            table.addCell(hotWater);
            table.addCell("Cool water [zl]");
            table.addCell(coolWater);
            table.addCell("Heating [zl]");
            table.addCell(heating);
            table.addCell("Electricity [zl]");
            table.addCell(electricity);
            table.addCell("Gas [zl]");
            table.addCell(gas);
            table.addCell("Sewage [zl]");
            table.addCell(sewage);
            pdf.add(table);
            pdf.close();
            o.close();
        }catch (IOException | DocumentException e) {
            e.printStackTrace();
        }
    }
}


