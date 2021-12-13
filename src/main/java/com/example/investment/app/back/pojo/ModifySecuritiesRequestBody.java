package com.example.investment.app.back.pojo;

public class ModifySecuritiesRequestBody {
    private Long delta;
    private String ticker;
    private String market;
    private String board;
    private double price;

    public ModifySecuritiesRequestBody(Long delta, String ticker, String market, String board, double price) {
        this.delta = delta;
        this.ticker = ticker;
        this.market = market;
        this.board = board;
        this.price = price;
    }

    public Long getDelta() {
        return delta;
    }

    public void setDelta(Long delta) {
        this.delta = delta;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
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

    public void setPrice(double price) {
        this.price = price;
    }
}
