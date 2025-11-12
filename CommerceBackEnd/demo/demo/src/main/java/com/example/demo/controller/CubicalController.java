package com.example.demo.controller;

import com.example.demo.domain.Cubical;
import com.example.demo.service.CubicalService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class CubicalController {

    private final CubicalService cubicalService;

    @PostMapping("/cubical")
    public ResponseEntity<?> save(@RequestBody Cubical cubical){
        return new ResponseEntity<>(cubicalService.create(cubical), HttpStatus.CREATED);
    }


    @GetMapping("/cubicals")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(
                cubicalService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/cubicals/{startdate}/{enddate}")
    public ResponseEntity<?> findAllAvailable(@PathVariable String startdate, @PathVariable String enddate){
        return new ResponseEntity<>(
                cubicalService.findAllAvailable(startdate, enddate), HttpStatus.OK);
    }


}
