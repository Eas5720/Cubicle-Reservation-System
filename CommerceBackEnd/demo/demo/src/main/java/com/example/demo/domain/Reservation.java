package com.example.demo.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity // All of these create the methods
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //Primary Key
    @ManyToOne
    private Employee employee;
    @ManyToOne
    private Cubicle cubicle;
    private LocalDate startDate;
    private LocalDate endDate;
}
