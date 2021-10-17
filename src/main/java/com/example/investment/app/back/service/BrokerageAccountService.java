package com.example.investment.app.back.service;

import com.example.investment.app.back.repository.BrokerageAccountRepository;
import com.example.investment.app.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class BrokerageAccountService {

    @Autowired
    private BrokerageAccountRepository brokerageAccountRepository;

}
