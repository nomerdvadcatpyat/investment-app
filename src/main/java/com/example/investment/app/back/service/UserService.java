package com.example.investment.app.back.service;

import com.example.investment.app.back.model.User;
import com.example.investment.app.back.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findByUserName(String username) {
        return userRepository.findByUsername(username);
    }
}
