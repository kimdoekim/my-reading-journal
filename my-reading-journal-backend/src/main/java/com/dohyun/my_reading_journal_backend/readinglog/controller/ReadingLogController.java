package com.dohyun.my_reading_journal_backend.readinglog.controller;

import com.dohyun.my_reading_journal_backend.readinglog.dto.ReadingLogDto;
import com.dohyun.my_reading_journal_backend.readinglog.service.ReadingLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
@RequiredArgsConstructor
public class ReadingLogController {

    private final ReadingLogService readingLogService;

    // 기록 생성
    @PostMapping
    public ResponseEntity<Void> createLog(@RequestBody ReadingLogDto dto) {
        readingLogService.save(dto);
        return ResponseEntity.ok().build();
    }

    // 전체 기록 조회
    @GetMapping
    public ResponseEntity<List<ReadingLogDto>> getAllLogs() {
        return ResponseEntity.ok(readingLogService.getAllLogs());
    }

    // 단일 기록 조회
    @GetMapping("/{id}")
    public ResponseEntity<ReadingLogDto> getLog(@PathVariable("id") Long id) {
        ReadingLogDto dto = readingLogService.getLogById(id);
        return ResponseEntity.ok(dto);
    }

    // 기록 수정
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateLog(
            @PathVariable("id") Long id,
            @RequestBody ReadingLogDto dto
    ) {
        readingLogService.update(id, dto);
        return ResponseEntity.ok().build();
    }

    // 기록 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLog(@PathVariable("id") Long id) {
        readingLogService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
