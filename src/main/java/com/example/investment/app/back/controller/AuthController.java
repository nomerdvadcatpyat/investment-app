package com.example.investment.app.back.controller;

import com.example.investment.app.back.configs.jwt.JwtUtils;
import com.example.investment.app.back.model.ERole;
import com.example.investment.app.back.model.Role;
import com.example.investment.app.back.model.User;
import com.example.investment.app.back.pojo.JwtResponse;
import com.example.investment.app.back.pojo.LoginRequest;
import com.example.investment.app.back.pojo.MessageResponse;
import com.example.investment.app.back.pojo.SignupRequest;
import com.example.investment.app.back.repository.RoleRepository;
import com.example.investment.app.back.repository.UserRepository;
import com.example.investment.app.back.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRespository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authUser(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                roles
        ));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest) {

        if (userRespository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is exist"));
        }

        User user = new User(signupRequest.getUsername(), passwordEncoder.encode(signupRequest.getPassword()));

        String reqRole = signupRequest.getRole();
        Role role;

        System.out.println(ERole.ROLE_USER);

        if (reqRole == null) {
			role = roleRepository
					.findByRole(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error, Role USER is not found"));
        } else {
            switch (reqRole) {
                case "admin":
					role = roleRepository
							.findByRole(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error, Role ADMIN is not found"));

                    break;

                default:
					role = roleRepository
							.findByRole(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error, Role USER is not found"));
            }
        }

        user.setRole(role);
        userRespository.save(user);
        return ResponseEntity.ok(new MessageResponse("User CREATED"));
    }
}
