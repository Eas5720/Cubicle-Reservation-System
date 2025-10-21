package com.example.demo.service;

import com.example.demo.domain.Cubical;
import com.example.demo.repository.CubicalRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class CubicalService {

    private final CubicalRepository cubicalRepository;

    // Business logic described here
    // CRUD Create Read Update Delete are defined in the repository
    // Defined automatically

    @Transactional
    public Cubical create(Cubical cubical){

        return cubicalRepository.save(cubical);

    }

    public List<Cubical> findAll(){
        return cubicalRepository.findAll();
    }


}
