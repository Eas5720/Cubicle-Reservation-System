package com.example.demo.controller;

import com.example.demo.domain.Cubicle;
import com.example.demo.service.CubicleService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/cubicles/{startdate}/{enddate}")
    public ResponseEntity<?> findAllAvailable(@PathVariable String startdate, @PathVariable String enddate){
        return new ResponseEntity<>(
                cubicleService.findAllAvailable(startdate, enddate), HttpStatus.OK);
    }


}
