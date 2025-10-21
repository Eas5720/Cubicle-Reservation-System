package com.example.demo.service;

import com.example.demo.domain.User;
import com.example.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    // Business logic described here
    // CRUD Create Read Update Delete are defined in the repository
    // Defined automatically

    @Transactional
    public User create(User user){

        return userRepository.save(user);

    }

    public List<User> findAll(){
        return userRepository.findAll();
    }


}
