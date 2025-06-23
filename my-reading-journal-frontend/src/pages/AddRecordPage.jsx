import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { saveReadingRecord } from '../api/readingApi';
import { useNavigate } from 'react-router-dom';

function AddRecordPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    author: '',
    startDate: '',
    endDate: '',
    memo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveReadingRecord(form)
      .then(() => {
        alert('기록이 저장되었습니다.');
        navigate('/reading-list');
      })
      .catch(err => {
        console.error(err);
        alert('오류가 발생했습니다.');
      });
  };

  return (
    <Container className="my-4">
      <h2>독서 기록 추가</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>저자</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>시작 날짜</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>종료 날짜</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>메모</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="memo"
            value={form.memo}
            onChange={handleChange}
          />
        </Form.Group>

        <Button type="submit">저장</Button>
      </Form>
    </Container>
  );
}

export default AddRecordPage;
