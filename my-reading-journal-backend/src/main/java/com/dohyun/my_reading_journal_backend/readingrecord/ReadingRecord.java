package com.dohyun.my_reading_journal_backend.readingrecord;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadingRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private String cover;
    private String isbn13;

    private LocalDate startDate;
    private LocalDate endDate;

    @Lob
    private String memo;
}
