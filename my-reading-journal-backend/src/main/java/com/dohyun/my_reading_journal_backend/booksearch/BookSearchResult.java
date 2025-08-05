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
public class BookSearchResult {
    private List<BookDto> books;
    private int totalResults;
}