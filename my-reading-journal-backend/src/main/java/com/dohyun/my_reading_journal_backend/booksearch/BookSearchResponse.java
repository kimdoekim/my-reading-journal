package com.dohyun.my_reading_journal_backend.booksearch;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookSearchResponse {
    private List<BookDto> books;
    private int currentPage;
    private int pageSize;
    private int totalResults;
}