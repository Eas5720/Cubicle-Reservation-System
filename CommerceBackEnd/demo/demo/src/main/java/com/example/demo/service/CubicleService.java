package com.example.demo.service;

import com.example.demo.domain.Cubicle;
import com.example.demo.repository.CubicleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class CubicleService {

    private final CubicleRepository cubicleRepository;

    // Business logic described here
    // CRUD Create Read Update Delete are defined in the repository
    // Defined automatically

    @Transactional
    public Cubicle create(Cubicle cubicle){

        return cubicleRepository.save(cubicle);

    }

    public Cubicle findById(Long id){
        return cubicleRepository.findById(id).orElse(null);
    }

    public List<Cubicle> findAllAvailable(String startdate, String enddate){
        List<Cubicle> availableCubicles = cubicleRepository.findAll();

        return availableCubicles;
    }

    public List<Cubicle> findAll(){
        return cubicleRepository.findAll();
    }


}
