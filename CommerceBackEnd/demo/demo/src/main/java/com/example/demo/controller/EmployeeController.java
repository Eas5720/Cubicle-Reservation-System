package com.example.demo.controller;

import com.example.demo.domain.Employee;
import com.example.demo.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    //This should be changed to a get mapping
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Employee employee){
        return new ResponseEntity<>(employeeService.login(employee), HttpStatus.OK);
    }

    @PostMapping("/employee")
    public ResponseEntity<?> save(@RequestBody Employee employee){
        return new ResponseEntity<>(employeeService.create(employee), HttpStatus.CREATED);
    }

    @GetMapping("/employees")
    public ResponseEntity<?> findAll(){
        return new ResponseEntity<>(
                employeeService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        return new ResponseEntity<>(
                employeeService.findById(id), HttpStatus.OK);
    }




}
