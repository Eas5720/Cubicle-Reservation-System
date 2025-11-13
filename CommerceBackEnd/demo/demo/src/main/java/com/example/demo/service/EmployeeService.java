package com.example.demo.service;

import com.example.demo.domain.Employee;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.ReservationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final ReservationRepository reservationRepository;

    // Business logic described here
    // CRUD Create Read Update Delete are defined in the repository
    // Defined automatically

    @Transactional
    public Employee create(Employee employee){

        return employeeRepository.save(employee);

    }

    @Transactional
    public Employee findById(long id){
        return employeeRepository.findById(id).orElse(null);
    }

    public Employee login(Employee employee){
        List<Employee> employees = findAll();
        for(Employee e: employees){
            if(e.getEmail().equals(employee.getEmail()) &&  e.getPassword().equals(employee.getPassword())) {
                return e;
            }
        }
        return null;
    }

    public List<Employee> findAll(){
        return employeeRepository.findAll();
    }


}
