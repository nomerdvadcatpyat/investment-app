package com.example.investment.app.back.controller;

import com.example.investment.app.back.service.ExchangeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exchange")
public class ExchangeController {

    @Autowired
    private ExchangeService exchangeService;

    public ExchangeController(ExchangeService exchangeService) {
        this.exchangeService = exchangeService;
    }

    @GetMapping("/{market}/{board}")
    public String getSecurities (
            @PathVariable("market") String market,
            @PathVariable("board") String board,
            @RequestParam(required = false) List<String> requiredSecurities
    ) {
        if (requiredSecurities != null) {
            return exchangeService.getRequiredSecurities(market, board, requiredSecurities);
        }

        return exchangeService.getSecurities(market, board);
    }

    @GetMapping("/{market}/{board}/{secId}")
    public String getSecurity (
            @PathVariable("market") String market,
            @PathVariable("board") String board,
            @PathVariable("secId") String secId
    ) {
        return exchangeService.getSecurity(market, board, secId);
    }
}
