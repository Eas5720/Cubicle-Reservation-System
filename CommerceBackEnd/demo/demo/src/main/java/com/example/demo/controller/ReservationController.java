package com.example.demo.controller;

import com.example.demo.domain.Reservation;
import com.example.demo.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class ReservationController {

    //controller is the entry point

    private final ReservationService reservationService;

    @GetMapping("/hello")
    public String save(){

        return "Hello World";

    }

    // GET "/students/{id}"

    @PostMapping("/reservation")
    public ResponseEntity<?> save(@RequestBody Reservation reservation, @PathVariable Long employeeID, @PathVariable Long cubicalID){
        return new ResponseEntity<>(reservationService.create(reservation, employeeID, cubicalID), HttpStatus.CREATED);
    }


    @GetMapping("/reservations")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(
                reservationService.findAll(), HttpStatus.OK);
    }


}
