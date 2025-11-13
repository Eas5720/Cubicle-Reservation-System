package com.example.demo.dto;

import lombok.Getter;
import java.time.LocalDate;


@Getter
public class ReservationRequest {
    private Long employeeId;
    private Long cubicleId;
    private LocalDate startDate;
    private LocalDate endDate;

    ReservationRequest(Long employeeId, Long cubicleId, LocalDate startDate, LocalDate endDate) {
        this.employeeId = employeeId;
        this.cubicleId = cubicleId;
        this.startDate = startDate;
        this.endDate = endDate;
    };

}
