package com.example.investment.app.back.service;

import com.example.investment.app.back.model.BrokerageAccountSecuritiesHistory;
import com.example.investment.app.back.repository.BrokerageAccountSecuritiesHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BrokerageAccountSecuritiesHistoryService {
    @Autowired
    private BrokerageAccountSecuritiesHistoryRepository brokerageAccountSecuritiesHistoryRepository;

    public BrokerageAccountSecuritiesHistory save(BrokerageAccountSecuritiesHistory brokerageAccountSecuritiesHistory) {
        return brokerageAccountSecuritiesHistoryRepository.save(brokerageAccountSecuritiesHistory);
    }
}
