package com.dohyun.my_reading_journal_backend.booksearch;

import com.google.gson.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
@RequiredArgsConstructor
public class BookSearchService {

    @Value("${aladin.api.key}")
    private String aladinApiKey;

    public BookSearchResult searchBooks(String query, int page, int size) {
        if (query == null || query.trim().isEmpty()) {
            throw new IllegalArgumentException("검색어는 필수입니다.");
        }

        try {
            int start = Math.max(page, 1); // 1 이상만 허용

            String urlStr = String.format(
                    "https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=%s&Query=%s&QueryType=Keyword&MaxResults=%d&Start=%d&SearchTarget=Book&Output=JS&Version=20131101",
                    aladinApiKey, URLEncoder.encode(query, StandardCharsets.UTF_8), size, start
            );

            /*String urlStr = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?" +
                    "ttbkey=" + aladinKey +
                    "&Query=" + URLEncoder.encode(query, StandardCharsets.UTF_8) +
                    "&MaxResults=10" +
                    "&start=" + start +
                    "&SearchTarget=Book" +
                    "&output=js&Version=20131101&Cover=Big";*/

            URL url = new URL(urlStr);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("User-Agent", "Mozilla/5.0");

            BufferedReader rd = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), "UTF-8"));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            rd.close();

            JsonObject json = JsonParser.parseString(sb.toString()).getAsJsonObject();

            if (json.has("errorCode")) {
                throw new IllegalArgumentException("알라딘 API 오류: " + json.get("errorMessage").getAsString());
            }

            JsonArray items = json.getAsJsonArray("item");
            List<BookDto> result = new ArrayList<>();

            for (JsonElement el : items) {
                JsonObject obj = el.getAsJsonObject();
                BookDto book = BookDto.builder()
                        .title(obj.get("title").getAsString())
                        .author(obj.get("author").getAsString())
                        .cover(normalizeCoverUrl(obj.get("cover").getAsString()))
                        .isbn13(obj.get("isbn13").getAsString())
                        .build();
                result.add(book);
            }

            int totalResults = json.get("totalResults").getAsInt();

            return new BookSearchResult(result, totalResults);

        } catch (Exception e) {
            throw new RuntimeException("알라딘 API 호출 중 오류", e);
        }
    }

    private String normalizeCoverUrl(String coverUrl) {
        if (coverUrl == null) return null;
        return coverUrl.replace("/coversum/", "/cover200/");
    }

}