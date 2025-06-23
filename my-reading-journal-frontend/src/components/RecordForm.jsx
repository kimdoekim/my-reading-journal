import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function RecordForm() {
  const [form, setForm] = useState({
    title: '',
    author: '',
    startDate: '',
    endDate: '',
    memo: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/records', form);
      alert('기록 저장 성공!');
      setForm({ title: '', author: '', startDate: '', endDate: '', memo: '' });
    } catch (err) {
      alert('오류 발생!');
      console.error(err);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>📚 독서 기록 작성</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>제목</Form.Label>
                  <Form.Control type="text" name="title" value={form.title} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>저자</Form.Label>
                  <Form.Control type="text" name="author" value={form.author} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>시작 날짜</Form.Label>
                  <Form.Control type="date" name="startDate" value={form.startDate} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>종료 날짜</Form.Label>
                  <Form.Control type="date" name="endDate" value={form.endDate} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>메모</Form.Label>
                  <Form.Control as="textarea" rows={3} name="memo" value={form.memo} onChange={handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  저장하기
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RecordForm;
