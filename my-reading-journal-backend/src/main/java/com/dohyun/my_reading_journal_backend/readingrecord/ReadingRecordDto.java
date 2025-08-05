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
        private String cover;
        private String isbn13;

        private LocalDate startDate;
        private LocalDate endDate;
        private String memo;
    }

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
    public static class Response {
        private Long id;
        private String title;
        private String author;
        private String cover;


        private LocalDate startDate;
        private LocalDate endDate;
        private String memo;

        public static Response from(ReadingRecord record) {
            return Response.builder()
                    .id(record.getId())
                    .title(record.getTitle())
                    .author(record.getAuthor())
                    .cover(record.getCover())
                    .startDate(record.getStartDate())
                    .endDate(record.getEndDate())
                    .memo(record.getMemo())
                    .build();
        }

    }
}
