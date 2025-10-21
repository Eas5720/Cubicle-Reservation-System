package com.example.demo.service;

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

    // Business logic described here
    // CRUD Create Read Update Delete are defined in the repository
    // Defined automatically

    @Transactional
    public Reservation create(Reservation reservation){

        return reservationRepository.save(reservation);

    }

    public List<Reservation> findAll(){
        return reservationRepository.findAll();
    }


}
