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
    private String market;

    @Column
    private String board;

    @Column
    private Long count;

    @Column
    private Long brokerageAccountId;

    public BrokerageAccountSecurities() {}

    public BrokerageAccountSecurities(Long id, String ticker, String market, String board, Long count, Long brokerageAccountId) {
        this.id = id;
        this.ticker = ticker;
        this.count = count;
        this.market = market;
        this.board = board;
        this.brokerageAccountId = brokerageAccountId;
    }

    public BrokerageAccountSecurities(String ticker, String market, String board, Long count, Long brokerageAccountId) {
        this.ticker = ticker;
        this.count = count;
        this.market = market;
        this.board = board;
        this.brokerageAccountId = brokerageAccountId;
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

    public String getMarket() {
        return market;
    }

    public void setMarket(String market) {
        this.market = market;
    }

    public String getBoard() {
        return board;
    }

    public void setBoard(String board) {
        this.board = board;
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