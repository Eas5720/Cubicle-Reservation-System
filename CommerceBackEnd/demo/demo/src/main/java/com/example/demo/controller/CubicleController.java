package com.example.demo.controller;

import com.example.demo.domain.Cubicle;
import com.example.demo.service.CubicleService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@AllArgsConstructor
public class CubicleController {

    private final CubicleService cubicleService;

    @PostMapping("/cubicle")
    public ResponseEntity<?> save(@RequestBody Cubicle cubicle){
        return new ResponseEntity<>(cubicleService.create(cubicle), HttpStatus.CREATED);
    }


    @GetMapping("/cubicles")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(
                cubicleService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/cubicles/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        return new ResponseEntity<>(
                cubicleService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/cubicles/available")
    public ResponseEntity<?> findAllAvailable(@RequestParam LocalDate startDate, @RequestParam LocalDate endDate){
        return new ResponseEntity<>(
                cubicleService.findAllAvailable(startDate, endDate), HttpStatus.OK);
    }


}
