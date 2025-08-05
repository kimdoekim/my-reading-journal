package com.dohyun.my_reading_journal_backend.booksearch;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class BookDto {
    private String title;
    private String author;
    private String cover;
    private String isbn13;
}
