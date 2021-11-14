package com.example.investment.app.back.controller;

import com.example.investment.app.back.model.BrokerageAccount;
import com.example.investment.app.back.model.BrokerageAccountSecurities;
import com.example.investment.app.back.service.BrokerageAccountSecuritiesService;
import com.example.investment.app.back.service.BrokerageAccountService;
import com.example.investment.app.back.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final BrokerageAccountService brokerageAccountService;
    private final BrokerageAccountSecuritiesService brokerageAccountSecuritiesService;
    private final UserService userService;

    public UserController (BrokerageAccountService brokerageAccountService, BrokerageAccountSecuritiesService brokerageAccountSecuritiesService, UserService userService) {
        this.brokerageAccountService = brokerageAccountService;
        this.brokerageAccountSecuritiesService = brokerageAccountSecuritiesService;
        this.userService = userService;
    }

    @GetMapping("/{username}/brokerage-accounts")
    public List<BrokerageAccount> getUserBrokerageAccounts (@PathVariable("username") String username) {
        final var user = userService.findByUserName(username);

        if (user.isPresent())
            return brokerageAccountService.findAllByUserId(user.get().getId());
        else
            return new ArrayList<>();
    }

    @GetMapping("/{username}/securities")
    public List<BrokerageAccountSecurities> getUserBrokerageAccountSecurities (@PathVariable("username")String username) {
        final var user = userService.findByUserName(username);

        if (user.isPresent())
            return brokerageAccountSecuritiesService.findAllByUserId(user.get().getId());
        else
            return new ArrayList<>();
    }
}
