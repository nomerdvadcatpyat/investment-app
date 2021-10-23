package com.example.investment.app.back.controller;

import com.example.investment.app.back.entity.BrokerageAccount;
import com.example.investment.app.back.entity.BrokerageAccountSecurities;
import com.example.investment.app.back.entity.User;
import com.example.investment.app.back.service.BrokerageAccountSecuritiesService;
import com.example.investment.app.back.service.BrokerageAccountService;
import com.example.investment.app.back.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    private final BrokerageAccountService brokerageAccountService;

    private final BrokerageAccountSecuritiesService brokerageAccountSecuritiesService;

    public UserController (UserService userService, BrokerageAccountService brokerageAccountService, BrokerageAccountSecuritiesService brokerageAccountSecuritiesService) {
        this.userService = userService;
        this.brokerageAccountService = brokerageAccountService;
        this.brokerageAccountSecuritiesService = brokerageAccountSecuritiesService;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.findAll();
    }

    @GetMapping("{userId}/brokerage-accounts")
    public List<BrokerageAccount> getUserBrokerageAccounts (@PathVariable("userId") Long id) {
        return brokerageAccountService.findAllByUserId(id);
    }

    @GetMapping("{userId}/securities")
    public List<BrokerageAccountSecurities> getUserBrokerageAccountSecurities (@PathVariable("userId") Long userId) {
        return brokerageAccountSecuritiesService.findAllByUserId(userId);
    }

    @PutMapping()
    public User saveUser (@RequestBody User user) {
        return userService.saveUser(user);
    }
}
