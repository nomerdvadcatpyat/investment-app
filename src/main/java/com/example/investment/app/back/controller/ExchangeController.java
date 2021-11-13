package com.example.investment.app.back.controller;

import com.example.investment.app.back.moexMapper.Mapper;
import com.example.investment.app.back.service.ExchangeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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

    @RequestMapping(value = "/{market}/{board}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
    public String getSecurities (
            @PathVariable("market") String market,
            @PathVariable("board") String board,
            @RequestParam(required = false) List<String> requiredSecurities
    ) {
        if (requiredSecurities != null) {
            return exchangeService.getRequiredSecurities(market, board, requiredSecurities);
        }
        var securities = exchangeService.getSecurities(market, board);

        return Mapper.MapSecurities(securities);
    }

    @RequestMapping(value = "/{market}/{board}/{secId}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
    public String getSecurity (
            @PathVariable("market") String market,
            @PathVariable("board") String board,
            @PathVariable("secId") String secId
    ) {
        return Mapper.MapSecurity(exchangeService.getSecurity(market, board, secId));
    }
}
