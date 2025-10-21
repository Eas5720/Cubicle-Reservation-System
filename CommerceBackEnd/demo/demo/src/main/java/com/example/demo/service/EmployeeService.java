package com.example.demo.service;

import com.example.demo.domain.Employee;
import com.example.demo.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    // Business logic described here
    // CRUD Create Read Update Delete are defined in the repository
    // Defined automatically

    @Transactional
    public Employee create(Employee employee){

        return employeeRepository.save(employee);

    }

    public List<Employee> findAll(){
        return employeeRepository.findAll();
    }


}
