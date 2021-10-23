package com.example.investment.app.back.controller;

import com.example.investment.app.back.service.BrokerageAccountService;
import com.example.investment.app.back.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BrokerageAccountController {

    private final UserService userService;

    private final BrokerageAccountService brokerageAccountService;

    public BrokerageAccountController(UserService userService, BrokerageAccountService brokerageAccountService) {
        this.userService = userService;
        this.brokerageAccountService = brokerageAccountService;
    }

    @GetMapping("user/{id}")
    public ResponseEntity<?> helloWorld(@RequestParam("id") Long id) {
        return ;
    }

}
