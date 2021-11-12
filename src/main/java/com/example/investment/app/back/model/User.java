package com.example.investment.app.back.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String username;

    @Column
    private String password;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role")
    private Role role;

    @OneToMany
    @JoinColumn(name="user_id")
    private List<BrokerageAccount> brokerageAccount;

    public User() {}

    public User(String username, String password) {
        this.username = username;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole()
    {
        return role;
    }

    public void setRole(Role role)
    {
        this.role = role;
    }
}
