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

    private ReadingRecordDto.Response toResponse(ReadingRecord record) {
        return ReadingRecordDto.Response.builder()
                .id(record.getId())
                .title(record.getTitle())
                .author(record.getAuthor())
                .startDate(record.getStartDate())
                .endDate(record.getEndDate())
                .memo(record.getMemo())
                .build();
    }

    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

}
