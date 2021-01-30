package com.example.billservice.service;

import com.example.billservice.domain.Bill;
import org.springframework.security.access.prepost.PreAuthorize;
import javax.servlet.http.HttpServletResponse;

public interface PdfService {
    void generatePdf(Long billId, HttpServletResponse response);
}