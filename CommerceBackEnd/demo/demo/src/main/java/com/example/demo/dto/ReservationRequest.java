package com.example.demo.dto;

import com.example.demo.domain.Cubical;
import com.example.demo.domain.Employee;
import com.example.demo.domain.Reservation;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;


@Getter
public class ReservationRequest {
    private Long employeeId;
    private Long cubicalId;
    private Date startDate;
    private Date endDate;

    ReservationRequest(Long employeeId, Long cubicalId, Date startDate, Date endDate) {
        this.employeeId = employeeId;
        this.cubicalId = cubicalId;
        this.startDate = startDate;
        this.endDate = endDate;
    };

}
