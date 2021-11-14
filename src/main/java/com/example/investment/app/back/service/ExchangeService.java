package com.example.investment.app.back.service;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class ExchangeService {
    private final String STOCK_MARKETS_URL = "https://iss.moex.com/iss/engines/stock/markets/%s/boards/%s/securities";
    private final String ARGUMENTS = "iss.meta=off&securities.columns=%s&marketdata.columns=%s";
    private final RestTemplate restTemplate;

    public ExchangeService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    /**
     * Получает список всех ценных бумаг для указанного рынка и указанного режима торгов
     * @param market – рынок
     * @param board – режим торгов
     */
    public String getSecurities (String market, String board) {
        final var resultStockUrl = String.format(STOCK_MARKETS_URL, market, board);
        final var arguments = String.format(ARGUMENTS, "SECID,SHORTNAME,SECNAME,LATNAME", "LAST,CHANGE,LASTTOPREVPRICE");
        final var url = String.format("%s.json?%s", resultStockUrl, arguments);

        return this.restTemplate.getForObject(url, String.class);
    }

    /**
     * Получает подробную информацию о конкретной ценной бумаге, торгующейся на указанном рынке и в указанном режиме торгов.
     * @param market – рынок
     * @param board – режим торгов
     * @param secId – тикер ценной бумаги
     */
    public String getSecurity (String market, String board, String secId) {
        final var resultStockUrl = String.format(STOCK_MARKETS_URL, market, board);
        final var url = String.format("%s/%s.json", resultStockUrl, secId);
        var result = this.restTemplate.getForObject(url, String.class);
        return result;
    }

    /**
     * Получает основную информацию по выбранным бумагам
     * @param market – рынок
     * @param board – режим торгов
     * @param requiredSecurities – массив тикеров
     */
    public String getRequiredSecurities (String market, String board, List<String> requiredSecurities) {
        final var resultStockUrl = String.format(STOCK_MARKETS_URL, market, board);
        final var arguments = String.format(ARGUMENTS, "SECID,SHORTNAME,SECNAME,LATNAME", "LAST,CHANGE,LASTTOPREVPRICE") +
                "&securities=" + String.join(",", requiredSecurities);
        final var url = String.format("%s.json?%s", resultStockUrl, arguments);

        return this.restTemplate.getForObject(url, String.class);
    }
}