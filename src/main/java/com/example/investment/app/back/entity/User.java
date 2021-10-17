package com.example.investment.app.back.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String login;

    @Column
    private String password;

    @OneToMany
    @JoinColumn(name="user_id")
    private List<BrokerageAccount> brokerageAccount;

    public User() {}

    public User(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public List<BrokerageAccount> getBrokerageAccount() {
        return brokerageAccount;
    }

    public void setBrokerageAccount(List<BrokerageAccount> brokerageAccount) {
        this.brokerageAccount = brokerageAccount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
