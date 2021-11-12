package com.example.investment.app.back.moexMapper;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;

public class Mapper {
    public static String MapSecurities(String moexResponse) {
        var mainObject = new JSONObject(moexResponse);
        var securitiesColumns = mainObject.getJSONObject("securities").getJSONArray("columns");
        var marketDataColumns = mainObject.getJSONObject("marketdata").getJSONArray("columns");
        var securitiesData = mainObject.getJSONObject("securities").getJSONArray("data");
        var marketDataData = mainObject.getJSONObject("marketdata").getJSONArray("data"); //как хочу, так и называю переменные
        var mappedSecurities = new ArrayList<JSONObject>();
        for (int i = 0; i < securitiesData.length(); i++) {
            var security = new HashMap<String, String>();
            for (int j = 0; j < securitiesColumns.length(); j++)
                security.put(securitiesColumns.getString(j), securitiesData.getJSONArray(i).getString(j));
            for (int j = 0; j < marketDataColumns.length(); j++)
                security.put(marketDataColumns.getString(j), String.valueOf(marketDataData.getJSONArray(i).optNumber(j)));
            mappedSecurities.add(new JSONObject(security));
        }
        return new JSONArray(mappedSecurities).toString();
    }
}
