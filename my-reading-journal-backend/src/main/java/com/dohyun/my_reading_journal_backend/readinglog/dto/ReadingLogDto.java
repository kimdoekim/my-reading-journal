package com.dohyun.my_reading_journal_backend.readinglog.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingLogDto {

    private Long id;                // 조회 시 사용
    private String bookTitle;
    private String isbn13;
    private String coverUrl;

    private int pagesRead;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private String memo;
    private LocalDateTime createdAt;
}