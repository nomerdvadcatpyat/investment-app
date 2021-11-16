package com.example.investment.app.back.service;

import com.example.investment.app.back.configs.jwt.JwtUtils;
import com.example.investment.app.back.model.ERole;
import com.example.investment.app.back.model.Role;
import com.example.investment.app.back.model.User;
import com.example.investment.app.back.pojo.JwtResponse;
import com.example.investment.app.back.pojo.LoginRequest;
import com.example.investment.app.back.pojo.SignupRequest;
import com.example.investment.app.back.repository.RoleRepository;
import com.example.investment.app.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    public JwtResponse authUser (LoginRequest loginRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                roles
        );
    }

    public JwtResponse registerUser (SignupRequest signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            throw new RuntimeException("Error: Username is exist");
        }
        User user = new User(signupRequest.getUsername(), passwordEncoder.encode(signupRequest.getPassword()));

        String reqRole = signupRequest.getRole();
        Role role;

        if (reqRole == null) {
            role = roleRepository
                    .findByRole(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error, Role USER is not found"));
        } else {
            if ("admin".equals(reqRole)) {
                role = roleRepository
                        .findByRole(ERole.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Error, Role ADMIN is not found"));
            } else {
                role = roleRepository
                        .findByRole(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error, Role USER is not found"));
            }
        }

        user.setRole(role);
        userRepository.save(user);

        return authUser(new LoginRequest(signupRequest.getUsername(), signupRequest.getPassword()));
    }
}
