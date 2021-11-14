package com.example.investment.app.back.service;

import com.example.investment.app.back.model.BrokerageAccount;
import com.example.investment.app.back.repository.BrokerageAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrokerageAccountService {

    @Autowired
    private BrokerageAccountRepository brokerageAccountRepository;

    public List<BrokerageAccount> findAllByUserId(Long userId) {
        return brokerageAccountRepository.findAllByUserId(userId);
    }

    public BrokerageAccount save(BrokerageAccount brokerageAccount) {
        return brokerageAccountRepository.save(brokerageAccount);
    }
}
