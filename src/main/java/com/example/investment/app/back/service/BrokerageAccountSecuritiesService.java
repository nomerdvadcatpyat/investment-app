package com.example.investment.app.back.service;

import com.example.investment.app.back.model.BrokerageAccountSecurities;
import com.example.investment.app.back.repository.BrokerageAccountSecuritiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrokerageAccountSecuritiesService {

    @Autowired
    private BrokerageAccountSecuritiesRepository brokerageAccountSecuritiesRepository;

    public List<BrokerageAccountSecurities> findAllByBrokerageAccountId (Long brokerageAccountId) {
        return brokerageAccountSecuritiesRepository.findAllByBrokerageAccountId(brokerageAccountId);
    }

    public List<BrokerageAccountSecurities> findAllByUserId (Long userId) {
        return brokerageAccountSecuritiesRepository.findAllByUserId(userId);
    }

    public BrokerageAccountSecurities createBrokerageAccountSecurities (BrokerageAccountSecurities brokerageAccountSecurities) {
        return brokerageAccountSecuritiesRepository.save(brokerageAccountSecurities);
    }

}
