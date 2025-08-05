package com.dohyun.my_reading_journal_backend.readingrecord;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReadingRecordService {

    private final ReadingRecordRepository repository;


    @Transactional
    public ReadingRecordDto.Response save(ReadingRecordDto.Request request) {
        ReadingRecord record = ReadingRecord.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .cover(request.getCover())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .memo(request.getMemo())
                .build();

        ReadingRecord saved = repository.save(record);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<ReadingRecordDto.Response> findAll() {
        return repository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ReadingRecordDto.Response findById(Long id) {
        ReadingRecord record = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 기록이 존재하지 않습니다."));
        return ReadingRecordDto.Response.from(record);
    }


    private ReadingRecordDto.Response toResponse(ReadingRecord record) {
        return ReadingRecordDto.Response.builder()
                .id(record.getId())
                .title(record.getTitle())
                .author(record.getAuthor())
                .cover(record.getCover())
                .startDate(record.getStartDate())
                .endDate(record.getEndDate())
                .memo(record.getMemo())
                .build();
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    public ReadingRecord update(Long id, ReadingRecordDto.Request request) {
        ReadingRecord record = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        record.setTitle(request.getTitle());
        record.setAuthor(request.getAuthor());
        record.setStartDate(request.getStartDate());
        record.setEndDate(request.getEndDate());
        record.setMemo(request.getMemo());
        record.setCover(request.getCover());  // ✅ 커버 포함
        record.setIsbn13(request.getIsbn13());

        return repository.save(record);
    }

}
