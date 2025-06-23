import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons'; // 아이콘 import
import { differenceInDays } from 'date-fns';


function RecordList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios.get('http://localhost:8080/api/records')
      .then(res => setRecords(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios.delete(`http://localhost:8080/api/records/${id}`)
        .then(() => {
          setRecords(records.filter(r => r.id !== id));
        })
        .catch(err => console.error(err));
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status" />
        <p className="mt-3">불러오는 중...</p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row className="g-4">
        {records.map(record => (
          <Col md={6} key={record.id}>
            <Card className="position-relative">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDelete(record.id)}
                className="position-absolute top-0 end-0 m-2"
              >
                <Trash />
              </Button>
              <Card.Body>
                <Card.Title>{record.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {record.author}
                </Card.Subtitle>
                {record.startDate && record.endDate && (
                  <Card.Text>
                    독서 기간: {record.startDate} ~ {record.endDate} (
                    {differenceInDays(new Date(record.endDate), new Date(record.startDate)) + 1}일)
                  </Card.Text>
                )}
                <Card.Text>{record.memo}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default RecordList;
