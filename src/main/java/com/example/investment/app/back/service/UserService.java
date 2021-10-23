package com.example.investment.app.back.service;

import com.example.investment.app.back.entity.User;
import com.example.investment.app.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void createUsers(List<User> users) {
        userRepository.saveAll(users);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id) { return  userRepository.findById(id); }
}
