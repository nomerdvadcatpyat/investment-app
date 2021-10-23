package com.example.investment.app.back.repository;

import com.example.investment.app.back.entity.BrokerageAccountSecurities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrokerageAccountSecuritiesRepository extends JpaRepository<BrokerageAccountSecurities, Long> {

    @Query(value = "SELECT * FROM brokerage_account_securities bas " +
            "JOIN brokerage_accounts ba ON bas.brokerage_account_id = ba.id " +
            "WHERE ba.user_id=:userId", nativeQuery = true)
    List<BrokerageAccountSecurities> findAllByUserId(@Param(value = "userId") Long userId);

    List<BrokerageAccountSecurities> findAllByBrokerageAccountId(Long brokerageAccountId);
}
