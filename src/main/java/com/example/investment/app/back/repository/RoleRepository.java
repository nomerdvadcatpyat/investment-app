package com.example.investment.app.back.repository;

import com.example.investment.app.back.model.ERole;
import com.example.investment.app.back.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long>{
	Optional<Role> findByRole(ERole role);
}
