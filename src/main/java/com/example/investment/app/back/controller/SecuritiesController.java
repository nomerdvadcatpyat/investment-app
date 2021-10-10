package com.example.investment.app.back.controller;

import com.github.galimru.tinkoff.TinkoffInvestClient;
import com.github.galimru.tinkoff.json.market.CandleResolution;
import com.github.galimru.tinkoff.services.streaming.CandleSubscription;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/securities")
public class SecuritiesController {
    private String token = "";
    private boolean sandboxMode = false;

    @GetMapping("")
    public String getSecurities() {
        TinkoffInvestClient client = TinkoffInvestClient.create(token, sandboxMode);
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();

        try {
            var gazpFigi = client.market().searchByTicker("GAZP").getInstruments().get(0).getFigi();

            client.streaming()
                    .addCandleListener(event ->
                            System.out.println("High: " + event.getHigh()));

            client.streaming()
                    .subscribe(CandleSubscription
                            .on(gazpFigi)
                            .withInterval(CandleResolution.ONE_MINUTE));

            return gson.toJson(gazpFigi);
        } catch (Exception e) {
            return gson.toJson(e);
        }
    }
}
