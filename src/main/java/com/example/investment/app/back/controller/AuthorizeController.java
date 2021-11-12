package com.example.investment.app.back.controller;

import com.example.investment.app.back.dtoObjects.UserDTO;
import com.example.investment.app.back.entity.User;
import com.example.investment.app.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthorizeController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String showAuthorizeForm(WebRequest request, Model model) {
        User userDto = new User();
        model.addAttribute("user", userDto);
        return "Authorization";
    }

    @PostMapping("/")
    public ModelAndView authorizeUserAccount(@ModelAttribute("user") @Valid UserDTO userDto,
                                            HttpServletRequest request, Errors errors) {
        try {
            User authorized = userService.authorizeUser(userDto);
        } catch (Exception ex) {
            return new ModelAndView("UnsuccessfulAuthorize", "userAuth", userDto);
        }

        return new ModelAndView("successAuthorize", "userAuth", userDto);
    }
}
