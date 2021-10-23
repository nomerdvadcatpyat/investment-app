package com.example.investment.app.back.controller;

import com.example.investment.app.back.entity.BrokerageAccount;
import com.example.investment.app.back.entity.BrokerageAccountSecurities;
import com.example.investment.app.back.service.BrokerageAccountSecuritiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("/api/brokerage-account")
public class BrokerageAccountController {

    @Autowired
    private final BrokerageAccountSecuritiesService brokerageAccountSecuritiesService;

    public BrokerageAccountController (BrokerageAccountSecuritiesService brokerageAccountSecuritiesService) {
        this.brokerageAccountSecuritiesService = brokerageAccountSecuritiesService;
    }

    @GetMapping("{brokerageAccountId}/securities")
    public List<BrokerageAccountSecurities> getBrokerageAccountSecurities (@PathVariable("brokerageAccountId") Long brokerageAccountId) {
        return brokerageAccountSecuritiesService.findAllByBrokerageAccountId(brokerageAccountId);
    }

//    @PutMapping
//    public BrokerageAccountSecurities saveBrokerageAccountSecurities () {
//
//    }

}
