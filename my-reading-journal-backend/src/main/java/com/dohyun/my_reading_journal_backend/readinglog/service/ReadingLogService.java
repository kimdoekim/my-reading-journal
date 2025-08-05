
package com.dohyun.my_reading_journal_backend.readinglog.service;

import com.dohyun.my_reading_journal_backend.readinglog.dto.ReadingLogDto;
import com.dohyun.my_reading_journal_backend.readinglog.entity.ReadingLog;
import com.dohyun.my_reading_journal_backend.readinglog.repository.ReadingLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReadingLogService {

    private final ReadingLogRepository readingLogRepository;

    // 저장 (생성)
    public void save(ReadingLogDto dto) {
        ReadingLog log = ReadingLog.builder()
                .bookTitle(dto.getBookTitle())
                .isbn13(dto.getIsbn13())
                .coverUrl(dto.getCoverUrl())
                .pagesRead(dto.getPagesRead())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .memo(dto.getMemo())
                .createdAt(LocalDateTime.now())
                .build();
        readingLogRepository.save(log);
    }

    // 전체 조회
    public List<ReadingLogDto> getAllLogs() {
        return readingLogRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // 단일 조회
    public ReadingLogDto getLogById(Long id) {
        ReadingLog log = readingLogRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No log with id " + id));
        return toDto(log);
    }

    // 수정
    public void update(Long id, ReadingLogDto dto) {
        ReadingLog log = readingLogRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No log with id " + id));
        log.setBookTitle(dto.getBookTitle());
        log.setIsbn13(dto.getIsbn13());
        log.setCoverUrl(dto.getCoverUrl());
        log.setPagesRead(dto.getPagesRead());
        log.setStartTime(dto.getStartTime());
        log.setEndTime(dto.getEndTime());
        log.setMemo(dto.getMemo());
        // createdAt는 변경하지 않음
        readingLogRepository.save(log);
    }

    // 삭제
    public void deleteById(Long id) {
        if (!readingLogRepository.existsById(id)) {
            throw new IllegalArgumentException("No log to delete with id " + id);
        }
        readingLogRepository.deleteById(id);
    }

    // 엔티티 → DTO 변환
    private ReadingLogDto toDto(ReadingLog log) {
        return ReadingLogDto.builder()
                .id(log.getId())
                .bookTitle(log.getBookTitle())
                .isbn13(log.getIsbn13())
                .coverUrl(log.getCoverUrl())
                .pagesRead(log.getPagesRead())
                .startTime(log.getStartTime())
                .endTime(log.getEndTime())
                .memo(log.getMemo())
                .createdAt(log.getCreatedAt())
                .build();
    }
}
