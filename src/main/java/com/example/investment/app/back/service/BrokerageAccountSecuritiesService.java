package com.example.investment.app.back.service;

import com.example.investment.app.back.model.BrokerageAccountSecurities;
import com.example.investment.app.back.repository.BrokerageAccountSecuritiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrokerageAccountSecuritiesService {

    @Autowired
    private BrokerageAccountSecuritiesRepository brokerageAccountSecuritiesRepository;

    public List<BrokerageAccountSecurities> findAllByBrokerageAccountId (Long brokerageAccountId) {
        return brokerageAccountSecuritiesRepository.findAllByBrokerageAccountId(brokerageAccountId);
    }

    public Optional<BrokerageAccountSecurities> findByBrokerageAccountIdAndTicker (Long brokerageAccountId, String ticker) {
        return brokerageAccountSecuritiesRepository.findByBrokerageAccountIdAndTicker(brokerageAccountId, ticker);
    }

    public List<BrokerageAccountSecurities> findAllByUserId (Long userId) {
        return brokerageAccountSecuritiesRepository.findAllByUserId(userId);
    }

    public BrokerageAccountSecurities save (BrokerageAccountSecurities brokerageAccountSecurities) {
        return brokerageAccountSecuritiesRepository.save(brokerageAccountSecurities);
    }

}
