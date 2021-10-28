package com.example.investment.app.back.service;

import com.example.investment.app.back.dtoObjects.UserDTO;
import com.example.investment.app.back.entity.User;
import com.example.investment.app.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService{

    @Autowired
    private UserRepository userRepository;

    public void createUsers(List<User> users) {
        userRepository.saveAll(users);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findUserByLogin(String login)
    {
        return userRepository.findByLogin(login);
    }

    public User registerNewUserAccount(UserDTO userDto)
    {
        User user = new User(userDto);
        return userRepository.save(user);
    }

    public User authorizeUser(UserDTO userDto)
    {
        User user = userRepository.findByLogin(userDto.getLogin());
        return user;
    }
}
