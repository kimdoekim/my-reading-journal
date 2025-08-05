package com.dohyun.my_reading_journal_backend.booksearch;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class BookSearchController {

    private final BookSearchService bookSearchService;

    @GetMapping
    public ResponseEntity<BookSearchResponse> searchBooks(
            @RequestParam("query") String query,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        int start = (page - 1) * size + 1;

        BookSearchResult result = bookSearchService.searchBooks(query, start, size);

        BookSearchResponse response = new BookSearchResponse(
                result.getBooks(),
                page,
                size,
                result.getTotalResults()
        );

        return ResponseEntity.ok(response);
    }

}