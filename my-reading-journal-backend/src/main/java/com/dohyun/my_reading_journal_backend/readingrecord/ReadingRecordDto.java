package com.dohyun.my_reading_journal_backend.readingrecord;

import lombok.*;

import java.time.LocalDate;

public class ReadingRecordDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Request {
        private String title;
        private String author;
        private LocalDate startDate;
        private LocalDate endDate;
        private String memo;
    }

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class Response {
        private Long id;
        private String title;
        private String author;
        private LocalDate startDate;
        private LocalDate endDate;
        private String memo;
    }
}
