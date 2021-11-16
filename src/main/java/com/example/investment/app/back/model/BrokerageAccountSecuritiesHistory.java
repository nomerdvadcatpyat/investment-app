package com.example.investment.app.back.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "brokerage_account_securities_history")
public class BrokerageAccountSecuritiesHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private Timestamp date;

    @Column
    private Long brokerageAccountId;

    @Column
    private String ticker;

    @Column
    private double price;

    public BrokerageAccountSecuritiesHistory() {}

    public BrokerageAccountSecuritiesHistory(Timestamp date, Long brockerageId, String ticker, double price){
        this.date = date;
        this.brokerageAccountId = brockerageId;
        this.ticker = ticker;
        this.price = price;
    }

    public BrokerageAccountSecuritiesHistory(Long id, Timestamp date, Long brockerageId, String ticker, double price){
        this.id = id;
        this.date = date;
        this.brokerageAccountId = brockerageId;
        this.ticker = ticker;
        this.price = price;
    }
}
