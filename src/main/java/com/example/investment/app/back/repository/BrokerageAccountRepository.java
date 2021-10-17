package com.example.investment.app.back.repository;

import com.example.investment.app.back.entity.BrokerageAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BrokerageAccountRepository extends JpaRepository<BrokerageAccount, Long> { }
