package com.dohyun.my_reading_journal_backend.readinglog.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bookTitle;      // 책 제목 (검색 없이 직접 입력도 가능하게)
    private String isbn13;         // 알라딘 검색 시 사용할 수 있음
    private String coverUrl;

    private int pagesRead;         // 읽은 페이지 수

    private LocalDateTime startTime;  // 독서 시작 시간
    private LocalDateTime endTime;    // 독서 종료 시간

    @Lob
    private String memo;           // 간단한 메모 (느낀 점 등)

    private LocalDateTime createdAt;  // 기록 생성 시각
}