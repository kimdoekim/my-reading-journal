package com.dohyun.my_reading_journal_backend.readinglog.repository;

import com.dohyun.my_reading_journal_backend.readinglog.entity.ReadingLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReadingLogRepository extends JpaRepository<ReadingLog, Long> {
}
