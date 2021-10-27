package com.example.investment.app.back.entity;

import com.example.investment.app.back.dtoObjects.UserDTO;

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

    @Column
    private String role;

    @OneToMany
    @JoinColumn(name="user_id")
    private List<BrokerageAccount> brokerageAccount;

    public User() {}

    public User(String login, String password, String role) {
        this.login = login;
        this.password = password;
        this.role = role;
    }

    public User(UserDTO userDto)
    {
        login = userDto.getLogin();
        password = userDto.getPassword();
        role = userDto.getRole();
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

    public String getRole()
    {
        return role;
    }

    public void setRole(String role)
    {
        this.role = role;
    }
}
