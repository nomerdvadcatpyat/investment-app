package com.example.investment.app.back.pojo;

public class ModifySecuritiesRequestBody {
    private Long delta;
    private String ticker;

    public ModifySecuritiesRequestBody(Long delta, String ticker) {
        this.delta = delta;
        this.ticker = ticker;
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
}
