package com.example.investment.app.back.service;

import com.example.investment.app.back.entity.User;
import com.example.investment.app.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    public UserService (UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser (User user) {
        return userRepository.save(user);
    }

    public List<User> findAll () {
        return userRepository.findAll();
    }

    public User getUserById (Long id) {
        return userRepository.getById(id);
    }
}
