package com.example.demo.controller;

import com.example.demo.domain.Cubical;
import com.example.demo.service.CubicalService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class CubicalController {

    //controller is the entry point

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


}
