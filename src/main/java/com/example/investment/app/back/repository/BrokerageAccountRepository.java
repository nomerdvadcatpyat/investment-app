package com.example.investment.app.back.repository;

import com.example.investment.app.back.entity.BrokerageAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrokerageAccountRepository extends JpaRepository<BrokerageAccount, Long> {

    @Query(value = "SELECT * FROM brokerage_accounts WHERE user_id=:userId", nativeQuery = true)
    public List<BrokerageAccount> findAllByUserId(@Param(value = "userId") Long userId);
}
