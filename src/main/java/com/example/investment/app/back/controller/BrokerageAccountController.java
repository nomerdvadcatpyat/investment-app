package com.example.investment.app.back.controller;

import com.example.investment.app.back.model.BrokerageAccount;
import com.example.investment.app.back.model.BrokerageAccountSecurities;
import com.example.investment.app.back.pojo.CreateBrokerageAccountRequestBody;
import com.example.investment.app.back.service.BrokerageAccountSecuritiesService;
import com.example.investment.app.back.service.BrokerageAccountService;
import com.example.investment.app.back.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brokerage-account")
public class BrokerageAccountController {

    @Autowired
    private final BrokerageAccountSecuritiesService brokerageAccountSecuritiesService;
    @Autowired
    private final BrokerageAccountService brokerageAccountService;

    public BrokerageAccountController (BrokerageAccountSecuritiesService brokerageAccountSecuritiesService, BrokerageAccountService brokerageAccountService) {
        this.brokerageAccountSecuritiesService = brokerageAccountSecuritiesService;
        this.brokerageAccountService = brokerageAccountService;
    }

    @GetMapping("/{brokerageAccountId}/securities")
    public List<BrokerageAccountSecurities> getBrokerageAccountSecurities (@PathVariable("brokerageAccountId") Long brokerageAccountId) {
        return brokerageAccountSecuritiesService.findAllByBrokerageAccountId(brokerageAccountId);
    }

    @PutMapping("/create")
    public HttpStatus saveBrokerageAccountSecurities (
            @RequestBody CreateBrokerageAccountRequestBody createBrokerageAccountRequestBody,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        var accountName = createBrokerageAccountRequestBody.getBrokerageAccount();
        var userId = userDetails.getId();

        brokerageAccountService.save(new BrokerageAccount(accountName, userId));

        return HttpStatus.OK;
    }

}
