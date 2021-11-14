package com.example.investment.app.back.pojo;

public class CreateBrokerageAccountRequestBody {

    private String brokerageAccount;

    public CreateBrokerageAccountRequestBody() {};

    public CreateBrokerageAccountRequestBody(String brokerageAccount) {
        this.brokerageAccount = brokerageAccount;
    }

    public String getBrokerageAccount() {
        return brokerageAccount;
    }

    public void setBrokerageAccount(String brokerageAccount) {
        this.brokerageAccount = brokerageAccount;
    }
}
