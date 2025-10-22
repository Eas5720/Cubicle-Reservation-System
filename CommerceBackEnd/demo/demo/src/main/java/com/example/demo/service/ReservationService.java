package com.example.demo.service;

import com.example.demo.domain.Cubical;
import com.example.demo.domain.Employee;
import com.example.demo.domain.Reservation;
import com.example.demo.repository.ReservationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final EmployeeService employeeService;
    private final CubicalService cubicalService;

    // Business logic described here
    // CRUD Create Read Update Delete are defined in the repository
    // Defined automatically

    @Transactional
    public Reservation create(Reservation reservation, Long employeeId, Long cubicalID){
        Employee employee = employeeService.findById(employeeId);
        Cubical cubical = cubicalService.findById(cubicalID);
        reservation.setEmployee(employee);
        reservation.setCubical(cubical);
        return reservationRepository.save(reservation);
    }

    public Reservation findById(long id){
        return reservationRepository.findById(id).orElse(null);
    }

    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }


}
