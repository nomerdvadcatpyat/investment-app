package com.example.investment.app.back.model;

import javax.persistence.*;

@Entity
@Table(name = "brokerage_account_securities")
public class BrokerageAccountSecurities {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String ticker;

    @Column
    private Long count;

    @Column
    private Long brokerageAccountId;

    public BrokerageAccountSecurities() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public Long getBrokerageAccountId() {
        return brokerageAccountId;
    }

    public void setBrokerageAccountId(Long brokerageAccountId) {
        this.brokerageAccountId = brokerageAccountId;
    }
}