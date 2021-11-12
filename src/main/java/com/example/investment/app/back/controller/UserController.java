package com.example.investment.app.back.controller;

import com.example.investment.app.back.model.BrokerageAccount;
import com.example.investment.app.back.model.BrokerageAccountSecurities;
import com.example.investment.app.back.model.User;
import com.example.investment.app.back.service.BrokerageAccountSecuritiesService;
import com.example.investment.app.back.service.BrokerageAccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final BrokerageAccountService brokerageAccountService;

    private final BrokerageAccountSecuritiesService brokerageAccountSecuritiesService;

    public UserController (BrokerageAccountService brokerageAccountService, BrokerageAccountSecuritiesService brokerageAccountSecuritiesService) {
        this.brokerageAccountService = brokerageAccountService;
        this.brokerageAccountSecuritiesService = brokerageAccountSecuritiesService;
    }

    @GetMapping("{userId}/brokerage-accounts")
    public List<BrokerageAccount> getUserBrokerageAccounts (@PathVariable("userId") Long id) {
        return brokerageAccountService.findAllByUserId(id);
    }

    @GetMapping("{userId}/securities")
    public List<BrokerageAccountSecurities> getUserBrokerageAccountSecurities (@PathVariable("userId") Long userId) {
        return brokerageAccountSecuritiesService.findAllByUserId(userId);
    }
}
