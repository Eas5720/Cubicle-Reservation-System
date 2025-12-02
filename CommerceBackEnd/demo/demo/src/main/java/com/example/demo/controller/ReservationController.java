package com.example.demo.controller;

import com.example.demo.dto.ReservationRequest;
import com.example.demo.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@AllArgsConstructor
public class ReservationController {

    //controller is the entry point

    private final ReservationService reservationService;

    @PostMapping("/reservation")
    public ResponseEntity<?> save(@RequestBody ReservationRequest reservation){
        return new ResponseEntity<>(reservationService.create(reservation), HttpStatus.CREATED);
    }


    @GetMapping("/reservations")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(
                reservationService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/reservations/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        return new ResponseEntity<>(
                reservationService.findById(id), HttpStatus.OK);
    }
    @GetMapping("/reservations/employees/{id}")
    public ResponseEntity<?> findAllByEmployeeId(@PathVariable Long id){
        return new ResponseEntity<>(
                reservationService.findAllByEmployeeId(id), HttpStatus.OK);
    }

    @DeleteMapping("/reservations/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable Long id) {
        reservationService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/reservations/cubicles")
    public ResponseEntity<?> findByCubicle(@RequestParam String roomNumber, @RequestParam int floor){
        return new ResponseEntity<>(
                reservationService.findByCubicle(roomNumber, floor), HttpStatus.OK);

    }

}
