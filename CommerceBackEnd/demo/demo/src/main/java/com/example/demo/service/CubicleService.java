package com.example.demo.service;

import com.example.demo.domain.Cubicle;
import com.example.demo.domain.Employee;
import com.example.demo.domain.Reservation;
import com.example.demo.repository.CubicleRepository;
import com.example.demo.repository.ReservationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class CubicleService {

    private final CubicleRepository cubicleRepository;
    private final ReservationRepository reservationRepository;
    // Business logic described here
    // CRUD Create Read Update Delete are defined in the repository
    // Defined automatically

    @Transactional
    public Cubicle create(Cubicle cubicle){

        return cubicleRepository.save(cubicle);

    }
    @Transactional
    public Cubicle findById(Long id){
        return cubicleRepository.findById(id).orElse(null);
    }

    public List<Cubicle> findAllAvailable(LocalDate startDate, LocalDate endDate){
        List<Cubicle> availableCubicles = cubicleRepository.findAll();
        List<Reservation> allReservations = reservationRepository.findAll();
        for (Reservation reservation : allReservations){
            LocalDate rStartDate = reservation.getStartDate();
            LocalDate rEndDate = reservation.getEndDate();
            if((rStartDate.isBefore(startDate)) && (rEndDate.isAfter(startDate))
            || (rStartDate.isBefore(endDate)) && (rEndDate.isAfter(endDate))
            || (rStartDate.isAfter(startDate) && rEndDate.isBefore(endDate))){
                availableCubicles.remove(reservation.getCubicle());
            }
        }
        return availableCubicles;
    }

    public List<Cubicle> findAll(){
        return cubicleRepository.findAll();
    }


}
