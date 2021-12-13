package com.example.investment.app.back.controller;

import com.example.investment.app.back.model.BrokerageAccount;
import com.example.investment.app.back.model.BrokerageAccountSecurities;
import com.example.investment.app.back.model.BrokerageAccountSecuritiesHistory;
import com.example.investment.app.back.pojo.CreateBrokerageAccountRequestBody;
import com.example.investment.app.back.pojo.ModifySecuritiesRequestBody;
import com.example.investment.app.back.service.BrokerageAccountSecuritiesHistoryService;
import com.example.investment.app.back.service.BrokerageAccountSecuritiesService;
import com.example.investment.app.back.service.BrokerageAccountService;
import com.example.investment.app.back.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/brokerage-account")
public class BrokerageAccountController {

    @Autowired
    private final BrokerageAccountSecuritiesHistoryService brokerageAccountSecuritiesHistoryService;
    @Autowired
    private final BrokerageAccountSecuritiesService brokerageAccountSecuritiesService;
    @Autowired
    private final BrokerageAccountService brokerageAccountService;

    public BrokerageAccountController (BrokerageAccountSecuritiesService brokerageAccountSecuritiesService,
                                       BrokerageAccountService brokerageAccountService,
                                       BrokerageAccountSecuritiesHistoryService brokerageAccountSecuritiesHistoryService) {
        this.brokerageAccountSecuritiesService = brokerageAccountSecuritiesService;
        this.brokerageAccountService = brokerageAccountService;
        this.brokerageAccountSecuritiesHistoryService = brokerageAccountSecuritiesHistoryService;
    }

    @GetMapping("/{brokerageAccountId}/securities")
    public List<BrokerageAccountSecurities> getBrokerageAccountSecurities (@PathVariable("brokerageAccountId") Long brokerageAccountId) {
        return brokerageAccountSecuritiesService.findAllByBrokerageAccountId(brokerageAccountId);
    }

    @PutMapping("/create")
    public HttpStatus saveBrokerageAccount (
            @RequestBody CreateBrokerageAccountRequestBody createBrokerageAccountRequestBody,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        var accountName = createBrokerageAccountRequestBody.getBrokerageAccount();
        var userId = userDetails.getId();

        brokerageAccountService.save(new BrokerageAccount(accountName, userId));

        return HttpStatus.OK;
    }

    @PostMapping("/{brokerageAccountId}/modifySecuritiesCount")
    public ResponseEntity<?> saveBrokerageAccountSecurities (
            @RequestBody ModifySecuritiesRequestBody modifySecuritiesRequestBody,
            @PathVariable("brokerageAccountId") Long brokerageAccountId,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        var delta = modifySecuritiesRequestBody.getDelta();
        var ticker = modifySecuritiesRequestBody.getTicker();
        var price = modifySecuritiesRequestBody.getPrice();
        var market = modifySecuritiesRequestBody.getMarket();
        var board = modifySecuritiesRequestBody.getBoard();

        var optionalOldAccountSecurities =
                brokerageAccountSecuritiesService.findByBrokerageAccountIdAndTicker(brokerageAccountId, ticker);

        if (optionalOldAccountSecurities.isPresent()) {
            var oldAccountSecurities = optionalOldAccountSecurities.get();
            var newCount = oldAccountSecurities.getCount() + delta;

            brokerageAccountSecuritiesService.save(new BrokerageAccountSecurities(oldAccountSecurities.getId(), ticker, market, board, newCount, brokerageAccountId));
        } else {
            brokerageAccountSecuritiesService.save(new BrokerageAccountSecurities(ticker, market, board, delta, brokerageAccountId));
        }

        var securitiesTransaction = new BrokerageAccountSecuritiesHistory(Timestamp.from(Instant.now()), brokerageAccountId, ticker, price);
        brokerageAccountSecuritiesHistoryService.save(securitiesTransaction);

        return ResponseEntity.ok(brokerageAccountSecuritiesService.findByBrokerageAccountIdAndTicker(brokerageAccountId, ticker));
    }
}
