package com.example.investment.app.back.repository;

import com.example.investment.app.back.model.BrokerageAccountSecuritiesHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrokerageAccountSecuritiesHistoryRepository extends JpaRepository<BrokerageAccountSecuritiesHistory, Long> {
}
