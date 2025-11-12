package com.example.demo.dto;

import lombok.Getter;

import java.util.Date;


@Getter
public class ReservationRequest {
    private Long employeeId;
    private Long cubicleId;
    private Date startDate;
    private Date endDate;

    ReservationRequest(Long employeeId, Long cubicleId, Date startDate, Date endDate) {
        this.employeeId = employeeId;
        this.cubicleId = cubicleId;
        this.startDate = startDate;
        this.endDate = endDate;
    };

}
