package com.example.investment.app.back.model;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role {

	@Id
	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private ERole role;
	
	public Role() {}

	public Role(ERole role) {
		this.role = role;
	}

	public String getName() {
		return role.name();
	}

	public void setName(ERole role) {
		this.role = role;
	}
	
}
