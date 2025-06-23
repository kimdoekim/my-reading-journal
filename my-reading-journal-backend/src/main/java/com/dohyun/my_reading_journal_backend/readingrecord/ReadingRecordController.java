package com.dohyun.my_reading_journal_backend.readingrecord;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/records")
@RequiredArgsConstructor
public class ReadingRecordController {

    private final ReadingRecordService service;

    @PostMapping
    public ResponseEntity<ReadingRecordDto.Response> create(@RequestBody ReadingRecordDto.Request request) {
        return ResponseEntity.ok(service.save(request));
    }

    @GetMapping
    public ResponseEntity<List<ReadingRecordDto.Response>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}
