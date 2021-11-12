package com.example.investment.app.back.controller;

import com.example.investment.app.back.dtoObjects.UserDTO;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import com.example.investment.app.back.entity.User;
import com.example.investment.app.back.service.UserService;
import com.github.galimru.tinkoff.TinkoffInvestClient;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/registration")
public class RegistrationController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String showRegistrationForm(WebRequest request, Model model) {
        User userDto = new User();
        model.addAttribute("user", userDto);
        return "registration";
    }

    @PostMapping("/")
    public ModelAndView registerUserAccount(@ModelAttribute("user") @Valid UserDTO userDto,
                                            HttpServletRequest request, Errors errors) {
        try {
            User registered = userService.registerNewUserAccount(userDto);
        } catch (Exception ex) {

        }

        return new ModelAndView("successRegister", "user", userDto);
    }
}
