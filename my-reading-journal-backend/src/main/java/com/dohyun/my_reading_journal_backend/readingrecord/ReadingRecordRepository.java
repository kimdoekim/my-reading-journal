package com.dohyun.my_reading_journal_backend.readingrecord;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReadingRecordRepository extends JpaRepository<ReadingRecord, Long> {
}
