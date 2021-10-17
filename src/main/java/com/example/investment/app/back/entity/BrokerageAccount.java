package com.example.investment.app.back.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "brokerage_accounts")
public class BrokerageAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @OneToMany
    @JoinColumn(name="brokerage_account_id")
    private List<BrokerageAccountSecurities> brokerageAccountSecurities;

    public BrokerageAccount() {}

    public BrokerageAccount(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<BrokerageAccountSecurities> getBrokerageAccountSecurities() {
        return brokerageAccountSecurities;
    }

    public void setBrokerageAccountSecurities(List<BrokerageAccountSecurities> brokerageAccountSecurities) {
        this.brokerageAccountSecurities = brokerageAccountSecurities;
    }
}