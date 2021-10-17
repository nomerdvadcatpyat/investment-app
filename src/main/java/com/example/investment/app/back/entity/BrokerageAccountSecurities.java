package com.example.investment.app.back.entity;

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

    public BrokerageAccountSecurities() {}

    public BrokerageAccountSecurities(String ticker, Long count) {
        this.ticker = ticker;
        this.count = count;
    }

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
}